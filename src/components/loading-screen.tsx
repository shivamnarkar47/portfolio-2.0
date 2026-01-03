"use client";

import { useState, useEffect } from "react";
import { DATA } from "@/data/resume";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(onComplete, 5000);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

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
              {[...skills, ...skills, ...skills].map((skill, i) => (
                <div
                  key={`${skill}-${i}`}
                  className="flex items-center gap-2 sm:gap-4 font-mono text-sm sm:text-xl md:text-2xl whitespace-nowrap"
                >
                  <span className="text-muted-foreground text-[10px] sm:text-xs">0{i % skills.length + 1}</span>
                  <span className="text-foreground">{skill}</span>
                  <span className="text-muted-foreground/30">/</span>
                  <span className="text-foreground">{skill}</span>
                  <span className="text-muted-foreground/30">/</span>
                  <span className="text-foreground">{skill}</span>
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
