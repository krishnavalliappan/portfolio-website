import { IconProps } from "@/components/common/Icons";

export interface NavLink {
  href: string;
  icon: (props: IconProps) => JSX.Element;
  label: string;
}

export interface SocialLink {
    [key: string]: NavLink
}



export interface ProjectType {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link: {
    github?: string;
    demo?: string;
  };
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  description: string;
}
