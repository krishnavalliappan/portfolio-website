"use client";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Image from "next/image";
import AboutMe from "@/components/sections/AboutMe";
import Work from "@/components/sections/Work";
import { AnimatePresence } from "framer-motion";
import Projects from "@/components/sections/Projects";
import { FaHome, FaUser, FaBriefcase, FaCode } from "react-icons/fa";
import StickyIcons from "@/components/sections/StickyIcons";
import Footer from "@/components/sections/Footer";

const navItems = [
  {
    name: "Home",
    link: "#home",
    icon: <FaHome />,
  },
  {
    name: "About",
    link: "#about",
    icon: <FaUser />,
  },
  {
    name: "Projects",
    link: "#projects",
    icon: <FaCode />,
  },
  {
    name: "Work",
    link: "#work",
    icon: <FaBriefcase />,
  },
];

const Home = () => {
  return (
    <div>
      <FloatingNav navItems={navItems} />
      <StickyIcons />
      <AnimatePresence>
        <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto pt-16 sm:px-10 px-5">
          <div className="max-w-7xl w-full">
            <Hero />
            <AboutMe />
            <Projects />
            <Work />
          </div>
        </main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Home;
