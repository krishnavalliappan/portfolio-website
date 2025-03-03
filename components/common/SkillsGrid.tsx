import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaPython, FaNodeJs, FaDatabase, FaAws } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiJavascript,
  SiMongodb,
} from "react-icons/si";
import { useScrollSection } from "@/hooks/use-scroll-section";

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const SkillsGrid = () => {
  const { ref, isVisible } = useScrollSection();

  const skills: Skill[] = [
    { name: "React", icon: <FaReact />, color: "text-blue-400" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "text-white" },
    { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500" },
    { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-400" },
    { name: "Python", icon: <FaPython />, color: "text-blue-300" },
    { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-400" },
    { name: "MongoDB", icon: <SiMongodb />, color: "text-green-400" },
    { name: "SQL", icon: <FaDatabase />, color: "text-orange-400" },
    { name: "AWS", icon: <FaAws />, color: "text-yellow-500" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-primary">
        Skills & Technologies
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-card hover:bg-card/80 transition-colors">
            <div className={`text-2xl mb-2 ${skill.color}`}>{skill.icon}</div>
            <span className="text-sm text-card-foreground">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsGrid;
