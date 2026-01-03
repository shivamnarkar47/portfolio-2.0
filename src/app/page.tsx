//@ts-nocheck
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DATA } from "@/data/resume";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16">
      <section id="hero" className="pt-16 sm:pt-0">
        <div className="w-full max-w-2xl space-y-6">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
            yOffset={8}
            text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
          />
          <BlurFadeText
            className="max-w-[600px] md:text-lg text-muted-foreground"
            delay={BLUR_FADE_DELAY}
            text={DATA.description}
          />
        </div>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <div className="flex flex-col gap-6">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 4 + id * 0.05}
              >
                <Card className="border-l-2 border-l-foreground/20 px-4">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <CardTitle className="text-lg">
                        <Link href={work.href} target="_blank" className="hover:underline">
                          {work.company}
                        </Link>
                      </CardTitle>
                      <span className="text-sm text-muted-foreground font-mono shrink-0">
                        {work.start} - {work.end}
                      </span>
                    </div>
                    <p className="text-base text-muted-foreground mt-1">{work.title}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                      {Array.isArray(work.description) ? (
                        work.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))
                      ) : (
                        <li>{work.description}</li>
                      )}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {work.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-sm">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-6">
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <Card className="border-l-2 border-l-foreground/20 px-4">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                      <Link href={education.href} target="_blank" className="hover:underline">
                        {education.school}
                      </Link>
                    </CardTitle>
                    <p className="text-base text-muted-foreground mt-1">{education.degree}</p>
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm text-muted-foreground font-mono">
                      {education.start} - {education.end}
                    </span>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
                <Badge key={skill} variant="outline" className="font-mono text-sm px-3 py-1">
                  {skill}
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="w-full py-2">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold mb-6">Projects</h2>
          </BlurFade>
          <div className="flex flex-col gap-6">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 10 + id * 0.05}
              >
                <Card className="border-l-2 border-l-foreground/20 px-4">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <CardTitle className="text-lg">
                        <Link href={project.href} target="_blank" className="hover:underline">
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
                    <div className="flex flex-wrap gap-4">
                      {project.links.map((link) => (
                        <Link
                          key={link.type}
                          href={link.href}
                          target="_blank"
                          className="text-sm hover:underline flex items-center gap-2 text-muted-foreground"
                        >
                          {link.icon}
                          {link.type}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="hackathons">
        <div className="w-full py-2">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <h2 className="text-xl font-bold mb-6">Hackathons</h2>
          </BlurFade>
          <div className="flex flex-col gap-6">
            {DATA.hackathons.map((hackathon, id) => (
              <BlurFade
                key={hackathon.title + hackathon.dates}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <Card className="border-l-2 border-l-foreground/20 px-4">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <CardTitle className="text-lg">{hackathon.title}</CardTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        {hackathon.badge && hackathon.badge !== "#" && (
                          <Badge variant="secondary" className="text-sm">
                            {hackathon.badge}
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground font-mono shrink-0">
                          {hackathon.dates}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{hackathon.location}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">
                      {hackathon.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {hackathon.links.map((link) => (
                        <Link
                          key={link.title}
                          href={link.href}
                          target="_blank"
                          className="text-sm hover:underline flex items-center gap-2 text-muted-foreground"
                        >
                          {link.icon}
                          {link.title}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="pb-8">
        <div className="w-full py-2">
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Contact</h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                Want to chat? Send me a DM{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-foreground hover:underline"
                >
                  on X
                </Link>{" "}
                and I&apos;ll respond when I can.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
