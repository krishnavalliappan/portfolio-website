// data/workExperience.ts
import { FaBriefcase, FaPython, FaDatabase, FaChartBar, FaAws, FaReact, FaChalkboardTeacher, } from 'react-icons/fa';
import { SiPowerbi } from 'react-icons/si';
import { PiMathOperationsFill } from "react-icons/pi";
import React from 'react';

export interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  year: number;
  description: string[];
  skills: Skill[];
  logo: string;
}

export const workExperiences: WorkExperience[] = [
{
    company: "Concordia University",
    position: "TA - Transform Calculus and PDE",
    duration: "Sep 2023 - Dec 2023",
    year: 2023,
    description: [
      "Crafted Python simulations to visualize (Fourier Series, Laplace Transforms, PDEs) solutions, enhancing student understanding of the link between theory and real-world applications.",
      "Facilitated collaborative learning by leading group discussions and encouraging peer support, building a positive and productive learning environment.",
      "Received excellent student feedback, contributing to a 20% increase in satisfaction ratings compared to previous terms."
    ],
    skills: [
      { name: "Python", icon: FaPython },
      { name: "Teaching", icon: FaChalkboardTeacher },
      { name: "Mathematics", icon: PiMathOperationsFill },
    ],
    logo: "/logos/concordia-university.png" // Add the path to the Concordia University logo
  },
  {
    company: "IA Flow Elements",
    position: "Associate Data Analyst",
    duration: "April 2020 – July 2022",
    year: 2020,
    description: [
      "Engineered a predictive model using machine learning algorithms to forecast sales trends, enhancing decision-making accuracy and contributing to a 15% uplift in sales projections accuracy.",
      "Boosted data processing efficiency by 40% via custom Python scripts for ETL automation, ensuring precise data handling from extraction to in-depth analysis, integrating with AWS cloud.",
      "Led the team to optimize data processing workflows by 30% by migrating to AWS, enhancing both data handling efficiency and system scalability while also ensuring data accuracy.",
      "Developed a Python-based application with a Tkinter GUI for the marketing team to add and track quotes, integrating with Power BI to visually monitor progress and improve quote management efficiency.",
      "Established efficiency metrics and automated Excel dashboards using VBA scripting, which boosted the productivity and efficiency of designers and CAD technicians by over 25%.",
      "Enhanced business process efficiency and decision support by collaborating with teams to optimize data workflows and designing tailored Power BI dashboards and KPI reports, resulting in improved strategic planning across the organization."
    ],
    skills: [
      { name: "Python", icon: FaPython },
      { name: "SQL", icon: FaDatabase },
      { name: "Power BI", icon: SiPowerbi },
      { name: "AWS", icon: FaAws },
      { name: "Data Visualization", icon: FaChartBar },
    ],
    logo: "/logos/ia-flow.png"
  },
  {
    company: "IA Flow Elements",
    position: "CAD Designer",
    duration: "June 2019 – March 2020",
    year: 2019,
    description: [
      "Designed flow elements according to provided specifications using RW Miller software, improving product performance in the oil & gas sector.",
      "Managed technical quotations, effectively converting quotes to orders, demonstrating strong business communication skills.",
      "Handled client-centric reporting and documentation, ensuring tailored solutions and high customer satisfaction."
    ],
    skills: [
      { name: "CAD", icon: FaReact },
      { name: "Technical Documentation", icon: FaChartBar },
      { name: "Client Communication", icon: FaBriefcase },
    ],
    logo: "/logos/ia-flow.png"
  }
];
