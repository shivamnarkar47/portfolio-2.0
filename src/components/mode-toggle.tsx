"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle({ size = "icon" }: { size?: "icon" | "icon-sm" | "icon-xs" }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      type="button"
      size={size}
      className="px-0"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="h-[1rem] w-[1rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden h-[1rem] w-[1rem] text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
}
