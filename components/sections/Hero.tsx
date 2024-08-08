// components/sections/Hero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import HeroTitle from '@/components/HeroTitle';
import Terminal from '@/components/Terminal';
import SkillsGrid from '@/components/SkillsGrid';
import ActionButtons from '@/components/ActionButtons';

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center px-4 pt-10 sm:pt-0">
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
