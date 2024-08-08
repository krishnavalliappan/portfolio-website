// components/sections/Work.tsx
"use client";
import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { workExperiences, WorkExperience } from '@/data/workExperience';
import WorkTimelineItem from '@/components/WorkTimelineItem';
import WorkPopup from '@/components/WorkPopup';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { useScrollSection } from '@/hooks/use-scroll-section';
import { FaBriefcase } from 'react-icons/fa';

const Work: React.FC = () => {
  const [active, setActive] = useState<WorkExperience | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollSection();

  useOutsideClick(popupRef, () => {
    if (active) {
      setActive(null);
    }
  });

  return (
    <section id="work" className="py-20 px-4 sm:px-6 lg:px-8" ref={ref}>
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold text-primary flex items-center justify-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <FaBriefcase className="mr-2"/> Work Experience
      </motion.h2>
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary"></div>
        
        {workExperiences.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <WorkTimelineItem
              experience={experience}
              index={index}
              setActive={setActive}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        <WorkPopup active={active} setActive={setActive} ref={popupRef} />
      </AnimatePresence>
    </section>
  );
};

export default Work;
