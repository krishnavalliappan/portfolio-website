'use client'
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Image from "next/image";
import AboutMe from "@/components/sections/AboutMe";
import Work from "@/components/sections/Work";
import { AnimatePresence } from 'framer-motion';
import Projects from "@/components/sections/Projects";

const Home = () => {
  return (
    <AnimatePresence>
      <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto pt-16 sm:px-10 px-5">
      <div className="max-w-7xl w-full">
          <Hero />
          <AboutMe />
          <Projects/>
          <Work />
      </div>
    </main>
    </AnimatePresence>
  );
}

export default Home;