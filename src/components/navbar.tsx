"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  CornerDownLeft,
  Mail,
  MoonIcon,
  Search,
  SunIcon,
  Terminal,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

type PaletteItem = {
  id: string;
  group: "Navigate" | "Projects" | "Socials" | "Actions";
  label: string;
  hint?: string;
  keywords?: string;
  href?: string;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  run?: () => void;
};

function pathFor(pathname: string) {
  if (pathname === "/") return "~";
  if (pathname.startsWith("/blog/")) return "~/blog/post";
  return `~${pathname}`;
}

function NavIcon({ icon, className }: { icon: any; className?: string }) {
  const Icon = icon as React.ComponentType<{ className?: string }>;
  return <Icon className={className ?? "size-4"} />;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Stronger chrome once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, []);

  // Global hotkeys: ⌘K / Ctrl+K toggles, "/" opens when not typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "/" && !open && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus + scroll-lock while the palette is open.
  useEffect(() => {
    if (!open) return;
    setCursor(0);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(DATA.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${DATA.contact.email}`;
    }
  }, []);

  const items: PaletteItem[] = useMemo(
    () => [
      ...DATA.navbar.map((n) => ({
        id: `nav-${n.href}`,
        group: "Navigate" as const,
        label: n.label,
        hint: n.href === "/" ? "~" : `~${n.href}`,
        keywords: `go to page ${n.label} ${n.href}`,
        href: n.href,
        icon: n.icon as unknown as React.ComponentType<{
          className?: string;
        }>,
      })),
      ...DATA.projects.map((p) => ({
        id: `proj-${p.title}`,
        group: "Projects" as const,
        label: p.title,
        hint: "repo ↗",
        keywords: `project repo github ${p.title} ${p.technologies.join(" ")}`,
        href: p.href,
        external: true,
      })),
      ...Object.entries(DATA.contact.social).map(([name, social]) => ({
        id: `soc-${name}`,
        group: "Socials" as const,
        label: social.name,
        hint: "↗",
        keywords: `social profile ${name} ${social.name} ${social.url}`,
        href: social.url,
        external: true,
        icon: social.icon as unknown as React.ComponentType<{
          className?: string;
        }>,
      })),
      {
        id: "act-theme",
        group: "Actions",
        label:
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        hint: "action",
        keywords: "theme dark light mode toggle appearance",
        icon: theme === "dark" ? SunIcon : MoonIcon,
        run: () => setTheme(theme === "dark" ? "light" : "dark"),
      },
      {
        id: "act-copy-email",
        group: "Actions",
        label: copied ? "Email copied!" : "Copy email address",
        hint: DATA.contact.email,
        keywords: "email copy contact mail",
        icon: copied ? Check : Mail,
        run: () => void copyEmail(),
      },
      {
        id: "act-terminal",
        group: "Actions",
        label: "Back to home prompt",
        hint: "~",
        keywords: "home root start",
        href: "/",
      },
    ],
    [theme, copied, copyEmail, setTheme],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.label} ${i.hint ?? ""} ${i.keywords ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [items, query]);

  useEffect(() => setCursor(0), [query]);
  useEffect(() => {
    if (cursor >= filtered.length) setCursor(0);
  }, [filtered.length, cursor]);

  const runItem = useCallback(
    (item: PaletteItem) => {
      if (item.run) {
        item.run();
      } else if (item.href) {
        if (item.external) window.open(item.href, "_blank", "noopener");
        else router.push(item.href);
      }
      closePalette();
    },
    [router, closePalette],
  );

  const onPaletteKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (filtered.length ? (c + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) =>
        filtered.length ? (c - 1 + filtered.length) % filtered.length : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[cursor];
      if (item) runItem(item);
    } else if (e.key === "Escape") {
      e.preventDefault();
      closePalette();
    }
  };

  // Keep the active row visible while keyboard-navigating.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-idx="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor, open]);

  const groups = useMemo(() => {
    const order: PaletteItem["group"][] = [
      "Navigate",
      "Projects",
      "Socials",
      "Actions",
    ];
    return order
      .map((g) => ({
        name: g,
        rows: filtered.filter((i) => i.group === g),
      }))
      .filter((g) => g.rows.length > 0);
  }, [filtered]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const socials = Object.entries(DATA.contact.social).filter(
    ([_, s]) => s.navbar,
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30">
        <div className="max-w-2xl mx-auto px-3 pt-3">
          <div
            className={cn(
              "flex items-center gap-1 rounded-2xl border bg-background/80 backdrop-blur-xl px-2 py-1.5 transition-shadow",
              scrolled
                ? "border-border shadow-lg shadow-black/[0.04] dark:shadow-black/30"
                : "border-border/40 shadow-sm",
            )}
          >
            {/* agent prompt — current location as a shell path */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  aria-label="Home"
                  className="hidden lg:flex items-center gap-2 rounded-lg px-2 py-1.5 font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
                >
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                  </span>
                  <span className="whitespace-nowrap">
                    <span className="text-foreground/80 font-medium">
                      shvm@web
                    </span>
                    <span className="opacity-60">:{pathFor(pathname)}$</span>
                  </span>
                  <span className="inline-block h-3.5 w-[7px] bg-foreground/70 animate-caret-blink" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="font-mono text-xs">shvm@web — online, go home</p>
              </TooltipContent>
            </Tooltip>

            {/* routes as commands */}
            <div className="flex items-center gap-0.5">
              {DATA.navbar.map((item) => {
                const active = isActive(item.href);
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        aria-label={item.label}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon-sm" }),
                          "relative md:w-auto md:px-2.5 md:gap-1.5",
                          active &&
                            "bg-accent text-accent-foreground after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:size-1 after:rounded-full after:bg-foreground/60",
                        )}
                      >
                        <span className="flex items-center justify-center size-4">
                          <NavIcon icon={item.icon} />
                        </span>
                        <span className="hidden md:inline text-xs font-medium">
                          {item.label}
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="font-mono text-xs">
                        /{item.label.toLowerCase()}{" "}
                        <span className="opacity-60">
                          {item.href === "/" ? "~" : `~${item.href}`}
                        </span>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>

            <div className="flex-1" />

            {/* socials — desktop only, the rest live in ⌘K */}
            <div className="hidden sm:flex items-center gap-0.5">
              {socials.map(([name, social]) => (
                <Tooltip key={name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon-sm" }),
                      )}
                    >
                      <span className="flex items-center justify-center size-4 [&_svg]:size-4 [&_svg]:max-h-4">
                        <NavIcon icon={social.icon} />
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="font-mono text-xs">{social.name} ↗</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <div className="hidden sm:block h-5 w-px bg-border mx-1" />

            {/* command palette trigger */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Open command palette"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon-sm" }),
                    "md:w-auto md:px-2.5 md:gap-1.5 text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Search className="size-4" />
                  <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] leading-none">
                    ⌘K
                  </kbd>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="font-mono text-xs">
                  command palette <span className="opacity-60">⌘K / /</span>
                </p>
              </TooltipContent>
            </Tooltip>

            <ModeToggleButton />
          </div>
        </div>
      </nav>

      {/* command palette */}
      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
              onClick={closePalette}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
            >
              {/* input row */}
              <div className="flex items-center gap-2 border-b border-border px-4">
                <Terminal className="size-4 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onPaletteKey}
                  placeholder="Type a command or search…"
                  aria-label="Search commands"
                  className="h-12 flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="rounded px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    clear
                  </button>
                )}
                <kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  esc
                </kbd>
              </div>

              {/* results */}
              <div
                ref={listRef}
                className="max-h-[42vh] overflow-y-auto p-2"
                role="listbox"
                aria-label="Commands"
              >
                {filtered.length === 0 && (
                  <p className="px-3 py-8 text-center font-mono text-xs text-muted-foreground">
                    no commands match “{query}” — try /navigate, a project, or
                    theme
                  </p>
                )}
                {groups.map((g) => (
                  <div key={g.name} className="mb-1 last:mb-0">
                    <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {g.name}
                    </p>
                    {g.rows.map((item) => {
                      const idx = filtered.indexOf(item);
                      const selected = idx === cursor;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-idx={idx}
                          role="option"
                          aria-selected={selected}
                          onMouseEnter={() => setCursor(idx)}
                          onClick={() => runItem(item)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                            selected
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <span className="flex items-center justify-center size-4 shrink-0 [&_svg]:size-4">
                            {item.icon ? (
                              <NavIcon icon={item.icon} />
                            ) : item.external ? (
                              <ArrowUpRight className="size-4" />
                            ) : (
                              <CornerDownLeft className="size-4" />
                            )}
                          </span>
                          <span className="flex-1 truncate font-medium">
                            {item.label}
                          </span>
                          {item.hint && (
                            <span className="shrink-0 truncate font-mono text-[11px] opacity-60">
                              {item.hint}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* footer hints */}
              <div className="flex items-center gap-3 border-t border-border px-4 py-2.5 font-mono text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border px-1">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border px-1">↵</kbd>
                  select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border px-1">esc</kbd>
                  close
                </span>
                <span className="ml-auto">
                  {filtered.length} command{filtered.length === 1 ? "" : "s"}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function ModeToggleButton() {
  const { theme, setTheme } = useTheme();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
        >
          <SunIcon className="size-4 dark:hidden" />
          <MoonIcon className="hidden size-4 dark:block" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p className="font-mono text-xs">toggle theme</p>
      </TooltipContent>
    </Tooltip>
  );
}
