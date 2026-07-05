//@ts-nocheck
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Star, Users, Medal, TrendingUp, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const BLUR_FADE_DELAY = 0.04;

const stats = [
  {
    title: "GitHub Stars",
    value: "1.2K+",
    description: "Total stars across repositories",
    icon: Star,
  },
  {
    title: "GitHub Followers",
    value: "350+",
    description: "Community following",
    icon: Users,
  },
  {
    title: "CodeWars",
    value: "Gold III",
    description: "Kata completed",
    icon: Medal,
  },
  {
    title: "LeetCode",
    value: "Top 1000",
    description: "Global ranking in contests",
    icon: TrendingUp,
  },
];

const hackathonStats = [
  {
    title: "CodeCrafters",
    result: "1st Runner Up",
    more: "(Financial Tech Platform)",
  },
  {
    title: "Coherence 3.0",
    result: "Finalist",
    more: "(Smart City Dashboard)",
  },
  { title: "Coherence 1.0", result: "Finalist", more: "(Virtual Assistant)" },
  {
    title: "Technothon",
    result: "Finalist & Special Mention",
    more: "(Food Waste Management)",
  },
];

const skillHighlights = [
  { title: "React", level: "Mastery", count: 10 },
  { title: "Next.js", level: "Advanced", count: 8 },
  { title: "Django", level: "Advanced", count: 6 },
  { title: "Docker", level: "Proficient", count: 20 },
];

export default function StatsPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16 px-4">
      <section id="hero">
        <div className="w-full max-w-2xl space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="font-medium text-3xl tracking-tighter">
              GitHub Stats & Activity
            </h1>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
              A snapshot of my developer journey, from open source contributions
              to hackathon achievements. Numbers don&apos;t tell the whole
              story, but they show consistency and growth.
            </p>
          </BlurFade>
        </div>
      </section>

      <section id="stats" className="w-full py-2">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <h2 className="text-xl font-bold mb-6">GitHub Statistics</h2>
        </BlurFade>
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={stat.title}>
              <Card className="border-l-2 border-l-foreground/20 px-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold">
                    {stat.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {stat.title}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="hackathons" className="w-full py-2">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="text-xl font-bold mb-6">Hackathon Achievements</h2>
        </BlurFade>
        <div className="flex flex-col gap-6">
          {hackathonStats.map((hackathon, id) => (
            <BlurFade
              key={hackathon.title}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <Card className="border-l-2 border-l-foreground/20 px-4">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg">{hackathon.title}</CardTitle>
                    <Badge variant="secondary" className="text-sm shrink-0">
                      {hackathon.result}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {hackathon.more}
                  </p>
                </CardHeader>
              </Card>
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="skills" className="w-full py-2">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <h2 className="text-xl font-bold mb-6">Skill Highlights</h2>
        </BlurFade>
        <div className="flex flex-col gap-6">
          {skillHighlights.map((skill, id) => (
            <BlurFade
              key={skill.title}
              delay={BLUR_FADE_DELAY * 13 + id * 0.05}
            >
              <Card className="border-l-2 border-l-foreground/20 px-4">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg">{skill.title}</CardTitle>
                    <Badge variant="secondary" className="text-sm shrink-0">
                      {skill.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {skill.count} projects completed
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
