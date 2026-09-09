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

export function LiveStatsGrid() {
  const [data, setData] = useState<StatsResponse | null>(null);
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

  useEffect(() => {
    fetchStats();
    const id = setInterval(() => fetchStats(true), POLL_INTERVAL);
    return () => clearInterval(id);
  }, [fetchStats]);

  const groups: Record<Stat["source"], Stat[]> = {
    github: [],
    leetcode: [],
    codeforces: [],
  };
  for (const s of data?.stats ?? []) groups[s.source].push(s);

  const contributionGraph = data?.contributionGraph ?? [];
  const languages =
    (data?.stats.find((s) => s.label === "Top Languages")?.data as
      | LanguageData[]
      | undefined) ?? [];

  const stale =
    lastUpdated !== null && Date.now() - lastUpdated > 6 * 60 * 1000;

  if (loading && !data) {
    return <StatsSkeleton />;
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
          onClick={() => fetchStats(false)}
          disabled={refreshing}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-accent transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn("size-3", refreshing && "animate-spin")} />
          <span>{refreshing ? "fetching…" : "refresh"}</span>
        </button>
      </div>

      {/* error banner */}
      <AnimatePresence>
        {data?.errors && data.errors.length > 0 && (
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
                  {data.errors.map((e, i) => (
                    <li key={i}>
                      {e.source}: {e.message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
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
        .filter((k) => groups[k].length > 0)
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
                {groups[source].map((stat, id) => (
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
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}

function StatsSkeleton() {
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
      {[1, 2, 3].map((g) => (
        <div key={g} className="space-y-3">
          <div className="h-3 w-16 rounded bg-muted-foreground/10 animate-pulse" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
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
