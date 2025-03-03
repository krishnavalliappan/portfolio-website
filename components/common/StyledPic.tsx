import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useScrollSection } from "@/hooks/use-scroll-section";

interface StyledPicProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

const StyledPic: React.FC<StyledPicProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollSection();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6]
  );

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10 mix-blend-overlay"
        style={{ opacity }}
      />
      <motion.div
        className="relative w-full h-full"
        style={{ y, scale }}
        ref={ref}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          priority={priority}
        />
      </motion.div>
    </motion.div>
  );
};

export default StyledPic;
