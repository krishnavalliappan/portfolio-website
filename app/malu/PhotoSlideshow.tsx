// app/happy-birthday/PhotoSlideshow.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MediaFile = {
  type: "image" | "video";
  src: string;
};

function getExtension(filename: string): string {
  return filename.substring(filename.lastIndexOf(".")).toLowerCase();
}

export default function PhotoSlideshow({
  mediaFiles,
}: {
  mediaFiles: string[];
}) {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const media: MediaFile[] = mediaFiles
    .map((src) => {
      const ext = getExtension(src);
      const type = ext === ".mp4" ? "video" : "image";
      return { type, src };
    })
    .sort((a, b) => (a.type === "video" ? -1 : 1));

  const currentMedia = media[index];

  const goToNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const goToPrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md aspect-video mb-6 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <AnimatePresence>
          {currentMedia.type === "video" ? (
            <motion.video
              key={currentMedia.src}
              ref={videoRef}
              src={currentMedia.src}
              className="absolute inset-0 w-full h-full object-contain"
              controls
              muted
              autoPlay
              preload="auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onError={(e) => console.error("Video error:", e)}
            />
          ) : (
            <motion.img
              key={currentMedia.src}
              src={currentMedia.src}
              alt="Slideshow Media"
              className="absolute inset-0 w-full h-full object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={goToPrevious}
            className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-opacity"
          >
            &#8592;
          </button>
          <button
            onClick={goToNext}
            className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-opacity"
          >
            &#8594;
          </button>
        </div>

        {/* Media Counter */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
          {index + 1} / {media.length}
        </div>
      </div>

      {/* Spotify Embed */}
      <div className="w-full max-w-md mt-4">
        <iframe
          src="https://open.spotify.com/embed/track/3IpEJ86hrMfUcoXCk9U4h3?utm_source=generator"
          width="100%"
          height="80"
          allow="encrypted-media"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
}
