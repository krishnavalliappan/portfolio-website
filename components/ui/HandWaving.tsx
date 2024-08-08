import { motion } from "framer-motion";

export const HandWaving = () => {
  return (
    <motion.div
       // you can adjust the size with Tailwind CSS classes
      style={{ display: "inline-block", transformOrigin: "70% 70%" }}
      animate={{
        rotate: [0, 14, -8, 14, -4, 10, 0, 0], // degrees of rotation
      }}
      transition={{
        duration: 2.5, // total duration of one cycle of the animation
        repeat: Infinity, // repeat the animation infinitely
        repeatType: "loop", // animation type
        ease: "easeInOut", // Framer Motion's predefined ease-in-out function
      }}
    >
      👋
    </motion.div>
  );
};
