import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import WorkPopup from "./WorkPopup";

interface WorkTimelineItemProps {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
  index: number;
  isVisible: boolean;
}

const WorkTimelineItem: React.FC<WorkTimelineItemProps> = ({
  company,
  position,
  duration,
  location,
  description,
  technologies,
  index,
  isVisible,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        className="relative pl-8 pb-8 border-l border-secondary/30 last:border-0">
        <div className="absolute left-0 top-0 w-4 h-4 -translate-x-2 rounded-full bg-primary"></div>
        <div className="bg-card rounded-lg p-4 hover:bg-card/80 transition-colors">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
            <h3 className="text-lg font-semibold text-primary">{position}</h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden flex items-center text-secondary text-sm mt-1">
              {isExpanded ? (
                <>
                  <span className="mr-1">Less</span>
                  <FaChevronUp size={12} />
                </>
              ) : (
                <>
                  <span className="mr-1">More</span>
                  <FaChevronDown size={12} />
                </>
              )}
            </button>
          </div>
          <div className="flex items-center text-secondary mb-2">
            <FaBuilding className="mr-2" />
            <span>{company}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center text-muted-foreground text-sm mb-4">
            <div className="flex items-center mr-4 mb-2 md:mb-0">
              <FaCalendarAlt className="mr-2" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>{location}</span>
            </div>
          </div>
          <div className={`md:block ${isExpanded ? "block" : "hidden"}`}>
            <button
              onClick={() => setShowPopup(true)}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </motion.div>
      {showPopup && (
        <WorkPopup
          company={company}
          position={position}
          duration={duration}
          location={location}
          description={description}
          technologies={technologies}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default WorkTimelineItem;
