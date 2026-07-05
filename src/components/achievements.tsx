//@ts-nocheck
import BlurFade from "@/components/magicui/blur-fade";
import { AchievementCard } from "@/components/achievement-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function AchievementsSection() {
  return (
    <section id="achievements">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <h2 className="text-xl font-bold">Achievements</h2>
          <p className="text-sm text-muted-foreground">
            Hackathon finalists, contributor recognitions, and milestone
            achievements
          </p>
        </BlurFade>
        <div className="flex flex-col gap-6">
          {DATA.achievements.map((achievement, id) => (
            <BlurFade
              key={achievement.title + achievement.date}
              delay={BLUR_FADE_DELAY * 16 + id * 0.03}
            >
              <Card className="border-l-2 border-l-foreground/20 px-4">
                <CardHeader className="pb-3">
                  <AchievementCard
                    title={achievement.title}
                    description={achievement.description}
                    date={achievement.date}
                  />
                </CardHeader>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
