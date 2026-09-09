"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ContributionDay = { date: string; count: number };

const LEVEL_COLORS = [
  "bg-muted-foreground/10", // 0
  "bg-muted-foreground/25", // 1
  "bg-muted-foreground/45", // 2
  "bg-muted-foreground/65", // 3
  "bg-foreground", // 4+
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getMonthLabels(
  data: ContributionDay[],
): { label: string; index: number }[] {
  const labels: { label: string; index: number }[] = [];
  let lastMonth = "";
  data.forEach((d, i) => {
    const date = new Date(d.date);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    if (month !== lastMonth) {
      labels.push({ label: month, index: i });
      lastMonth = month;
    }
  });
  return labels;
}

export function ContributionGraph({
  data,
  className,
}: {
  data: ContributionDay[];
  className?: string;
}) {
  const [hovered, setHovered] = useState<ContributionDay | null>(null);

  const { weeks, monthLabels, totalContributions, maxCount } = useMemo(() => {
    // Pad to fill complete weeks (Sunday start)
    const sorted = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    const firstDate = sorted[0] ? new Date(sorted[0].date) : new Date();
    const dayOfWeek = firstDate.getDay();
    const padding: ContributionDay[] = Array.from({ length: dayOfWeek }, (_, i) => ({
      date: new Date(
        firstDate.getTime() - (dayOfWeek - i) * 86400000,
      ).toISOString(),
      count: 0,
    }));
    const padded = [...padding, ...sorted];

    // Group into weeks (columns of 7)
    const w: ContributionDay[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      w.push(padded.slice(i, i + 7));
    }

    const total = sorted.reduce((sum, d) => sum + d.count, 0);
    const max = Math.max(...sorted.map((d) => d.count), 1);
    const labels = getMonthLabels(padded);

    return { weeks: w, monthLabels: labels, totalContributions: total, maxCount: max };
  }, [data]);

  if (data.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
            Contribution Graph
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {totalContributions.toLocaleString()} contributions in the last year
          </p>
        </div>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs font-mono shadow-sm"
          >
            <span className="font-semibold">{hovered.count}</span> on{" "}
            {formatDate(hovered.date)}
          </motion.div>
        )}
      </div>

      {/* grid */}
      <div className="overflow-x-auto pb-1">
        <div className="inline-flex flex-col gap-1">
          {/* month labels */}
          <div className="flex gap-1 pl-8">
            {monthLabels.map((m, i) => (
              <div
                key={i}
                className="text-[10px] font-mono text-muted-foreground"
                style={{
                  position: "relative",
                  left: `${m.index * 3}px`,
                }}
              >
                {m.label}
              </div>
            ))}
          </div>

          {/* day labels + cells */}
          <div className="flex gap-1">
            {/* day labels (left) */}
            <div className="flex flex-col gap-1 pr-1 text-[10px] font-mono text-muted-foreground">
              <span className="h-3" /> {/* Sun */}
              <span className="h-3 leading-3">Mon</span>
              <span className="h-3" /> {/* Tue */}
              <span className="h-3 leading-3">Wed</span>
              <span className="h-3" /> {/* Thu */}
              <span className="h-3 leading-3">Fri</span>
              <span className="h-3" /> {/* Sat */}
            </div>

            {/* cells */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) => {
                  const level = getLevel(day.count);
                  const isPadding = day.date < (data[0]?.date ?? "");
                  return (
                    <div
                      key={di}
                      className={cn(
                        "size-3 rounded-[2px] transition-all cursor-pointer ring-0 hover:ring-2 hover:ring-foreground/30",
                        LEVEL_COLORS[level],
                        isPadding && "opacity-20 pointer-events-none",
                      )}
                      onMouseEnter={() => !isPadding && setHovered(day)}
                      onMouseLeave={() => setHovered(null)}
                      title={`${day.count} on ${formatDate(day.date)}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* legend */}
          <div className="flex items-center justify-end gap-1.5 pt-1 text-[10px] font-mono text-muted-foreground">
            <span>Less</span>
            {LEVEL_COLORS.map((c, i) => (
              <div
                key={i}
                className={cn("size-3 rounded-[2px]", c)}
                title={`${i === 0 ? 0 : i === 1 ? "1-2" : i === 2 ? "3-5" : i === 3 ? "6-10" : "11+"}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
