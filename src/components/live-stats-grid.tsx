"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ContributionGraph } from "@/components/contribution-graph";
import { LanguagesBar } from "@/components/languages-bar";

type LanguageData = {
  name: string;
  count: number;
  percentage: number;
  stars: number;
};

type Stat = {
  source: "github" | "leetcode" | "codeforces";
  label: string;
  value: string | number;
  hint?: string;
  url?: string;
  data?: any;
};

type StatsResponse = {
  fetchedAt: number;
  stats: Stat[];
  errors: { source: string; message: string }[];
  contributionGraph?: { date: string; count: number }[];
};

const SOURCE_META: Record<
  Stat["source"],
  { label: string; color: string; ring: string; glow: string }
> = {
  github: {
    label: "GitHub",
    color: "text-foreground",
    ring: "ring-foreground/20",
    glow: "shadow-foreground/5",
  },
  leetcode: {
    label: "LeetCode",
    color: "text-foreground",
    ring: "ring-foreground/20",
    glow: "shadow-foreground/5",
  },
  codeforces: {
    label: "CodeForces",
    color: "text-foreground",
    ring: "ring-foreground/20",
    glow: "shadow-foreground/5",
  },
};

const POLL_INTERVAL = 5 * 60 * 1000;
const LEETCODE_USER = "shivamnarkar16";

function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function LiveDot({ stale }: { stale: boolean }) {
  return (
    <span className="relative flex size-2">
      <span
        className={cn(
          "absolute inline-flex h-full w-full rounded-full opacity-60",
          stale ? "bg-amber-500 animate-ping-slow" : "bg-emerald-500 animate-ping",
        )}
      />
      <span
        className={cn(
          "relative inline-flex rounded-full size-2",
          stale ? "bg-amber-500" : "bg-emerald-500",
        )}
      />
    </span>
  );
}

async function fetchLeetCode(): Promise<Stat[]> {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; shvm-portfolio/1.0)",
      Referer: `https://leetcode.com/u/${LEETCODE_USER}/`,
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

