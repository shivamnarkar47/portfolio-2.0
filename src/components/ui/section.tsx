import { cn } from "@/lib/utils";

interface SectionProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export function Section({
  className,
  children,
  title,
  description,
}: SectionProps) {
  return (
    <div className={cn("flex flex-col gap-x-6 gap-y-8", className)}>
      {title && (
        <div className="flex min-h-0 flex-col items-start gap-y-1">
          <h2 className="text-xl font-bold">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
