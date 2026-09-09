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
    public_repos: number;
    public_gists: number;
  };

  let totalStars = 0;
  if (reposRes.ok) {
    const repos = (await reposRes.json()) as { stargazers_count: number }[];
    totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);
  }

  // Fetch real commit data via GraphQL (requires token for full history)
  let totalCommits = 0;
  let recentCommits = 0;
  let streak = 0;

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
      url: `https://github.com/${GITHUB_USER}`,
    },
    {
      source: "github",
      label: "Repositories",
      value: user.public_repos,
      url: `https://github.com/${GITHUB_USER}?tab=repositories`,
    },
    {
      source: "github",
      label: "Total Stars",
      value: totalStars,
      hint: "across public repos",
      url: `https://github.com/${GITHUB_USER}?tab=repositories`,
    },
  ];

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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile { ranking reputation }
          submitStats { acSubmissionNum { difficulty count } }
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
      } | null;
    };
  };
  const u = json.data.matchedUser;
  if (!u) throw new Error("LeetCode user not found");
  const byDiff = Object.fromEntries(
    u.submitStats.acSubmissionNum.map((s) => [s.difficulty, s.count]),
  );
  return [
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
}

async function fetchCodeForces(): Promise<Stat[]> {
  const res = await fetch(
    `https://codeforces.com/api/user.info?handles=${CODEFORCES_USER}`,
    { next: { revalidate: 600 } },
  );
  if (!res.ok) throw new Error(`CodeForces ${res.status}`);
  const json = (await res.json()) as {
    result: {
      rating?: number;
      rank?: string;
      maxRating?: number;
      maxRank?: string;
      contribution?: number;
      friendOfCount?: number;
    }[];
  };
  const u = json.result?.[0];
  if (!u) throw new Error("CodeForces user not found");
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

  results.forEach((r, i) => {
    if (r.status === "fulfilled") stats.push(...r.value);
    else
      errors.push({
        source: sources[i]!,
        message: r.reason?.message ?? "unknown error",
      });
  });

  return NextResponse.json<StatsResponse>(
    { fetchedAt: Date.now(), stats, errors },
    {
      status: 200,
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
    },
  );
}
