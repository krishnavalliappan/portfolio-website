"use client";

import Link from "next/link";
import React from "react";

import { ModeToggle } from "@/components/common/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Icons } from "@/components/common/Icons";
import { siteData } from "@/data";
import { DynamicStatusWidget } from "@/components/common/DynamicStatusWidget";

export function NavBar() {
  return (
    <div className="flex flex-col items-center justify-center fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <TooltipProvider>
        <Dock iconDistance={5} iconMagnification={60} className="macos-dock px-2 py-2 shadow-xl">
          {siteData.dock.navbar.map((item) => (
            <DockIcon key={item.label} className="mx-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-full rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    )}
                  >
                    <item.icon className="size-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-card/90 backdrop-blur-md border border-primary/20 text-foreground"
                >
                  <p className="font-medium">{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-6 bg-white/20 dark:bg-white/20 mx-0.5" />
          <DynamicStatusWidget className="mx-1" />
          <DockIcon className="mx-0" magnification={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="size-full flex items-center justify-center">
                  <ModeToggle />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-card/90 backdrop-blur-md border border-primary/20 text-foreground"
              >
                <p className="font-medium">Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
