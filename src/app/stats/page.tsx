import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ExternalLink, Trophy } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LiveStatsGrid } from "@/components/live-stats-grid";

const BLUR_FADE_DELAY = 0.04;

export default function StatsPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16 px-4">
      <section id="hero" className="pt-16 sm:pt-0">
        <div className="w-full max-w-2xl space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="flex items-center gap-3">
              <h1 className="font-medium text-3xl tracking-tighter">
                Live Stats
              </h1>
              <Badge variant="outline" className="font-mono text-[10px]">
                real-time
              </Badge>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
              A live view of my developer profiles — auto-refreshing stats from
              GitHub and CodeForces. Numbers update themselves.
            </p>
          </BlurFade>
        </div>
      </section>

      <section id="stats" className="w-full py-2">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <LiveStatsGrid />
        </BlurFade>
      </section>

      <section id="hackathons" className="w-full py-2">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="size-5" />
            <h2 className="text-xl font-bold">Hackathon Achievements</h2>
          </div>
        </BlurFade>
        <div className="flex flex-col gap-4">
          {DATA.hackathons.map((hackathon, id) => (
            <BlurFade
              key={hackathon.title}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <Card className="border-l-2 border-l-amber-500/30 px-4">
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <CardTitle className="text-lg">
                        {hackathon.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/20"
                        >
                          {hackathon.badge}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {hackathon.location} · {hackathon.dates}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {hackathon.description}
                  </p>
                </CardHeader>
              </Card>
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="achievement" className="pb-8">
        <BlurFade delay={BLUR_FADE_DELAY * 18}>
          <h2 className="text-xl font-bold mb-4">{"Let's Connect"}</h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-6">
            Interested in working together or want to discuss opportunities?
            Feel free to reach out through GitHub, LinkedIn, or X.
          </p>
          <div className="flex flex-wrap gap-4">
            {Object.entries(DATA.contact.social)
              .filter(([_, social]) => social.navbar)
              .map(([name, social]) => (
                <Link
                  key={name}
                  href={social.url}
                  target="_blank"
                  className={buttonVariants({ variant: "outline" })}
                >
                  <span className="flex items-center gap-2">
                    {social.icon({ className: "size-4" })}
                    {name}
                  </span>
                </Link>
              ))}
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
