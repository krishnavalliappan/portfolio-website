import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RiTerminalBoxFill } from 'react-icons/ri';
import { useScrollSection } from '@/hooks/use-scroll-section';

interface CodeLines {
  [key: string]: string[];
}

const Terminal = () => {
  const [activeTab, setActiveTab] = useState<'python' | 'javascript'>('python');
  const [typedLines, setTypedLines] = useState<{ [key: string]: string[] }>({ python: ['', '', ''], javascript: ['', '', ''] });
  const [currentLine, setCurrentLine] = useState<{ [key: string]: number }>({ python: 0, javascript: 0 });
  const [currentChar, setCurrentChar] = useState<{ [key: string]: number }>({ python: 0, javascript: 0 });
  const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({ python: false, javascript: false });
  const { ref, isVisible } = useScrollSection();

  const codeLines: CodeLines = useMemo(() => ({
    python: [
      'print("Hello, World! 👋 I\'m Krishnakumar")',
      'print("Based in Canada 🍁 🇨🇦")',
      'print("From Data to Code: Software Developer with 2+ years in Python, JavaScript, and Data Analytics, specializing in Web Development and Automation")'
    ],
    javascript: [
      'console.log("Hello, World! 👋 I\'m Krishnakumar");',
      'console.log("Based in Canada 🍁 🇨🇦");',
      'console.log("From Data to Code: Software Developer with 2+ years in Python, JavaScript, and Data Analytics, specializing in Web Development and Automation");'
    ]
  }), []);

  const typeLine = useCallback(async (language: 'python' | 'javascript') => {
    const line = codeLines[language][currentLine[language]];
    if (currentChar[language] <= line.length) {
      setTypedLines(prev => ({
        ...prev,
        [language]: prev[language].map((l, idx) => 
          idx === currentLine[language] ? line.slice(0, currentChar[language]) : l
        )
      }));
      setCurrentChar(prev => ({ ...prev, [language]: prev[language] + 1 }));
    } else {
      if (currentLine[language] < codeLines[language].length - 1) {
        setCurrentLine(prev => ({ ...prev, [language]: prev[language] + 1 }));
        setCurrentChar(prev => ({ ...prev, [language]: 0 }));
      } else {
        setIsTyping(prev => ({ ...prev, [language]: false }));
      }
    }
  }, [codeLines, currentLine, currentChar]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsTyping({ python: true, javascript: true });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isTyping[activeTab]) {
      const timer = setTimeout(() => typeLine(activeTab), 50);
      return () => clearTimeout(timer);
    }
  }, [activeTab, isTyping, typeLine]);

  const handleTabChange = (tab: 'python' | 'javascript') => {
    setActiveTab(tab);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-card text-card-foreground rounded-lg p-6 mb-8 shadow-lg relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          opacity: [0.3, 0.5]
        }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.div 
          className="flex mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          {['python', 'javascript'].map((lang, index) => (
            <motion.button
              key={lang}
              className={`mr-2 px-3 py-1 rounded-t-lg ${activeTab === lang ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
              onClick={() => handleTabChange(lang as 'python' | 'javascript')}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </motion.button>
          ))}
        </motion.div>
        <motion.div 
          className="flex items-center mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <RiTerminalBoxFill className="text-primary mr-2" />
          <span className="text-primary">krishna@portfolio:~$</span>
          <span className="text-secondary ml-2">&gt;&gt;</span>
          <span className='text-muted-foreground'>{activeTab}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          {['python', 'javascript'].map(lang => (
            <div key={lang} style={{ display: activeTab === lang ? 'block' : 'none' }}>
              {typedLines[lang as 'python' | 'javascript'].map((line, index) => (
                <motion.div
                  key={index}
                  className={index <= currentLine[lang] ? 'text-primary' : 'text-muted-foreground'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.2, duration: 0.4 }}
                >
                  <span className="text-secondary mr-2">&gt;&gt;</span>
                  <span className="text-muted-foreground">
                    {line.slice(0, lang === 'python' ? 6 : 12)}
                  </span>
                  <span className="text-primary">
                    {line.slice(lang === 'python' ? 6 : 12)}
                  </span>
                  {index === currentLine[lang] && isTyping[lang] && <span className="animate-blink">|</span>}
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Terminal;
