// app/happy-birthday/AskHerOut.tsx
'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AskHerOut() {
  const [showPlan, setShowPlan] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);

  const handleYesClick = () => {
    setShowPlan(true);
  };

  const moveNoButton = () => {
    const x = Math.floor(Math.random() * 200) - 100; // -100px to 100px
    const y = Math.floor(Math.random() * 100) - 50;  // -50px to 50px
    setNoButtonPosition({ x, y });
    setNoAttempts(noAttempts + 1);
  };

  if (showPlan) {
    return <DatePlan />;
  }

  return (
    <div className="relative w-full max-w-md mt-6 p-4 bg-pink-100 rounded-lg shadow-lg">
      <p className="text-xl text-center mb-8 text-red-600 font-semibold">Will you go out with me Meera?</p>
      <div className="flex justify-center items-center space-x-4 h-24">
        <button
          onClick={handleYesClick}
          className="px-6 py-3 bg-red-500 text-white rounded-full text-lg hover:bg-red-600 transition-colors duration-300"
        >
          Yes
        </button>
        <motion.div
          className="relative"
          animate={noButtonPosition}
        >
          <button
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full text-lg hover:bg-gray-400 transition-colors duration-300"
          >
            No
          </button>
        </motion.div>
      </div>
      {noAttempts > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-4 text-red-500 italic"
        >
          {noAttempts < 3 ? "Are you sure Sudnari? Try again!" : "Okay, I get it Malu. I'll make it up to you But please say yes! 🥺"}
        </motion.p>
      )}
    </div>
  );
}





import { FaCar, FaUtensils, FaStar, FaHome, FaHeart } from 'react-icons/fa';

function DatePlan() {
  const dateSteps = [
    { time: "9:30 PM", activity: "Start our adventure!", icon: FaCar },
    { time: "9:45 PM", activity: "Dinner at a fancy restaurant, guess", icon: FaUtensils },
    { time: "10:30 PM", activity: "Car drive to nice place, Stargazing under the night sky", icon: FaStar },
    { time: "2:00 AM", activity: "Return home", icon: FaHome },
    { time: "2:30 AM", activity: "Cuddle and sleep", icon: FaHeart },
  ];

  return (
    <div className="mt-8 text-center p-4 bg-pink-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-red-600">Our Night plan - Lets call Magical</h2>
      <div className="relative">
        {dateSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center mb-8 relative"
          >
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl">
              <step.icon />
            </div>
            <div className="ml-4 text-left">
              <p className="font-semibold text-red-500">{step.time}</p>
              <p className="text-gray-700">{step.activity}</p>
            </div>
            {index < dateSteps.length - 1 && (
              <div className="absolute left-8 top-16 w-0.5 h-8 bg-red-300" />
            )}
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-6 text-red-600 font-semibold"
      >
       Can&apos;t wait to spend this special time with you, wrapped in warmth and love! ❤️
      </motion.p>
    </div>
  );
}

