import React from "react";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ChartNoAxesGantt, Github, GraduationCap, Home, Lightbulb } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "./ui/tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Link } from "react-router-dom"
export type IconProps = React.HTMLAttributes<SVGElement>;

export function DockDemo() {
  return (
    <div className="relative">
      <TooltipProvider>
        <Dock magnification={60} distance={50}>
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={'/'}>
                  <Home size={'md'} />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="mb-4">Home</TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
            <Tooltip>

              <TooltipTrigger asChild>
                <Link to={'/timeline'}>
                  <ChartNoAxesGantt size={'xl'} />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="mb-4">Timeline</TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
            <Tooltip>

              <TooltipTrigger asChild>
                <Link to={'/education'}>
                  <GraduationCap size={'md'} />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="mb-4">Education</TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={'/experience'}>
                  <Lightbulb size={'md'} />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="mb-4">Experience</TooltipContent>
            </Tooltip>
          </DockIcon>
          <Separator orientation="vertical" className="h-full" />
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3"  >
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={'/github'}>
                  <Github size={'md'} />

                </Link>
              </TooltipTrigger>
              <TooltipContent className="mb-4">Github</TooltipContent>
            </Tooltip>
          </DockIcon>

        </Dock>
      </TooltipProvider>
    </div >
  );
}


