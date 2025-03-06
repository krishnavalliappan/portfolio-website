"use client";

import { useEffect, useState } from "react";
import { Cloud, CloudRain, CloudSnow, Sun, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface WeatherData {
  temperature: number;
  condition: "clear" | "cloudy" | "rain" | "snow";
  city: string;
  description?: string;
  timestamp?: string;
  error?: string;
}

interface WeatherWidgetProps {
  className?: string;
}

export function WeatherWidget({ className }: WeatherWidgetProps) {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 0,
    condition: "clear",
    city: "Woodstock",
  });

  // Fetch weather data
  const fetchWeather = async () => {
    try {
      // Using our API route instead of calling OpenWeatherMap directly
      const timestamp = new Date().getTime();

      const response = await fetch(`/api/weather?t=${timestamp}`, {
        method: "GET",
        cache: "no-store",
        headers: {
          Pragma: "no-cache",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Expires: "0",
        },
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        throw new Error(`Weather API responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Weather data fetched:", data); // Debug log

      if (data.error) {
        console.error("Error in weather data:", data.error);
        throw new Error(data.error);
      }

      // Verify we're not using fallback data
      if (data.temperature === 20 && data.condition === "clear" && !data.timestamp) {
        console.warn("Received fallback weather data");
      } else {
        console.log("Received fresh weather data with timestamp:", data.timestamp);
      }

      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      // Fallback to default weather
      setWeatherData({
        temperature: 20,
        condition: "clear",
        city: "Woodstock",
      });
    }
  };

  // Dedicated effect for weather fetching
  useEffect(() => {
    console.log("Weather fetching effect initialized");

    // Fetch weather data immediately on component mount
    fetchWeather();

    // Also set up a listener for when the window regains focus
    const handleFocus = () => {
      console.log("Window focused, fetching fresh weather data");
      fetchWeather();
    };

    // Set up an interval to fetch weather data every 2 minutes
    const weatherIntervalId = setInterval(() => {
      console.log("Weather interval triggered");
      fetchWeather();
    }, 120000); // 2 minutes

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
      clearInterval(weatherIntervalId);
    };
  }, []);

  const getWeatherIcon = () => {
    switch (weatherData.condition) {
      case "rain":
        return <CloudRain size={16} className="text-blue-400 animate-rain" />;
      case "snow":
        return <CloudSnow size={16} className="text-blue-200 animate-snow" />;
      case "cloudy":
        return <Cloud size={16} className="text-gray-400 animate-cloud-drift" />;
      case "clear":
      default:
        return <Sun size={16} className="text-yellow-400 animate-sun-pulse" />;
    }
  };

  // Format timestamp for tooltip if available
  const formattedTimestamp = weatherData.timestamp ? new Date(weatherData.timestamp).toLocaleTimeString() : "Unknown";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center bg-black/80 rounded-full px-2 py-1 md:max-w-[180px] max-w-[120px] transition-all duration-300 ease-in-out",
              className
            )}
          >
            <div className="flex-shrink-0 mr-2">{getWeatherIcon()}</div>
            <div className="flex flex-col min-w-0">
              <p className="text-[10px] font-medium truncate text-white">
                {weatherData.temperature}°C in {weatherData.city}
              </p>
              <p className="text-[8px] text-gray-300 truncate">
                {weatherData.description ||
                  weatherData.condition.charAt(0).toUpperCase() + weatherData.condition.slice(1)}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-card/90 backdrop-blur-md border border-primary/20 text-foreground">
          <div className="flex items-center gap-2">
            <Thermometer size={14} className="text-primary" />
            <p>Weather in {weatherData.city}</p>
          </div>
          <p className="text-xs mt-1">{weatherData.description}</p>
          <p className="text-xs mt-1 text-muted-foreground">Updated: {formattedTimestamp}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
