import React from "react";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ChartNoAxesGantt, Github, GraduationCap, Home, Lightbulb } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function DockDemo() {
  return (
    <div className="relative">
      <Dock magnification={60} distance={50}>
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
          <Home size={'md'} />
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
          <ChartNoAxesGantt size={'xl'} />
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
          <GraduationCap size={'md'} />
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
          <Lightbulb size={'md'} />
        </DockIcon>
        <Separator orientation="vertical" className="h-full" />
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3" >
          <Github size={'md'} />
        </DockIcon>
      </Dock>
    </div>
  );
}


