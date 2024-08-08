// components/ui/ExpandableCard.tsx
"use client";
import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpandableCardContext = createContext<{ isOpen: boolean; toggleOpen: () => void } | undefined>(undefined);

export const ExpandableCard = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <ExpandableCardContext.Provider value={{ isOpen, toggleOpen }}>
      <div className="border rounded-lg overflow-hidden">
        {children}
      </div>
    </ExpandableCardContext.Provider>
  );
};

const Trigger = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(ExpandableCardContext);
  if (!context) throw new Error('Trigger must be used within an ExpandableCard');

  return (
    <div className="p-4 cursor-pointer" onClick={context.toggleOpen}>
      {children}
    </div>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(ExpandableCardContext);
  if (!context) throw new Error('Content must be used within an ExpandableCard');

  return (
    <AnimatePresence>
      {context.isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-4 border-t">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ExpandableCard.Trigger = Trigger;
ExpandableCard.Content = Content;
