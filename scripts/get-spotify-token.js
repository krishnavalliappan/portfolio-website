/**
 * This script helps obtain a Spotify refresh token
 *
 * Instructions:
 * 1. Run this script: node scripts/get-spotify-token.js
 * 2. Open the URL that appears in the console
 * 3. Authorize the app
 * 4. Copy the code from the redirect URL
 * 5. Paste the code when prompted
 * 6. Copy the refresh token and add it to your .env file
 */

const http = require("http");
const url = require("url");
const open = require("open");
const axios = require("axios");
const readline = require("readline");

// Replace with your Spotify app credentials from .env
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "4e3b85c392ca4f85940d132826efb0c6";
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "960c0c35cf3b44b7b37fd649b8bfbf56";
const REDIRECT_URI = "http://localhost:3000/callback";
const SCOPES = "user-read-currently-playing user-read-playback-state";

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Step 1: Get authorization URL
const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${encodeURIComponent(SCOPES)}`;

console.log(`\n1. Open the following URL in your browser:\n\n${authUrl}\n`);
console.log("2. Log in with your Spotify account and authorize the app");
console.log("3. You will be redirected to a URL that looks like: http://localhost:3000/callback?code=XXXX");
console.log("4. Copy the entire URL you were redirected to\n");

// Step 2: Get the authorization code from user
rl.question("Paste the full redirect URL here: ", async (redirectUrl) => {
  try {
    // Extract the code from the URL
    const parsedUrl = url.parse(redirectUrl, true);
    const authorizationCode = parsedUrl.query.code;

    if (!authorizationCode) {
      console.error("No authorization code found in the URL");
      rl.close();
      return;
    }

    // Step 3: Exchange authorization code for tokens
    const tokenResponse = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      params: {
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token, refresh_token } = tokenResponse.data;

    console.log("\n=== SUCCESS ===\n");
    console.log("Add this to your .env file:");
    console.log(`SPOTIFY_REFRESH_TOKEN="${refresh_token}"\n`);

    // Test the token
    try {
      const nowPlayingResponse = await axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (nowPlayingResponse.status === 200) {
        const data = nowPlayingResponse.data;
        if (data && data.item) {
          console.log("Currently playing:", data.item.name, "by", data.item.artists[0].name);
        } else {
          console.log("No track currently playing");
        }
      }
    } catch (error) {
      console.log("Could not fetch currently playing track");
    }
  } catch (error) {
    console.error("Error exchanging code for tokens:", error.response?.data || error.message);
  } finally {
    rl.close();
  }
});
