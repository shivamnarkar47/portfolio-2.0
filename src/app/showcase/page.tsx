//@ts-nocheck
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BLUR_FADE_DELAY = 0.04;

export default function ShowcasePage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16 px-4">
      <section id="hero">
        <div className="w-full max-w-2xl space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="font-medium text-3xl tracking-tighter">
              Project Showcase
            </h1>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
              A closer look at my projects. Each represents a unique challenge
              solved with modern technologies. Explore the details and see how
              each solution came to life.
            </p>
          </BlurFade>
        </div>
      </section>

      <section id="projects" className="w-full py-2">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <h2 className="text-xl font-bold mb-6">Featured Projects</h2>
        </BlurFade>
        <div className="flex flex-col gap-6">
          {DATA.projects.map((project, id) => (
            <BlurFade
              key={project.title}
              delay={BLUR_FADE_DELAY * 3 + id * 0.05}
            >
              <Card className="border-l-2 border-l-foreground/20 px-4">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <CardTitle className="text-lg">
                      <Link
                        href={project.href}
                        target="_blank"
                        className="hover:underline"
                      >
                        {project.title}
                      </Link>
                    </CardTitle>
                    <span className="text-sm text-muted-foreground font-mono shrink-0">
                      {project.dates}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.links.map((link) => (
                      <Link
                        key={link.type}
                        href={link.href}
                        target="_blank"
                        className="text-sm hover:underline flex items-center gap-2 text-muted-foreground"
                      >
                        <ExternalLink className="size-3" />
                        {link.type}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="technical-details" className="pb-8">
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <h2 className="text-xl font-bold mb-4">Technical Approach</h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            Every project follows a systematic approach: understanding
            requirements, designing the solution, implementing with best
            practices, and refining based on feedback.
          </p>
        </BlurFade>
      </section>
    </main>
  );
}
