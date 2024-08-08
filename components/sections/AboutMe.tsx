"use client";
import React from 'react'
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StyledPic from '../Styledpic';
import { FaLightbulb, FaCode, FaPizzaSlice, FaHiking, FaPuzzlePiece, FaChalkboardTeacher } from 'react-icons/fa';
import { useScrollSection } from '@/hooks/use-scroll-section';
import { CardSpotlight } from '../ui/card-spotlight';

const AboutMe: React.FC = () => {
  const { ref, isVisible } = useScrollSection();

  return (
    <div id="about" className="relative w-full flex flex-col sm:flex-row py-20 scroll-mt-20" ref={ref}>
      <motion.div 
      className="w-full sm:w-[70%] pr-0 sm:pr-8 mb-8 sm:mb-0"
        initial={{ opacity: 0, x: -50 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
          <Card className="w-full bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <FaLightbulb className="mr-2" /> About Me
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm sm:text-base text-foreground space-y-4">
            <p>
              👋 Hello there! I&apos;m Krishnakumar, a Data Analyst with a knack for decoding complicated data and spinning it into a meaningful narrative. My fascination for math was nurtured from childhood, all thanks to my math-genius mother.
            </p>
            <p>
              <FaCode className="inline-block mr-2" /> 
              Post my two-year stint as a data analyst, I decided to plunge into the world of academia to pursue my master&apos;s. Here, I found myself teaching Transform Calculus, which was quite an eye-opener. I realized that programming and math weren&apos;t just two separate entities, they were two sides of the same coin. This understanding ignited my interest in data analysis and machine learning.
            </p>
            <p>
              When I&apos;m not crunching numbers or coding, you might find me:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><FaPizzaSlice className="inline-block mr-2" /> On a never-ending quest for the perfect pizza recipe</li>
              <li><FaHiking className="inline-block mr-2" /> Exploring new hiking trails (and probably getting lost)</li>
              <li><FaPuzzlePiece className="inline-block mr-2" /> Solving puzzles that make my brain do backflips</li>
            </ul>
            <p>
              At present, I&apos;m eagerly diving into the deep end of machine learning and dabbling in web development as a bit of a side hobby. The intersection of data science and technology holds endless possibilities, and I can&apos;t wait to explore them all. I&apos;m a firm believer in lifelong learning and self-improvement, so I seize every opportunity to learn, regardless of the circumstances. And honestly, making life a tad simpler with these skills - now, isn&apos;t that a fun thought?
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div 
        className="w-full sm:w-[30%] flex justify-center items-center"
        initial={{ opacity: 0, x: 50 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className='w-full max-w-[250px] aspect-square'>
          <StyledPic />
        </div>
      </motion.div>
    </div>
  )
}

export default AboutMe
