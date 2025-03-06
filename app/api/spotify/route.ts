import { NextResponse } from "next/server";

// Spotify API endpoints
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

// Environment variables
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

// Get access token using refresh token
const getAccessToken = async () => {
  try {
    if (!client_id || !client_secret || !refresh_token) {
      console.error("Spotify credentials missing");
      throw new Error("Spotify credentials missing");
    }

    console.log("Spotify credentials found, attempting to get access token");
    console.log(`Client ID length: ${client_id.length}`);
    console.log(`Client Secret length: ${client_secret.length}`);
    console.log(`Refresh Token length: ${refresh_token.length}`);
    console.log(`Refresh Token first 10 chars: ${refresh_token.substring(0, 10)}...`);

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

    console.log("Requesting Spotify access token...");
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      }),
    });

    console.log(`Token response status: ${response.status}`);

    if (response.status === 401) {
      const errorText = await response.text();
      console.error(`Spotify authentication failed (401): ${errorText}`);
      throw new Error("Spotify refresh token is invalid or expired. Please generate a new refresh token.");
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Token request failed: ${response.status} - ${errorText}`);
      throw new Error(`Token request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("Access token obtained successfully");
    return data;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};

// Get currently playing song
const getNowPlaying = async () => {
  try {
    const { access_token } = await getAccessToken();

    console.log("Access token obtained, requesting currently playing track...");
    console.log(`Access token first 10 chars: ${access_token.substring(0, 10)}...`);

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    });

    console.log(`Now playing response status: ${response.status}`);

    if (response.status === 401) {
      const errorText = await response.text();
      console.error(`Spotify API unauthorized (401): ${errorText}`);
      throw new Error("Spotify access token is invalid. Authentication failed.");
    }

    return response;
  } catch (error) {
    console.error("Error in getNowPlaying:", error);
    throw error;
  }
};

// API route handler
export async function GET() {
  console.log("Spotify API route called");

  if (!client_id || !client_secret || !refresh_token) {
    console.error("Spotify API credentials missing");
    return NextResponse.json(
      {
        isPlaying: false,
        error: "Spotify credentials not configured",
        details: {
          hasClientId: !!client_id,
          hasClientSecret: !!client_secret,
          hasRefreshToken: !!refresh_token,
        },
      },
      { status: 200 }
    );
  }

  try {
    const response = await getNowPlaying();

    if (response.status === 204) {
      console.log("No track currently playing (204 status)");
      return NextResponse.json({ isPlaying: false, message: "No track currently playing" }, { status: 200 });
    }

    if (response.status === 401) {
      console.error("Spotify API authentication failed (401)");
      return NextResponse.json(
        { isPlaying: false, error: "Spotify authentication failed. Refresh token may be expired." },
        { status: 200 }
      );
    }

    if (response.status > 400) {
      console.error(`Spotify API error: ${response.status}`);
      return NextResponse.json({ isPlaying: false, error: `Spotify API error: ${response.status}` }, { status: 200 });
    }

    const song = await response.json();
    console.log("Spotify response received");

    if (!song.item) {
      console.log("No track data in response");
      return NextResponse.json({ isPlaying: false, message: "No track data available" }, { status: 200 });
    }

    const albumImageUrl = song.item.album.images[0]?.url;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ");
    const isPlaying = song.is_playing;
    const songUrl = song.item.external_urls.spotify;
    const title = song.item.name;

    // Add a timestamp to help verify when the data was fetched
    const timestamp = new Date().toISOString();
    console.log(`Track info: "${title}" by ${artist}, playing: ${isPlaying}`);

    return NextResponse.json(
      {
        album: song.item.album.name,
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
        timestamp,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    let errorMessage = "Error fetching Spotify data";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ isPlaying: false, error: errorMessage }, { status: 200 });
  }
}
