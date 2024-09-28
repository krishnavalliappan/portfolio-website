// app/happy-birthday/BirthdayPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import PhotoSlideshow from './PhotoSlideshow';
import AskHerOut from './AskHerOut';
import HeartAnimation from './HeartAnimation';

export default function BirthdayPage({ mediaFiles }: { mediaFiles: string[] }) {
  const [LOADED, setLoaded] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true);
  const [showWish, setShowWish] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
      setShowWish(true);
    }, 3000);

    const wishTimer = setTimeout(() => {
      setShowRest(true);
    }, 5000);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(wishTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && LOADED && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
        />
      )}

      <AnimatePresence>
        {showWish && (
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-pink-800 mb-8 text-center mt-3"
            style={{
              fontFamily: "'Pacifico', cursive",
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Happy Birthday Sundariii...... ❤️
          </motion.h1>
        )}
      </AnimatePresence>

      {showRest && (
        <>
          <HeartAnimation />

          <motion.p
            className="text-lg text-pink-600 mb-6 text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            I love U koraiyaaa..... Malu which is equal to the distance to the Sun.. nooo its infinity ❤️😄.
            <br/> Wishing you a day as wonderful as you are.
          </motion.p>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PhotoSlideshow mediaFiles={mediaFiles} />
          </motion.div>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AskHerOut />
          </motion.div>
        </>
      )}
    </div>
  );
}
