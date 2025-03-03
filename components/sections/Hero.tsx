// components/sections/Hero.tsx
import React from "react";
import { motion } from "framer-motion";
import HeroTitle from "@/components/common/HeroTitle";
import Terminal from "@/components/ui/Terminal";
import SkillsGrid from "@/components/common/SkillsGrid";
import ActionButtons from "@/components/common/ActionButtons";

const Hero = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center px-4 pt-10 sm:pt-0"
      id="home">
      <div className="max-w-4xl w-full mx-auto">
        <HeroTitle />
        <Terminal />
        <SkillsGrid />
        <ActionButtons />
      </div>
    </div>
  );
};

export default Hero;
