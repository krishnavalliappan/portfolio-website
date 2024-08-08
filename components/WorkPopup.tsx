// components/WorkPopup.tsx
import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkExperience } from '@/data/workExperience';

interface WorkPopupProps {
  active: WorkExperience | null;
  setActive: (experience: WorkExperience | null) => void;
}

const WorkPopup = forwardRef<HTMLDivElement, WorkPopupProps>(({ active, setActive }, ref) => {
  if (!active) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          ref={ref}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
          className="bg-card text-card-foreground p-8 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        >
          <motion.h3 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold mb-2"
          >
            {active.position}
          </motion.h3>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary mb-1"
          >
            {active.company}
          </motion.p>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-500 mb-4"
          >
            {active.duration}
          </motion.p>
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {active.skills.map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded"
              >
                {React.createElement(skill.icon, { className: "mr-1" })}
                <span className="text-xs">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.ul 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="list-disc pl-5 space-y-2"
          >
            {active.description.map((item, i) => (
              <motion.li 
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 bg-primary text-primary-foreground px-4 py-2 rounded"
            onClick={() => setActive(null)}
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

WorkPopup.displayName = 'WorkPopup';

export default WorkPopup;
