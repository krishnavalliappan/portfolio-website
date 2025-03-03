import { IconProps } from "@/components/common/Icons";
import { Icons } from "@/components/common/Icons";

import { NavLink, ProjectType, Experience, Education, SocialLink } from "@/data/types";

// Main data object with all website content
export const siteData = {
  metadata: {
    title: "Krishnakumar Valliappan | Portfolio",
    description: "Personal portfolio showcasing my projects and skills",
    author: "Krishnakumar Valliappan",
  },

  hero: {
    role: "Software Engineer",
    tagline: "I build things for the web",
    description: "I'm a software developer specializing in building exceptional digital experiences.",
    primaryButton: {
      text: "View My Work",
      href: "#projects",
    },
    secondaryButton: {
      text: "Contact Me",
      href: "#contact",
    },
  },

  about: {
    title: "About Me",
    paragraphs: [
      "I'm a software engineer passionate about creating elegant solutions to complex problems.",
      "My background in computer science has given me a deep understanding of software principles and best practices.",
    ],
    skills: ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS", "GraphQL"],
    image: "/images/profile.jpg",
  },

  experience: [
    {
      company: "Example Corp",
      position: "Senior Frontend Developer",
      duration: "Jan 2022 - Present",
      description: [
        "Led development of key customer-facing features using React and TypeScript",
        "Improved application performance by 40% through code optimization",
      ],
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    },
    // Add more experiences
  ] as Experience[],

  projects: [
    {
      title: "Portfolio Website",
      description: "A personal portfolio website built with Next.js and Tailwind CSS",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      image: "/images/projects/portfolio.png",
      link: {
        github: "https://github.com/yourusername/portfolio",
        demo: "https://yourportfolio.com",
      },
    },
    // Add more projects
  ] as ProjectType[],

  education: [
    {
      institution: "University Name",
      degree: "Bachelor of Science in Computer Science",
      duration: "2016 - 2020",
      description: "Graduated with honors",
    },
  ] as Education[],

  dock: {
    navbar: [
      { href: "/", icon: Icons.home, label: "Home" },
      { href: "/blog", icon: Icons.notebookPen, label: "Blog" },
      { href: "/projects", icon: Icons.folderCode, label: "Projects" },
      { href: "/contact", icon: Icons.bot, label: "Contact" },
    ] as NavLink[],
    contact: {
      Email: {
        href: "/contact",
        icon: Icons.email,
        label: "Contact",
      },
      LinkedIn: {
        href: "https://www.linkedin.com/in/krishnakumar-valliappan/",
        icon: Icons.linkedin,
        label: "LinkedIn",
      },
      GitHub: {
        href: "https://github.com/krishnakumarvalliappan",
        icon: Icons.github,
        label: "GitHub",
      },
      X: {
        href: "https://x.com/krishnakumarvalli",
        icon: Icons.x,
        label: "X",
      },
    } as SocialLink,
  },
};

// Export default for convenience
export default siteData;
