"use client";

import { useEffect, useState } from "react";
import { Code, Coffee, Dumbbell, Moon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface ActivityData {
  activity: "coding" | "gym" | "sleeping" | "chilling";
  text: string;
}

interface ActivityWidgetProps {
  className?: string;
}

export function ActivityWidget({ className }: ActivityWidgetProps) {
  const [activityData, setActivityData] = useState<ActivityData>({
    activity: "coding",
    text: "Probably coding...",
  });

  // Function to determine current activity based on time
  const determineActivity = (): ActivityData => {
    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekday = day >= 1 && day <= 5;

    if (hours >= 22 || hours < 5) {
      return {
        activity: "sleeping",
        text: "Dreaming in code...",
      };
    } else if (isWeekday && hours >= 8 && hours < 17) {
      return {
        activity: "coding",
        text: "Turning coffee into code...",
      };
    } else if (hours >= 19 && hours < 21) {
      return {
        activity: "gym",
        text: "Debugging muscles...",
      };
    } else {
      return {
        activity: "chilling",
        text: "Probably overthinking algorithms...",
      };
    }
  };

  useEffect(() => {
    // Set initial activity
    setActivityData(determineActivity());

    // Update activity data every minute
    const activityIntervalId = setInterval(() => {
      setActivityData(determineActivity());
    }, 60000);

    return () => {
      clearInterval(activityIntervalId);
    };
  }, []);

  const getActivityIcon = () => {
    switch (activityData.activity) {
      case "coding":
        return <Code size={16} className="text-green-400 animate-coding" />;
      case "gym":
        return <Dumbbell size={16} className="text-red-400 animate-gym" />;
      case "sleeping":
        return <Moon size={16} className="text-blue-300 animate-sleep" />;
      case "chilling":
      default:
        return <Coffee size={16} className="text-orange-400 animate-coffee" />;
    }
  };

  // Get background color based on activity
  const getActivityBgColor = () => {
    switch (activityData.activity) {
      case "coding":
        return "bg-green-950/80";
      case "gym":
        return "bg-red-950/80";
      case "sleeping":
        return "bg-blue-950/80";
      case "chilling":
      default:
        return "bg-orange-950/80";
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center rounded-full px-2 py-1 md:max-w-[180px] max-w-[120px] transition-all duration-300 ease-in-out",
              getActivityBgColor(),
              className
            )}
          >
            <div className="flex-shrink-0 mr-2">{getActivityIcon()}</div>
            <div className="flex flex-col min-w-0">
              <p className="text-[10px] font-medium truncate text-white">
                {activityData.activity.charAt(0).toUpperCase() + activityData.activity.slice(1)}
              </p>
              <p className="text-[8px] text-gray-300 truncate">{activityData.text}</p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-card/90 backdrop-blur-md border border-primary/20 text-foreground">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-primary" />
            <p>Current Activity</p>
          </div>
          <p className="text-xs mt-1">{activityData.text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
