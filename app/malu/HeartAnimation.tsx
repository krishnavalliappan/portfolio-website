// app/happy-birthday/HeartAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Heart = ({ x, y, size }: { x: number; y: number; size: number }) => (
  <motion.div
    className="absolute text-red-500"
    style={{ fontSize: `${size}px` }}
    initial={{ scale: 0, x, y: window.innerHeight }}
    animate={{
      scale: [0, 1, 1, 0],
      y: y,
      opacity: [0, 1, 1, 0],
    }}
    transition={{ duration: 4, ease: "easeOut" }}
  >
    ❤️
  </motion.div>
);

export default function HeartAnimation() {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => [
        ...prevHearts,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * (window.innerHeight * 0.7), // Hearts will float up to 70% of screen height
          size: Math.random() * 20 + 20, // Random size between 20px and 40px
        },
      ]);
    }, 300);

    const cleanup = setTimeout(() => {
      clearInterval(interval);
    }, 10000); // Stop generating hearts after 10 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(cleanup);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <Heart key={heart.id} x={heart.x} y={heart.y} size={heart.size} />
      ))}
    </div>
  );
}
