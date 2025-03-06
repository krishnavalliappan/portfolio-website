"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-full rounded-full flex items-center justify-center text-foreground hover:bg-transparent hover:text-inherit transition-all duration-100 focus:outline-none"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun
        className="
    h-[1.2rem] 
    w-[1.2rem] 
    rotate-0 
    scale-100 
    transition-transform 
    duration-100 
    ease-in-out 
    dark:-rotate-90 
    dark:scale-0
  "
      />

      <Moon
        className="
    absolute 
    h-[1.2rem] 
    w-[1.2rem] 
    rotate-90 
    scale-0 
    transition-transform 
    duration-100 
    ease-in-out 
    dark:rotate-0 
    dark:scale-100
  "
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
