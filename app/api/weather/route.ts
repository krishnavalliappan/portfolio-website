import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get API key and clean it up
    let API_KEY = process.env.OPENWEATHERAPI_KEY || "";

    // Clean up the API key - remove quotes, spaces, and any trailing characters
    API_KEY = API_KEY.replace(/["']/g, "").trim();
    if (API_KEY.endsWith("%")) {
      API_KEY = API_KEY.slice(0, -1);
    }

    console.log("API Key available:", !!API_KEY, "Length:", API_KEY.length); // Log if API key exists (not the actual key)

    if (!API_KEY || API_KEY === "your_openweathermap_api_key") {
      console.error("OpenWeatherMap API key is not configured properly");
      return NextResponse.json(
        {
          error: "API key not configured",
          temperature: 20,
          condition: "clear",
          city: "Woodstock",
          description: "Clear sky",
        },
        { status: 200 }
      );
    }

    console.log("Fetching weather data from OpenWeatherMap API...");

    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Woodstock,Ontario,CA&units=metric&appid=${API_KEY}&t=${timestamp}`;

    console.log("Fetching from URL:", url.replace(API_KEY, "API_KEY_HIDDEN"));

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Weather API error (${response.status}):`, errorText);
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Weather data received:", JSON.stringify(data));

    // Map OpenWeatherMap condition codes to our simplified conditions
    let condition = "clear";
    const weatherMain = data.weather[0].main;

    if (weatherMain === "Rain" || weatherMain === "Drizzle" || weatherMain === "Thunderstorm") {
      condition = "rain";
    } else if (weatherMain === "Snow") {
      condition = "snow";
    } else if (weatherMain === "Clouds" || weatherMain === "Mist" || weatherMain === "Fog" || weatherMain === "Haze") {
      condition = "cloudy";
    }

    const weatherData = {
      temperature: Math.round(data.main.temp),
      condition,
      city: "Woodstock",
      description: data.weather[0].description,
      timestamp: new Date().toISOString(), // Add timestamp to verify freshness
    };

    console.log("Processed weather data:", weatherData);

    return NextResponse.json(weatherData, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error: any) {
    console.error("Error fetching weather data:", error);

    // Return fallback data
    return NextResponse.json({
      temperature: 20,
      condition: "clear",
      city: "Woodstock",
      description: "Clear sky",
      error: error.message,
    });
  }
}
