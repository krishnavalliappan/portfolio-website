// data/projects.ts
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaLinkedin, FaSyncAlt } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiTensorflow, SiPostgresql } from 'react-icons/si';

export interface Skill {
  name: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  technologies: string[];
  githubLink: string;
  skills: Skill[];
}

export const projects: Project[] = [
  {
    id: 1,
  title: "Next.js Portfolio Website",
  description: "A single-page application portfolio website built using Next.js, TailwindCSS, and shadcn/ui components.",
  icon: FaReact,
  technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "shadcn/ui"],
  githubLink: "https://github.com/krishnavalliappan/portfolio",
  skills: [
    {name: "Frontend Development"},
    { name: "UI/UX Design"},
    { name: "Responsive Web Design"},
    { name: "Performance Optimization"}
  ]
  },
  {
    id: 2,
  title: "LinkedIn Job Search Automation",
  description: "A comprehensive project that automates LinkedIn job searches, scrapes job details, analyzes job descriptions using GPT, and generates tailored resumes and cover letters.",
  icon: FaLinkedin,
  technologies: ["Python", "Selenium", "BeautifulSoup", "pandas", "GPT", "DocX"],
  githubLink: "https://github.com/krishnavalliappan/resume",
  skills: [
    { name: "Web Scraping"},
    { name: "Data Analysis"},
    { name: "Automation"},
    { name: "Machine Learning"},
    { name: "Document Generation"}
  ]
  },
  {
    id: 2,
  title: "TickTick-Notion Two-Way Sync",
  description: "A Python-based application that enables two-way synchronization between TickTick tasks and Notion databases, allowing seamless task management across both platforms.",
  icon: FaSyncAlt,
  technologies: ["Python", "TickTick API", "Notion API", "aiohttp", "asyncio"],
  githubLink: "https://github.com/krishnavalliappan/TicktickNotionTwoWaySync",
  skills: [
    { name: "API Integration"},
    { name: "Asynchronous Programming"},
    { name: "Data Synchronization"},
    { name: "Python Development"},
    { name: "Task Automation"}
  ]
  },
];
