import React from "react";
import { motion } from "framer-motion";

const HeroTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
        Krishnakumar Valliappan
      </h1>
      <h2 className="text-xl md:text-2xl text-secondary mb-2">
        Software Developer & Data Analyst
      </h2>
    </motion.div>
  );
};

export default HeroTitle;
