import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="max-w-2xl mx-auto px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p>shvm</p>
            <Link
              href="/"
              className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
            >
              <span className="flex items-center justify-center size-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </span>
            </Link>
            <Link
              href="/blog"
              className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
            >
              <span className="flex items-center justify-center size-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                  <path d="M2 2l7.586 7.586"/>
                  <circle cx="11" cy="11" r="2"/>
                </svg>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-1">
            {Object.entries(DATA.contact.social)
              .filter(([_, social]) => social.navbar)
              .map(([name, social]) => (
                <Link
                  key={name}
                  href={social.url}
                  className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex items-center justify-center size-4">
                    {social.icon({})}
                  </span>
                </Link>
              ))}
            <ModeToggle size="icon-sm" />
          </div>
        </div>
      </div>
    </nav>
  );
}
