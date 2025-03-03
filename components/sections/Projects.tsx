// components/sections/Projects.tsx
import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/common/ProjectCard";
import { projects } from "@/data/projects";
import { useScrollSection } from "@/hooks/use-scroll-section";
import { FaCode } from "react-icons/fa";

const Projects: React.FC = () => {
  const { ref, isVisible } = useScrollSection();

  return (
    <section id="projects" className="py-20 scroll-mt-20" ref={ref}>
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-primary flex items-center justify-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}>
        <FaCode className="mr-2" /> Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            githubUrl={project.githubLink}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
