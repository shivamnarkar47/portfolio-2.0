"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { JetBrains_Mono as FontMono } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/loading-screen";

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(pathname === "/");
  const handleComplete = useCallback(() => setIsLoading(false), []);

  return (
    <div
      className={cn(
        "min-h-screen bg-background font-mono antialiased",
        fontMono.variable,
      )}
    >
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider delayDuration={0}>
          <Navbar />
          <div className="pt-16 sm:pt-20 px-4 sm:px-6 max-w-2xl mx-auto">
            {children}
          </div>
          {isLoading && <LoadingScreen onComplete={handleComplete} />}
        </TooltipProvider>
      </ThemeProvider>
    </div>
  );
}
