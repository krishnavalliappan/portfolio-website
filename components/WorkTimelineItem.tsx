// components/WorkTimelineItem.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { WorkExperience } from '@/data/workExperience';

interface WorkTimelineItemProps {
  experience: WorkExperience;
  index: number;
  setActive: (experience: WorkExperience) => void;
}

const WorkTimelineItem: React.FC<WorkTimelineItemProps> = ({ experience, index, setActive }) => {
  return (
    <motion.div 
      className={`mb-16 relative ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} cursor-pointer`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5}}
      whileHover={{ scale: 1.05 }}
      onClick={() => setActive(experience)}
    >
      <div className={`absolute top-0 left-4 md:left-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? 'md:translate-x-8' : 'md:-translate-x-8'} bg-primary text-primary-foreground rounded-full px-4 py-1`}>
        {experience.year}
      </div>
      
      <motion.div
        className={`bg-card text-card-foreground p-6 rounded-lg shadow-lg ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
        whileHover={{ boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="flex items-center mb-4">
          <div className="bg-primary text-primary-foreground rounded-full p-3 mr-4">
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{experience.position}</h3>
            <p className="text-primary">{experience.company}</p>
            <p className="text-sm text-gray-500">{experience.duration}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {experience.skills.slice(0, 5).map((skill, i) => (
            <div key={i} className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded">
              {React.createElement(skill.icon, { className: "mr-1" })}
              <span className="text-xs">{skill.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkTimelineItem;
