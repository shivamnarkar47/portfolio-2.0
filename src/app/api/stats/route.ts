import { NextResponse } from "next/server";

const GITHUB_USER = "shivamnarkar47";
const LEETCODE_USER = "shivamnarkar16";
const CODEFORCES_USER = "destroyingchampions";

type StatSource = "github" | "leetcode" | "codeforces" | "cache";

type Stat = {
  source: StatSource;
  label: string;
  value: string | number;
  hint?: string;
  url?: string;
};

type StatsResponse = {
  fetchedAt: number;
  stats: Stat[];
  errors: { source: StatSource; message: string }[];
  contributionGraph?: { date: string; count: number }[];
};

async function fetchGitHub(): Promise<Stat[]> {
  const token = process.env.GITHUB_TOKEN ?? process.env.NEXT_GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      headers,
      next: { revalidate: 300 },
    }),
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner&sort=updated`,
      { headers, next: { revalidate: 300 } },
    ),
  ]);

  if (!userRes.ok) throw new Error(`GitHub user ${userRes.status}`);
  const user = (await userRes.json()) as {
    followers: number;
    following: number;
    public_repos: number;
    public_gists: number;
    created_at: string;
  };

  let totalStars = 0;
  let totalForks = 0;
  let totalWatchers = 0;
  let totalOpenIssues = 0;
  const languageCounts: Record<string, number> = {};
  const languageStars: Record<string, number> = {};
  if (reposRes.ok) {
    const repos = (await reposRes.json()) as {
      stargazers_count: number;
      forks_count: number;
      watchers_count: number;
      open_issues_count: number;
      language: string | null;
    }[];
    totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);
    totalForks = repos.reduce((sum, r) => sum + (r.forks_count ?? 0), 0);
    totalWatchers = repos.reduce((sum, r) => sum + (r.watchers_count ?? 0), 0);
    totalOpenIssues = repos.reduce(
      (sum, r) => sum + (r.open_issues_count ?? 0),
      0,
    );
    for (const r of repos) {
      if (r.language) {
        languageCounts[r.language] = (languageCounts[r.language] ?? 0) + 1;
        languageStars[r.language] =
          (languageStars[r.language] ?? 0) + (r.stargazers_count ?? 0);
      }
    }
  }

  const totalLangRepos = Object.values(languageCounts).reduce(
    (a, b) => a + b,
    0,
  );
  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang, count]) => ({
      name: lang,
      count,
      percentage: Math.round((count / totalLangRepos) * 100),
      stars: languageStars[lang] ?? 0,
    }));

  const yearsOnGitHub = Math.floor(
    (Date.now() - new Date(user.created_at).getTime()) / (365.25 * 24 * 60 * 60 * 1000),
  );

  // Fetch real commit data via GraphQL (requires token for full history)
  let totalCommits = 0;
  let recentCommits = 0;
  let streak = 0;
  let contributionGraph: { date: string; count: number }[] = [];

  if (token) {
    const graphqlRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              totalCommitContributions
              restrictedContributionsCount
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }`,
        variables: { username: GITHUB_USER },
      }),
      next: { revalidate: 300 },
    });

    if (graphqlRes.ok) {
      const graphqlJson = (await graphqlRes.json()) as {
        data: {
          user: {
            contributionsCollection: {
              totalCommitContributions: number;
              restrictedContributionsCount: number;
              contributionCalendar: {
                totalContributions: number;
                weeks: {
                  contributionDays: {
                    date: string;
                    contributionCount: number;
                  }[];
                }[];
              };
            };
          };
        };
      };
      const collection = graphqlJson.data?.user?.contributionsCollection;
      if (collection) {
        totalCommits =
          collection.totalCommitContributions +
          collection.restrictedContributionsCount;
        // Last 90 days from contribution calendar
        const days = collection.contributionCalendar.weeks.flatMap(
          (w) => w.contributionDays,
        );
        const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
        recentCommits = days
          .filter((d) => new Date(d.date).getTime() >= cutoff)
          .reduce((sum, d) => sum + d.contributionCount, 0);
        // Current streak (consecutive days with contributions, ending today)
        const sorted = [...days].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        for (const d of sorted) {
          if (d.contributionCount > 0) streak++;
          else break;
        }
        // Full contribution graph (last 365 days)
        contributionGraph = days.map((d) => ({
          date: d.date,
          count: d.contributionCount,
        }));
      }
    }
  } else {
    // Fallback without token: Search API for total commits + events for recent
    const [searchRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/search/commits?q=author:${GITHUB_USER}`, {
        headers: {
          ...headers,
          "User-Agent": "shvm-portfolio",
        },
        next: { revalidate: 600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/events?per_page=100`, {
        headers,
        next: { revalidate: 300 },
      }),
    ]);

    if (searchRes.ok) {
      const searchJson = (await searchRes.json()) as { total_count?: number };
      totalCommits = searchJson.total_count ?? 0;
    }

    if (eventsRes.ok) {
      const events = (await eventsRes.json()) as {
        type: string;
        payload: { size?: number };
      }[];
      recentCommits = events
        .filter((e) => e.type === "PushEvent")
        .reduce((sum, e) => sum + (e.payload?.size ?? 0), 0);
    }
  }

  const stats: Stat[] = [
    {
      source: "github",
      label: "Followers",
      value: user.followers,
      hint: `following ${user.following}`,
      url: `https://github.com/${GITHUB_USER}`,
    },
    {
      source: "github",
      label: "Repositories",
      value: user.public_repos,
      hint: `${yearsOnGitHub} years on GitHub`,
      url: `https://github.com/${GITHUB_USER}?tab=repositories`,
    },
    {
      source: "github",
      label: "Total Stars",
      value: totalStars,
      hint: `${totalForks} forks`,
      url: `https://github.com/${GITHUB_USER}?tab=repositories`,
    },
  ];

  if (topLanguages.length > 0) {
    stats.push({
      source: "github",
      label: "Top Languages",
      value: topLanguages.length,
      hint: `${totalLangRepos} repos tracked`,
      url: `https://github.com/${GITHUB_USER}?tab=repositories`,
      data: topLanguages,
    } as any);
  }

  if (token) {
    stats.push(
      {
        source: "github",
        label: "All-Time Commits",
        value: totalCommits,
        hint: "via GitHub GraphQL",
        url: `https://github.com/${GITHUB_USER}`,
      },
      {
        source: "github",
        label: "Recent Commits",
        value: recentCommits,
        hint: "last 90 days",
        url: `https://github.com/${GITHUB_USER}`,
      },
      {
        source: "github",
        label: "Current Streak",
        value: streak,
        hint: streak === 1 ? "day" : "days",
        url: `https://github.com/${GITHUB_USER}`,
      },
      {
        source: "github",
        label: "Contribution Graph",
        value: contributionGraph.length,
        hint: "last 365 days",
        url: `https://github.com/${GITHUB_USER}`,
        data: contributionGraph,
      } as any,
    );
  } else {
    stats.push(
      {
        source: "github",
        label: "All-Time Commits",
        value: totalCommits,
        hint: "via Search API",
        url: `https://github.com/${GITHUB_USER}`,
      },
      {
        source: "github",
        label: "Recent Commits",
        value: recentCommits,
        hint: "last 90 days (public)",
        url: `https://github.com/${GITHUB_USER}`,
      },
    );
  }

  return stats;
}

