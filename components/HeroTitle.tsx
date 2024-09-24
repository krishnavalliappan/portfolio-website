import React from 'react';
import { motion } from 'framer-motion';

const HeroTitle = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-center mb-8"
  >
    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">Krishnakumar</h1>
    <h2 className="text-xl md:text-2xl text-foreground">Software Developer</h2>
  </motion.div>
);

export default HeroTitle;
