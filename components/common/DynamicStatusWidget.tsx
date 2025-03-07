"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { NowPlaying, SpotifyData } from "./NowPlaying";
import { WeatherWidget } from "./WeatherWidget";
import { ActivityWidget } from "./ActivityWidget";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DynamicStatusWidgetProps {
  className?: string;
}

export function DynamicStatusWidget({ className }: DynamicStatusWidgetProps) {
  // Randomly select initial widget from available widgets
  const getInitialWidget = () => {
    // Start with weather or activity if we don't know Spotify status yet
    return ["weather", "activity"][Math.floor(Math.random() * 2)] as "weather" | "activity";
  };

  const [currentWidget, setCurrentWidget] = useState<"spotify" | "weather" | "activity">(getInitialWidget());
  const [isSpotifyPlaying, setIsSpotifyPlaying] = useState(false);
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [spotifyLoading, setSpotifyLoading] = useState(true);

  // Use a ref to track if we should allow automatic rotation
  const allowRotation = useRef(true);
  // Track last Spotify status change time
  const lastSpotifyStatusChange = useRef(Date.now());

  // Fetch Spotify data
  const fetchSpotifyData = useCallback(async () => {
    setSpotifyLoading(true);
    try {
      const timestamp = new Date().getTime();
      const url = `/api/spotify?t=${timestamp}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Spotify API responded with status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();

      // Check if we got a valid response with isPlaying field
      if (data && typeof data.isPlaying !== "undefined") {
        // Check if Spotify status changed
        if (data.isPlaying !== isSpotifyPlaying) {
          lastSpotifyStatusChange.current = Date.now();

          // If music just started playing, switch to Spotify widget and pause rotation temporarily
          if (data.isPlaying && !isSpotifyPlaying) {
            setCurrentWidget("spotify");
            allowRotation.current = false;

            // Re-enable rotation after 10 seconds
            setTimeout(() => {
              allowRotation.current = true;
            }, 10000);
          }

          // If music stopped and we're showing Spotify, switch to another widget
          if (!data.isPlaying && isSpotifyPlaying && currentWidget === "spotify") {
            setCurrentWidget(Math.random() > 0.5 ? "weather" : "activity");
          }
        }

        // Update state
        setIsSpotifyPlaying(data.isPlaying || false);
        setSpotifyData(data);
      } else {
        setIsSpotifyPlaying(false);
        setSpotifyData(null);

        // If we're showing Spotify but there's no data, switch to another widget
        if (currentWidget === "spotify") {
          setCurrentWidget(Math.random() > 0.5 ? "weather" : "activity");
        }
      }
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
      setIsSpotifyPlaying(false);
      setSpotifyData(null);

      // If we're showing Spotify but there's an error, switch to another widget
      if (currentWidget === "spotify") {
        setCurrentWidget(Math.random() > 0.5 ? "weather" : "activity");
      }
    } finally {
      setSpotifyLoading(false);
    }
  }, [isSpotifyPlaying, currentWidget]);

  // Fetch Spotify data on component mount and set up polling
  useEffect(() => {
    // Fetch data immediately
    fetchSpotifyData();

    // Set up polling to refresh data every 30 seconds
    const spotifyIntervalId = setInterval(() => {
      fetchSpotifyData();
    }, 30000);

    return () => clearInterval(spotifyIntervalId);
  }, [fetchSpotifyData]);

  // Widget rotation logic
  useEffect(() => {
    // Set up interval to shuffle widgets every 5 seconds
    const intervalId = setInterval(() => {
      // Skip rotation if it's temporarily disabled or if it's been less than 5 seconds since Spotify status changed
      if (!allowRotation.current || Date.now() - lastSpotifyStatusChange.current < 5000) {
        return;
      }

      setCurrentWidget((prev) => {
        // Only include Spotify in rotation if music is playing
        const availableWidgets = isSpotifyPlaying ? ["spotify", "weather", "activity"] : ["weather", "activity"];

        // If current widget is Spotify and music stopped, switch to something else
        if (prev === "spotify" && !isSpotifyPlaying) {
          return Math.random() > 0.5 ? "weather" : "activity";
        }

        // Normal rotation - pick next widget that's not the current one
        const filteredWidgets = availableWidgets.filter((widget) => widget !== prev);
        if (filteredWidgets.length === 0) return prev; // Safety check

        return filteredWidgets[Math.floor(Math.random() * filteredWidgets.length)] as
          | "spotify"
          | "weather"
          | "activity";
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isSpotifyPlaying]);

  // Render the appropriate widget based on current state
  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        {currentWidget === "spotify" && isSpotifyPlaying && (
          <motion.div
            key="spotify"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <NowPlaying data={spotifyData} loading={spotifyLoading} />
          </motion.div>
        )}
        {currentWidget === "weather" && (
          <motion.div
            key="weather"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <WeatherWidget />
          </motion.div>
        )}
        {currentWidget === "activity" && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ActivityWidget />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
