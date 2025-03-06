"use client";

import { useEffect, useState } from "react";
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

  // Fetch Spotify data
  const fetchSpotifyData = async () => {
    setSpotifyLoading(true);
    try {
      console.log("Fetching Spotify data...");
      const timestamp = new Date().getTime();
      const url = `/api/spotify?t=${timestamp}`;
      console.log(`Requesting: ${url}`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      console.log(`Spotify API response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Spotify API error (${response.status}): ${errorText}`);
        throw new Error(`Spotify API responded with status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log("Spotify data received:", data);

      // Check if we got a valid response with isPlaying field
      if (data && typeof data.isPlaying !== "undefined") {
        // Update playing status
        const wasPlaying = isSpotifyPlaying;
        const nowPlaying = data.isPlaying || false;
        setIsSpotifyPlaying(nowPlaying);

        // If music just started playing and we're not showing Spotify, switch to it
        if (!wasPlaying && nowPlaying) {
          console.log("Music started playing, switching to Spotify widget");
          setCurrentWidget("spotify");
        }

        // If the music stopped playing and we're showing Spotify, switch to another widget
        if (wasPlaying && !nowPlaying && currentWidget === "spotify") {
          console.log("Music stopped playing, switching away from Spotify widget");
          setCurrentWidget(Math.random() > 0.5 ? "weather" : "activity");
        }

        setSpotifyData(data);
      } else {
        console.warn("Spotify API returned unexpected data format:", data);
        setIsSpotifyPlaying(false);
        setSpotifyData(null);

        // If we're currently showing Spotify, switch to another widget
        if (currentWidget === "spotify") {
          setCurrentWidget(Math.random() > 0.5 ? "weather" : "activity");
        }
      }
    } catch (error) {
      console.error("Error fetching Spotify data:", error);

      // If we're currently showing Spotify, switch to another widget
      if (currentWidget === "spotify") {
        console.log("Error occurred, switching away from Spotify widget");
        setCurrentWidget(Math.random() > 0.5 ? "weather" : "activity");
      }

      setIsSpotifyPlaying(false);
      setSpotifyData(null);
    } finally {
      setSpotifyLoading(false);
    }
  };

  // Fetch Spotify data on component mount and set up polling
  useEffect(() => {
    // Fetch data immediately
    fetchSpotifyData();

    // Set up polling to refresh data every 30 seconds
    const spotifyIntervalId = setInterval(fetchSpotifyData, 30000);

    return () => clearInterval(spotifyIntervalId);
  }, []);

  // Shuffle widgets
  useEffect(() => {
    // Set up interval to shuffle widgets every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentWidget((prev) => {
        // Only include Spotify in rotation if music is playing
        const availableWidgets = isSpotifyPlaying ? ["spotify", "weather", "activity"] : ["weather", "activity"];

        // If current widget is Spotify and music stopped, switch to something else
        if (prev === "spotify" && !isSpotifyPlaying) {
          return Math.random() > 0.5 ? "weather" : "activity";
        }

        // Normal rotation - pick next widget that's not the current one
        const filteredWidgets = availableWidgets.filter((widget) => widget !== prev);
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
