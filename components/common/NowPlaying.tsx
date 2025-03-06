"use client";

import { Music, ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
  album?: string;
  timestamp?: string;
}

interface NowPlayingProps {
  className?: string;
  data: SpotifyData | null;
  loading?: boolean;
}

export function NowPlaying({ className, data, loading = false }: NowPlayingProps) {
  // Loading state
  if (loading) {
    return (
      <div className={cn("flex items-center gap-2 py-1 px-2", "macos-dock-player", "h-10 max-w-[144px]", className)}>
        <div className="animate-pulse rounded-full bg-white/20 h-7 w-7"></div>
        <div className="space-y-1 flex-1">
          <div className="animate-pulse rounded h-2.5 w-24 bg-white/20"></div>
          <div className="animate-pulse rounded h-2 w-16 bg-white/10"></div>
        </div>
      </div>
    );
  }

  // If not playing or no data, don't render anything
  if (!data || !data.isPlaying) {
    return null;
  }

  // Playing state
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center gap-2 py-1 px-2 cursor-pointer",
              "macos-dock-player",
              "h-10 md:max-w-[180px] max-w-[120px] transition-all hover:opacity-90",
              className
            )}
          >
            <div className="relative h-7 w-7 flex-shrink-0">
              {data.albumImageUrl ? (
                <Image
                  src={data.albumImageUrl}
                  alt={`${data.title} album cover`}
                  className="rounded-md object-cover"
                  fill
                  sizes="28px"
                />
              ) : (
                <div className={cn("flex items-center justify-center h-7 w-7 rounded-md", "bg-purple-900/50")}>
                  <Music size={14} className="text-purple-300" />
                </div>
              )}
            </div>

            <div className="flex-1 overflow-hidden">
              <p className="text-[10px] font-medium truncate text-white">{data.title}</p>
              <p className="text-[8px] text-gray-300 truncate">{data.artist}</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex space-x-0.5 mr-1">
                {[0, 1, 2, 3, 2, 1].map((height, i) => (
                  <div
                    key={i}
                    className="w-0.5 rounded-full bg-white/70 animate-sound-wave"
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      height: `${4 + height}px`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-card/90 backdrop-blur-md border border-primary/20 text-foreground">
          <div className="flex items-center gap-2">
            <Music size={14} className="text-primary animate-pulse" />
            <p>in Spotify</p>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <p>Want to listen?</p>
            <a href={data.songUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0.5 hover:bg-transparent hover:text-foreground">
                <ExternalLink size={14} />
              </Button>
            </a>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
