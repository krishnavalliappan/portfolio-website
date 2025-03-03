import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import { useScrollSection } from "@/hooks/use-scroll-section";

const ActionButtons = () => {
  const { ref, isVisible } = useScrollSection();

  const buttons = [
    {
      text: "GitHub",
      icon: <FaGithub className="mr-2" />,
      link: "https://github.com/krishnavalliappan",
      color: "bg-primary hover:bg-primary/80 text-primary-foreground",
    },
    {
      text: "LinkedIn",
      icon: <FaLinkedin className="mr-2" />,
      link: "https://www.linkedin.com/in/krishnakumar-valliappan/",
      color: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    {
      text: "Resume",
      icon: <FaFileAlt className="mr-2" />,
      link: "/resume.pdf",
      color: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-wrap gap-4 mb-12">
      {buttons.map((button, index) => (
        <motion.a
          key={button.text}
          href={button.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
          className={`flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors ${button.color}`}>
          {button.icon}
          {button.text}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default ActionButtons;
