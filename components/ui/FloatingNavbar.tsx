"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon: JSX.Element;
  }[];
  className?: string;
}) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = navItems.map((item) => item.link.slice(1));

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop - 100) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b border-primary/10",
        "floating-navbar", // Add this class for the fallback styles
        className
      )}
    >
      <nav className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
        <Link href="#home">
          <motion.span
            className="text-3xl font-bold mb-2 sm:mb-0 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-primary">krishna</span>
            <span className="text-foreground">.py</span>
          </motion.span>
        </Link>
        <ul className="flex space-x-1">
          {navItems.map((item, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <li className="self-stretch flex items-center">
                  <div className="h-4 w-px bg-primary"></div>
                </li>
              )}
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Link
                  href={item.link}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm sm:text-base font-semibold transition-all duration-200 ease-in-out",
                    activeSection === item.link.slice(1)
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  <motion.span
                    className="mr-2 inline-block"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span>{item.name}</span>
                </Link>
              </motion.li>
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};
