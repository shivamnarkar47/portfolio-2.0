interface AchievementProps {
  title: string;
  description: string;
  date: string;
}

export function AchievementCard({
  title,
  description,
  date,
}: AchievementProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-base">{title}</h3>
        <span className="text-xs text-muted-foreground font-mono">{date}</span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
