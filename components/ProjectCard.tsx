// components/ProjectCard.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import Link from 'next/link';

interface ProjectCardProps extends Project {
  isHovered: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, icon: Icon, technologies, skills, isHovered, githubLink }) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isClicked) {
        setIsClicked(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isClicked]);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClicked(true);
  };

  return (
    <Link href={githubLink} target="_blank" rel="noopener noreferrer">
      <motion.div
        className="relative p-6 rounded-xl bg-card text-card-foreground transition-all duration-300 cursor-pointer h-[400px] flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsClicked(false)}
        onClick={handleCardClick}
      >
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-primary"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered || isClicked ? 1 : 0,
            scale: isHovered || isClicked ? [1, 1.02, 1] : 1
          }}
          transition={{ 
            duration: isHovered ? 0.2 : 0.3,
            ease: "easeInOut"
          }}
        />
        <Icon className="text-4xl mb-4 flex-shrink-0" />
        <h3 className="text-xl font-bold text-primary mb-2 flex-shrink-0">{title}</h3>
        <div className="overflow-y-auto flex-grow mb-4">
          <p>{description}</p>
        </div>
        <div className="flex flex-wrap gap-2 flex-shrink-0">
          {technologies.map((tech, index) => (
            <span key={index} className="text-sm px-2 py-1 bg-background rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