async function fetchLeetCode(): Promise<Stat[]> {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; shvm-portfolio/1.0)",
      Referer: "https://leetcode.com/",
    },
    body: JSON.stringify({
      query: `query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile { ranking reputation }
          submitStats { acSubmissionNum { difficulty count } }
          userContestRanking { attendedCount rating }
        }
      }`,
      variables: { username: LEETCODE_USER },
    }),
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`LeetCode ${res.status}`);
  const json = (await res.json()) as {
    data: {
      matchedUser: {
        profile: { ranking: number; reputation: number };
        submitStats: {
          acSubmissionNum: { difficulty: string; count: number }[];
        };
        userContestRanking: { attendedCount: number; rating: number } | null;
      } | null;
    };
  };
  const u = json.data.matchedUser;
  if (!u) throw new Error("LeetCode user not found");
  const byDiff = Object.fromEntries(
    u.submitStats.acSubmissionNum.map((s) => [s.difficulty, s.count]),
  );
  const stats: Stat[] = [
    {
      source: "leetcode",
      label: "Contest Ranking",
      value: u.profile.ranking.toLocaleString(),
      hint: "global",
      url: `https://leetcode.com/u/${LEETCODE_USER}/`,
    },
    {
      source: "leetcode",
      label: "Solved Problems",
      value: byDiff.All ?? 0,
      hint: `Easy ${byDiff.Easy ?? 0} · Med ${byDiff.Medium ?? 0} · Hard ${byDiff.Hard ?? 0}`,
      url: `https://leetcode.com/u/${LEETCODE_USER}/`,
    },
    {
      source: "leetcode",
      label: "Reputation",
      value: u.profile.reputation,
      url: `https://leetcode.com/u/${LEETCODE_USER}/`,
    },
  ];
  if (u.userContestRanking) {
    stats.push({
      source: "leetcode",
      label: "Contests",
      value: u.userContestRanking.attendedCount,
      hint: `rating ${u.userContestRanking.rating.toFixed(0)}`,
      url: `https://leetcode.com/u/${LEETCODE_USER}/`,
    });
  }
  return stats;
}