export function LiveStatsGrid() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [leetcodeStats, setLeetcodeStats] = useState<Stat[]>([]);
  const [leetcodeError, setLeetcodeError] = useState<string | null>(null);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const fetchStats = useCallback(async (silent = false) => {
    try {
      if (!silent) setRefreshing(true);
      const res = await fetch("/api/stats", { cache: "no-store" });
      if (!res.ok) throw new Error(`stats ${res.status}`);
      const json: StatsResponse = await res.json();
      setData(json);
      setLastUpdated(json.fetchedAt);
    } catch (err) {
      setData((prev) =>
        prev
          ? {
              ...prev,
              errors: [
                ...prev.errors,
                {
                  source: "cache",
                  message:
                    err instanceof Error ? err.message : "fetch failed",
                },
              ],
            }
          : null,
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const fetchLeetcode = useCallback(async () => {
    try {
      setLeetcodeLoading(true);
      const stats = await fetchLeetCode();
      setLeetcodeStats(stats);
      setLeetcodeError(null);
    } catch (err) {
      setLeetcodeError(err instanceof Error ? err.message : "fetch failed");
      setLeetcodeStats([]);
    } finally {
      setLeetcodeLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    fetchLeetcode();
    const id = setInterval(() => {
      fetchStats(true);
      fetchLeetcode();
    }, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [fetchStats, fetchLeetcode]);

  const groups: Record<Stat["source"], Stat[]> = {
    github: [],
    leetcode: [],
    codeforces: [],
  };
  for (const s of data?.stats ?? []) groups[s.source].push(s);
  // Override leetcode with client-fetched data
  groups.leetcode = leetcodeStats;

  const contributionGraph = data?.contributionGraph ?? [];
  const languages =
    (data?.stats.find((s) => s.label === "Top Languages")?.data as
      | LanguageData[]
      | undefined) ?? [];

  const stale =
    lastUpdated !== null && Date.now() - lastUpdated > 6 * 60 * 1000;

  if (loading && !data) {
    return <StatsSkeleton leetcodeLoading={leetcodeLoading} />;
  }

  return (
    <div className="space-y-8">
      {/* status bar */}
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
        <div className="flex items-center gap-2">
          <LiveDot stale={stale} />
          <span>
            {stale
              ? "data may be stale"
              : lastUpdated
                ? `live · updated ${formatTime(lastUpdated)}`
                : "live"}
          </span>
          <span className="opacity-50">·</span>
          <span className="opacity-50">autorefresh /5m</span>
        </div>
        <button
          type="button"
          onClick={() => {
            fetchStats(false);
            fetchLeetcode();
          }}
          disabled={refreshing}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-accent transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn("size-3", refreshing && "animate-spin")} />
          <span>{refreshing ? "fetching…" : "refresh"}</span>
        </button>
      </div>

      {/* error banner */}
      <AnimatePresence>
        {(data?.errors && data.errors.length > 0) || leetcodeError ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs">
              <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-500" />
              <div className="space-y-0.5">
                <p className="font-medium text-amber-600 dark:text-amber-400">
                  Some profiles couldn&apos;t be fetched
                </p>
                <ul className="font-mono text-[11px] text-muted-foreground">
                  {data?.errors.map((e, i) => (
                    <li key={i}>
                      {e.source}: {e.message}
                    </li>
                  ))}
                  {leetcodeError && <li>leetcode: {leetcodeError}</li>}
                </ul>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* contribution graph */}
      {contributionGraph.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              GitHub
            </h3>
            <div className="flex-1 h-px bg-border" />
            <Zap className="size-3 opacity-60 text-foreground" />
          </div>
          <ContributionGraph data={contributionGraph} />
        </div>
      )}

      {/* languages */}
      {languages.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              GitHub
            </h3>
            <div className="flex-1 h-px bg-border" />
            <Zap className="size-3 opacity-60 text-foreground" />
          </div>
          <LanguagesBar languages={languages} />
        </div>
      )}

      {/* cards */}
      {(Object.keys(groups) as Stat["source"][])
        .filter((k) => groups[k].length > 0 || (k === "leetcode" && leetcodeLoading))
        .map((source) => {
          const meta = SOURCE_META[source];
          return (
            <div key={source} className="space-y-3">
              <div className="flex items-center gap-2">
                <h3
                  className={cn(
                    "font-mono text-xs font-semibold uppercase tracking-wider",
                    meta.color,
                  )}
                >
                  {meta.label}
                </h3>
                <div className="flex-1 h-px bg-border" />
                <Zap className={cn("size-3 opacity-60", meta.color)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {source === "leetcode" && leetcodeLoading ? (
                  <>
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-28 rounded-xl border bg-card p-4 animate-pulse"
                      >
                        <div className="h-3 w-16 rounded bg-muted-foreground/10" />
                        <div className="mt-3 h-7 w-20 rounded bg-muted-foreground/10" />
                      </div>
                    ))}
                  </>
                ) : (
                  groups[source].map((stat, id) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: id * 0.05 }}
                    >
                      <a
                        href={stat.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "group block h-full rounded-xl border bg-card p-4 ring-1 ring-inset transition-all hover:-translate-y-0.5 hover:shadow-lg",
                          meta.ring,
                          meta.glow,
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                              {stat.label}
                            </p>
                            <AnimatePresence mode="wait">
                              <motion.p
                                key={stat.value}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 text-2xl font-bold tracking-tight"
                              >
                                {typeof stat.value === "number"
                                  ? stat.value.toLocaleString()
                                  : stat.value}
                              </motion.p>
                            </AnimatePresence>
                            {stat.hint && (
                              <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                                {stat.hint}
                              </p>
                            )}
                          </div>
                          <ExternalLink className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      </a>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

function StatsSkeleton({ leetcodeLoading }: { leetcodeLoading: boolean }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-muted-foreground/40 animate-ping" />
            <span className="relative inline-flex rounded-full size-2 bg-muted-foreground/40" />
          </span>
          <span>connecting…</span>
        </div>
        <RefreshCw className="size-3 animate-spin" />
      </div>
      {/* contribution graph skeleton */}
      <div className="space-y-3">
        <div className="h-3 w-16 rounded bg-muted-foreground/10 animate-pulse" />
        <div className="h-24 w-full rounded-xl border bg-card p-4 animate-pulse" />
      </div>
      {/* languages skeleton */}
      <div className="space-y-3">
        <div className="h-3 w-16 rounded bg-muted-foreground/10 animate-pulse" />
        <div className="h-3 w-full rounded bg-muted-foreground/10 animate-pulse" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl border bg-card p-3 animate-pulse"
            />
          ))}
        </div>
      </div>
      {[1, 2].map((g) => (
        <div key={g} className="space-y-3">
          <div className="h-3 w-16 rounded bg-muted-foreground/10 animate-pulse" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, ...(leetcodeLoading && g === 2 ? [3] : [])].map((i) => (
              <div
                key={i}
                className="h-28 rounded-xl border bg-card p-4 animate-pulse"
              >
                <div className="h-3 w-16 rounded bg-muted-foreground/10" />
                <div className="mt-3 h-7 w-20 rounded bg-muted-foreground/10" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
