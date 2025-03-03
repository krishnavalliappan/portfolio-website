import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface WorkPopupProps {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
  onClose: () => void;
}

const WorkPopup: React.FC<WorkPopupProps> = ({
  company,
  position,
  duration,
  location,
  description,
  technologies,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useOutsideClick(popupRef, onClose);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-card rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-primary">{position}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary/20 transition-colors"
              aria-label="Close popup">
              <FaTimes />
            </button>
          </div>

          <div className="flex items-center text-secondary mb-2">
            <FaBuilding className="mr-2" />
            <span>{company}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center text-muted-foreground text-sm mb-6">
            <div className="flex items-center mr-4 mb-2 md:mb-0">
              <FaCalendarAlt className="mr-2" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>{location}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-2">
              Responsibilities
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {description.map((item, index) => (
                <li key={index} className="text-card-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-md bg-secondary/20 text-secondary-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WorkPopup;
