"use client";

import { useState, useEffect, useRef } from "react";
import { DATA } from "@/data/resume";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface Line {
  id: number;
  index: string;
  skills: string[];
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsComplete(true);
          setTimeout(onComplete, 5000);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 80);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  useEffect(() => {
    const generateLines = () => {
      const newLines: Line[] = [];
      for (let i = 0; i < 30; i++) {
        const lineSkills = shuffleArray([...DATA.skills]).slice(0, 3);
        newLines.push({
          id: i,
          index: String(i + 1).padStart(2, "0"),
          skills: lineSkills,
        });
      }
      setLines(newLines);
    };

    generateLines();
    const interval = setInterval(generateLines, 2500);
    return () => clearInterval(interval);
  }, []);

  const skills = DATA.skills;

  return (
    <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-2xl border-x border-border/20 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-2xl px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 font-mono text-[10px] xs:text-xs text-muted-foreground tracking-widest text-center">
          {isComplete ? "COMPLETE // 100%" : `LOADING // ${progress.toFixed(0)}%`}
        </div>
        <div className="relative h-40 sm:h-56 overflow-hidden mask-image-vignette">
          <div className={isComplete ? "opacity-0 transition-opacity duration-1000" : "animate-marquee"}>
            <div className="flex flex-col gap-2 sm:gap-3">
              {lines.map((line) => (
                <div
                  key={line.id}
                  className="flex items-center gap-2 sm:gap-4 font-mono text-sm sm:text-xl md:text-2xl whitespace-nowrap"
                >
                  <span className="text-muted-foreground text-[10px] sm:text-xs">{line.index}</span>
                  <span className="text-foreground">{line.skills[0]}</span>
                  <span className="text-muted-foreground/30">/</span>
                  <span className="text-foreground">{line.skills[1]}</span>
                  <span className="text-muted-foreground/30">/</span>
                  <span className="text-foreground">{line.skills[2]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
        </div>
      </div>
      <div className="absolute bottom-6 sm:bottom-8 font-mono text-[8px] xs:text-[10px] text-muted-foreground tracking-widest">
        {isComplete ? "INITIALIZING..." : "ESTABLISHING CONNECTION..."}
      </div>
    </div>
  );
}
