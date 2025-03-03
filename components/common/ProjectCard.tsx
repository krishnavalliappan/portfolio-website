import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  index: number;
  isVisible: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  index,
  isVisible,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl text-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-card-foreground mb-4">
            {description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-auto">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-md bg-secondary/20 text-secondary-foreground">
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary/20 transition-colors"
              aria-label={`GitHub repository for ${title}`}>
              <FaGithub className="text-lg" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary/20 transition-colors"
              aria-label={`Live demo for ${title}`}>
              <FaExternalLinkAlt className="text-lg" />
            </a>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