async function fetchCodeForces(): Promise<Stat[]> {
  const [infoRes, submissionsRes] = await Promise.all([
    fetch(
      `https://codeforces.com/api/user.info?handles=${CODEFORCES_USER}`,
      { next: { revalidate: 600 } },
    ),
    fetch(
      `https://codeforces.com/api/user.status?handle=${CODEFORCES_USER}&from=1&count=1000`,
      { next: { revalidate: 600 } },
    ),
  ]);

  if (!infoRes.ok) throw new Error(`CodeForces ${infoRes.status}`);
  const json = (await infoRes.json()) as {
    result: {
      rating?: number;
      rank?: string;
      maxRating?: number;
      maxRank?: string;
      contribution?: number;
      friendOfCount?: number;
      organization?: string;
    }[];
  };
  const u = json.result?.[0];
  if (!u) throw new Error("CodeForces user not found");

  // Count accepted submissions and unique solved problems
  let acceptedSubmissions = 0;
  let solvedProblems = 0;
  if (submissionsRes.ok) {
    const subJson = (await submissionsRes.json()) as {
      result: { verdict: string; problem: { contestId?: number; index: string } }[];
    };
    const solvedSet = new Set<string>();
    for (const s of subJson.result ?? []) {
      if (s.verdict === "OK") {
        acceptedSubmissions++;
        const key = s.problem.contestId
          ? `${s.problem.contestId}${s.problem.index}`
          : s.problem.index;
        solvedSet.add(key);
      }
    }
    solvedProblems = solvedSet.size;
  }

  return [
    {
      source: "codeforces",
      label: "Rating",
      value: u.rating ?? "N/A",
      hint: u.rank ?? undefined,
      url: `https://codeforces.com/profile/${CODEFORCES_USER}`,
    },
    {
      source: "codeforces",
      label: "Peak Rating",
      value: u.maxRating ?? "N/A",
      hint: u.maxRank ?? undefined,
      url: `https://codeforces.com/profile/${CODEFORCES_USER}`,
    },
    {
      source: "codeforces",
      label: "Solved Problems",
      value: solvedProblems,
      hint: `${acceptedSubmissions} accepted submissions`,
      url: `https://codeforces.com/profile/${CODEFORCES_USER}`,
    },
    {
      source: "codeforces",
      label: "Contribution",
      value: u.contribution ?? 0,
      hint: `${u.friendOfCount ?? 0} friends`,
      url: `https://codeforces.com/profile/${CODEFORCES_USER}`,
    },
  ];
}

export async function GET() {
  const results = await Promise.allSettled([
    fetchGitHub(),
    fetchLeetCode(),
    fetchCodeForces(),
  ]);

  const stats: Stat[] = [];
  const errors: { source: StatSource; message: string }[] = [];
  const sources: StatSource[] = ["github", "leetcode", "codeforces"];
  let contributionGraph: { date: string; count: number }[] = [];

  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      const items = r.value;
      // Extract contribution graph if present (from GitHub fetch)
      const graphItem = items.find(
        (s) => s.label === "Contribution Graph",
      );
      if (graphItem) {
        contributionGraph = (graphItem as any).data || [];
      }
      stats.push(...items);
    } else {
      errors.push({
        source: sources[i]!,
        message: r.reason?.message ?? "unknown error",
      });
    }
  });

  return NextResponse.json<StatsResponse>(
    { fetchedAt: Date.now(), stats, errors, contributionGraph },
    {
      status: 200,
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
    },
  );
}
