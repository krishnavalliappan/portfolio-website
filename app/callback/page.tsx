"use client";

import { useEffect } from "react";

export default function CallbackPage() {
  useEffect(() => {
    // Display the full URL for easy copying
    const fullUrl = window.location.href;
    document.getElementById("url-display")!.textContent = fullUrl;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Spotify Authorization Successful</h1>
      <p className="mb-6">Please copy the URL below and paste it back in the terminal:</p>

      <div className="w-full max-w-2xl p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6 overflow-x-auto">
        <code id="url-display" className="text-sm break-all"></code>
      </div>

      <p className="text-sm text-gray-500">You can close this window after copying the URL.</p>
    </div>
  );
}
