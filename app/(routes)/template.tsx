"use client"
import { motion } from "framer-motion";

const pageTransitionVariants = {
  entrance: {
    x: 300,
    opacity: 0,
  },
  default: { x: 0, opacity: 1 },
  exit: {
    x: -300,
    opacity: 0,
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      // variants={pageTransitionVariants}
      // initial="entrance"
      // animate="default"
      // exit="exit"
      // transition={{ type: "linear" }}
    >
      {children}
    </motion.div>
  );
}
