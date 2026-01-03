import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  active?: boolean;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  active,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Link
      href={href || "#"}
      className={cn("block cursor-pointer h-full ", className)}
    >
      <Card
        className={
          "flex flex-col overflow-hidden border hover:shadow-md transition-all duration-300 ease-out h-full"
        }
      >
        <CardHeader className="px-3 pt-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="mt-1 text-base">{title}</CardTitle>
              {active && (
                <Badge className="text-xs bg-green-500 dark:bg-green-700">
                  <Circle className="w-2 mr-1 fill-green-500" /> Running
                </Badge>
              )}
            </div>
            <time className="font-mono text-xs text-muted-foreground">{dates}</time>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </CardHeader>
        <CardContent className="mt-auto flex flex-col px-3">
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags?.map((tag) => (
                <Badge
                  className="text-xs"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        {links && links.length > 0 && (
          <CardContent className="px-3 pb-3">
            <div className="flex flex-row flex-wrap items-start gap-1">
              {links?.map((link, idx) => (
                <Link href={link?.href} key={idx} target="_blank">
                  <Badge key={idx} className="flex gap-2 px-2 py-1 text-xs">
                    {link.icon}
                    {link.type}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
