"use client";

import { motion } from "framer-motion";

type LanguageData = {
  name: string;
  count: number;
  percentage: number;
  stars: number;
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-foreground",
  JavaScript: "bg-foreground/80",
  Python: "bg-foreground/60",
  Go: "bg-foreground/70",
  Rust: "bg-foreground/50",
  OCaml: "bg-foreground/40",
  Java: "bg-foreground/60",
  "C++": "bg-foreground/50",
  C: "bg-foreground/40",
  "C#": "bg-foreground/60",
  Ruby: "bg-foreground/50",
  PHP: "bg-foreground/40",
  Swift: "bg-foreground/50",
  Kotlin: "bg-foreground/60",
  Dart: "bg-foreground/50",
  HTML: "bg-foreground/40",
  CSS: "bg-foreground/50",
  Shell: "bg-foreground/30",
  QML: "bg-foreground/40",
  "Vim Script": "bg-foreground/30",
  Dockerfile: "bg-foreground/40",
  Makefile: "bg-foreground/30",
};

function langColor(name: string): string {
  return LANG_COLORS[name] ?? "bg-muted-foreground";
}

export function LanguagesBar({ languages }: { languages: LanguageData[] }) {
  if (!languages || languages.length === 0) return null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
          Languages
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          Top {languages.length} languages across all repos
        </p>
      </div>

      {/* segmented bar */}
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
        {languages.map((lang, i) => (
          <motion.div
            key={lang.name}
            initial={{ width: 0 }}
            animate={{ width: `${lang.percentage}%` }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`${langColor(lang.name)} h-full`}
            style={{
              borderRadius:
                i === 0
                  ? "9999px 0 0 9999px"
                  : i === languages.length - 1
                    ? "0 9999px 9999px 0"
                    : "0",
            }}
            title={`${lang.name}: ${lang.percentage}% (${lang.count} repos)`}
          />
        ))}
      </div>

      {/* legend */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-2 text-sm">
            <span
              className={`size-2.5 shrink-0 rounded-sm ${langColor(lang.name)}`}
            />
            <span className="font-medium truncate">{lang.name}</span>
            <span className="ml-auto font-mono text-xs text-muted-foreground">
              {lang.percentage}%
            </span>
          </div>
        ))}
      </div>

      {/* per-language cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {languages.map((lang, i) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-xl border bg-card p-3"
          >
            <span
              className={`size-4 shrink-0 rounded ${langColor(lang.name)}`}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{lang.name}</p>
              <p className="text-xs text-muted-foreground">
                {lang.count} {lang.count === 1 ? "repo" : "repos"} ·{" "}
                {lang.stars} stars
              </p>
            </div>
            <p className="font-mono text-lg font-bold">{lang.percentage}%</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
