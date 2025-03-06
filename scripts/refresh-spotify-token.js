/**
 * This script helps obtain a new Spotify refresh token
 *
 * Instructions:
 * 1. Run this script: node scripts/refresh-spotify-token.js
 * 2. Open the URL that appears in the console
 * 3. Authorize the app
 * 4. Copy the code from the redirect URL
 * 5. Paste the code when prompted
 * 6. Copy the refresh token and add it to your .env.local file
 */

const http = require("http");
const url = require("url");
const open = require("open");
const axios = require("axios");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

// Get Spotify app credentials from .env.local
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/callback";
const SCOPES = "user-read-currently-playing user-read-playback-state";

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n=== Spotify Refresh Token Generator ===\n");
console.log("This script will help you generate a new Spotify refresh token.");
console.log("Your current credentials:");
console.log(`Client ID: ${CLIENT_ID ? CLIENT_ID.substring(0, 5) + "..." : "Not found"}`);
console.log(`Client Secret: ${CLIENT_SECRET ? CLIENT_SECRET.substring(0, 5) + "..." : "Not found"}`);
console.log("\nMake sure these are correct before proceeding.\n");

// Step 1: Get authorization URL
const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${encodeURIComponent(SCOPES)}`;

console.log(`1. Open the following URL in your browser:\n\n${authUrl}\n`);
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

    console.log("\nAuthorization code received. Exchanging for tokens...");

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
    console.log("Your new refresh token:");
    console.log(`${refresh_token}\n`);
    console.log("Add this to your .env.local file:");
    console.log(`SPOTIFY_REFRESH_TOKEN="${refresh_token}"\n`);

    // Ask if user wants to automatically update the .env.local file
    rl.question("Do you want to automatically update your .env.local file? (y/n): ", async (answer) => {
      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        try {
          const envPath = path.join(process.cwd(), ".env.local");
          let envContent = fs.readFileSync(envPath, "utf8");

          // Replace the refresh token line
          if (envContent.includes("SPOTIFY_REFRESH_TOKEN=")) {
            envContent = envContent.replace(
              /SPOTIFY_REFRESH_TOKEN=["'].*["']/,
              `SPOTIFY_REFRESH_TOKEN="${refresh_token}"`
            );
          } else {
            // Add it if it doesn't exist
            envContent += `\nSPOTIFY_REFRESH_TOKEN="${refresh_token}"`;
          }

          fs.writeFileSync(envPath, envContent);
          console.log("✅ .env.local file updated successfully!");
        } catch (error) {
          console.error("Error updating .env.local file:", error.message);
          console.log("Please update the file manually with the refresh token shown above.");
        }
      } else {
        console.log("Please update your .env.local file manually with the refresh token shown above.");
      }

      // Test the token
      try {
        console.log("\nTesting the new token...");
        const nowPlayingResponse = await axios({
          method: "get",
          url: "https://api.spotify.com/v1/me/player/currently-playing",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (nowPlayingResponse.status === 200 && nowPlayingResponse.data) {
          const data = nowPlayingResponse.data;
          if (data && data.item) {
            console.log("✅ Token works! Currently playing:", data.item.name, "by", data.item.artists[0].name);
          } else {
            console.log("✅ Token works! No track currently playing.");
          }
        } else if (nowPlayingResponse.status === 204) {
          console.log("✅ Token works! No track currently playing.");
        }
      } catch (error) {
        console.log("⚠️ Could not fetch currently playing track. This might be normal if you're not playing anything.");
      }

      console.log("\nRestart your Next.js server to apply the changes.");
      rl.close();
    });
  } catch (error) {
    console.error("Error exchanging code for tokens:", error.response?.data || error.message);
    rl.close();
  }
});
