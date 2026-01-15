"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GitHubGraphProps {
  username?: string;
  accessToken?: string;
  className?: string;
}

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

const DAYS = ["Mon", "", "Wed", "", "Fri", ""];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getMonthLabels = (): { month: string; index: number }[] => {
  const labels: { month: string; index: number }[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 364);

  let currentMonth = "";
  for (let i = 0; i < 53; i++) {
    const weekDate = new Date(startDate);
    weekDate.setDate(startDate.getDate() + i * 7);
    const month = MONTHS[weekDate.getMonth()];

    if (month !== currentMonth) {
      labels.push({ month, index: i });
      currentMonth = month;
    }
  }

  return labels;
};

const getLevel = (count: number): number => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
};

const calculateStreak = (weeks: ContributionWeek[]): number => {
  const allDays: ContributionDay[] = [];
  weeks.forEach(week => {
    allDays.push(...week.contributionDays);
  });

  const sortedDays = allDays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let streak = 0;
  for (const day of sortedDays) {
    if (day.contributionCount > 0) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

export function GitHubGraph({ username = "shivamnarkar47", accessToken, className }: GitHubGraphProps) {
  const [contributions, setContributions] = useState<ContributionWeek[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      if (!accessToken) {
        setError("Access token required");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query($login: String!) {
                user(login: $login) {
                  contributionsCollection {
                    contributionCalendar {
                      totalContributions
                      weeks {
                        contributionDays {
                          date
                          contributionCount
                          color
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: { login: username },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch contributions");
        }

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;

        if (calendar?.weeks) {
          const weeks = calendar.weeks as ContributionWeek[];
          setContributions(weeks);
          setTotalContributions(calendar.totalContributions || 0);
          setStreak(calculateStreak(weeks));
        } else {
          throw new Error("No contribution data");
        }
      } catch (err) {
        console.error("Error fetching GitHub contributions:", err);
        setError("Unable to load contributions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributions();
  }, [username, accessToken]);

  const monthLabels = getMonthLabels();

  const cellSize = 10;
  const cellGap = 2;
  const totalCellWidth = cellSize + cellGap;
  const leftPadding = 30;
  const topPadding = 20;
  const graphWidth = contributions.length * totalCellWidth;
  const svgWidth = graphWidth + leftPadding;
  const svgHeight = 7 * cellSize + 6 * cellGap + 30;

  if (isLoading) {
    return (
      <div ref={containerRef} className={cn("w-full animate-pulse", className)}>
        <div className="h-24 bg-muted rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div ref={containerRef} className={cn("w-full", className)}>
        <div className="h-24 bg-muted rounded-lg flex items-center justify-center">
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("w-full relative", className)}>
      <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
        <g transform={`translate(${leftPadding}, ${topPadding})`}>
          <g>
            {DAYS.map((label, i) => (
              <text key={i} x={-6} y={i * (cellSize + cellGap) + cellSize / 1.6} textAnchor="end" className="text-[8px] fill-muted-foreground" style={{ fontSize: "8px" }}>
                {label}
              </text>
            ))}
          </g>

          {monthLabels.map((label, i) => (
            <text key={i} x={label.index * totalCellWidth} y={-6} className="text-[8px] fill-muted-foreground" style={{ fontSize: "8px" }}>
              {label.month}
            </text>
          ))}

          {contributions.map((week, weekIndex) => (
            <g key={weekIndex} transform={`translate(${weekIndex * totalCellWidth}, 0)`}>
              {week.contributionDays.map((day, dayIndex) => (
                <rect
                  key={day.date}
                  x={0}
                  y={dayIndex * (cellSize + cellGap)}
                  width={cellSize}
                  height={cellSize}
                  rx={1}
                  className={cn("transition-all duration-200", `level-${getLevel(day.contributionCount)}`)}
                >
                  <title>{`${day.date}: ${day.contributionCount} contributions`}</title>
                </rect>
              ))}
            </g>
          ))}
        </g>
      </svg>

      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--muted-foreground) / 0.1)" }} />
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--primary) / 0.3)" }} />
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--primary) / 0.5)" }} />
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--primary) / 0.7)" }} />
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--primary))" }} />
        </div>
        <span>More</span>
      </div>

      <div className="absolute -top-4 right-0 text-sm">
        <span className="text-muted-foreground ">{totalContributions.toLocaleString()} contributions</span>
      </div>

      <div className="absolute bottom-0 right-0 text-xs text-muted-foreground">
        {streak > 0 ? `${streak} day streak` : "No streak"}
      </div>

      <style>{`
        .level-0 { fill: hsl(var(--muted-foreground) / 0.1); }
        .level-1 { fill: hsl(var(--primary) / 0.3); }
        .level-2 { fill: hsl(var(--primary) / 0.5); }
        .level-3 { fill: hsl(var(--primary) / 0.7); }
        .level-4 { fill: hsl(var(--primary)); }
        .level-0:hover, .level-1:hover, .level-2:hover, .level-3:hover, .level-4:hover { opacity: 0.8; }
      `}</style>
    </div>
  );
}
