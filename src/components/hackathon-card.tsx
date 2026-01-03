import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  links?: readonly {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
  badge?: any;
}

export function HackathonCard({
  title,
  description,
  dates,
  location,
  image,
  links,
  badge,
}: Props) {
  return (
    <div className="flex flex-1 flex-col justify-start gap-1">
      {dates && (
        <time className="text-xs text-muted-foreground font-mono">{dates}</time>
      )}
      <h2 className="font-semibold leading-none text-sm">{title}</h2>
      {location && (
        <p className="text-xs text-muted-foreground">{location}</p>
      )}
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          {description}
        </p>
      )}
      {links && links.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {links?.map((link, idx) => (
            <Link href={link.href} key={idx} className="flex gap-2">
              <Badge key={idx} variant="outline" className="flex gap-2 text-xs">
                {link.icon}
                {link.title}
              </Badge>
            </Link>
          ))}
        </div>
      )}
      {badge != "#" && (
        <Badge
          className="mt-3 text-xs w-fit"
          variant="secondary"
        >
          {badge}
        </Badge>
      )}
    </div>
  );
}
