import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

// Define a type for the props
interface BouncyTextProps {
  className?: string;
  children: React.ReactNode; // This type is appropriate for anything that can be rendered: numbers, strings, elements or an array (or fragment) containing these types.
}

export const BouncyText = ({ className, children }: BouncyTextProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: [20, -5, 0],
      }}
      transition={{
        delay: 0.5,
        duration: 1,
        ease: [0.4, 0.0, 0.2, 1],
      }}
      className={cn("mx-auto text-center text-foreground", className)}
    >
      {children}
    </motion.div>
  );
};