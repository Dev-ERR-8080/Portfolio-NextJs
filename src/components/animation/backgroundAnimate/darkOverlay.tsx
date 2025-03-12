import { motion } from "framer-motion";
import React from "react";

const DarkOverlay: React.FC = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-black z-[-1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
  );
};

export default DarkOverlay;
