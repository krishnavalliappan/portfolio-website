import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const StyledPic: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInteraction = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500); // Reset after 0.5 second
  };

  return (
    <div 
      className="relative max-w-[300px] md:max-w-full md:w-full aspect-square cursor-pointer"
      onClick={handleInteraction}
      onMouseEnter={handleInteraction}
    >
      <motion.div 
        className="wrapper relative w-full h-full rounded-lg bg-primary shadow-md overflow-hidden"
        animate={isAnimating ? {
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={isAnimating ? { 
            y: [0, -10, 0],
            opacity: [1, 0.8, 1],
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/pics/photo.png"
            alt="Profile"
            fill
            className="rounded-lg object-cover"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-primary opacity-0"
          animate={isAnimating ? { opacity: 0.2 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <motion.div
        className="absolute -bottom-2 -right-4 w-full h-full border-2 border-primary rounded-lg"
        animate={isAnimating ? { 
          scale: [1, 1.1, 1],
          rotate: [0, -3, 0],
        } : {}}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default StyledPic;
