// components/sections/Work.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { workExperiences } from "@/data/workExperience";
import WorkTimelineItem from "@/components/common/WorkTimelineItem";
import { useScrollSection } from "@/hooks/use-scroll-section";
import { FaBriefcase } from "react-icons/fa";

const Work: React.FC = () => {
  const { ref, isVisible } = useScrollSection();

  return (
    <section
      id="work"
      className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20"
      ref={ref}>
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-primary flex items-center justify-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}>
        <FaBriefcase className="mr-2" /> Work Experience
      </motion.h2>
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30"></div>

        {workExperiences.map((experience, index) => (
          <WorkTimelineItem
            key={index}
            company={experience.company}
            position={experience.position}
            duration={experience.duration}
            location="Canada" // Adding a default location since it's not in the data
            description={experience.description}
            technologies={experience.skills.map((skill) => skill.name)}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
};

export default Work;
