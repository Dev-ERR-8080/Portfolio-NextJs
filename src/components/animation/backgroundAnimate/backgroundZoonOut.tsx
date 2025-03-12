import { RetroGrid } from "@/components/RetroGrid/retroGrid";
import { motion } from "framer-motion";
import React from "react";

const BackgroundZoom: React.FC = () => {
  return (
    <div className="relative">
      {/* Background Image with Zoom Effect */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-[-2]"
        initial={{ backgroundSize: "120%", opacity: 0 }}
        animate={{ backgroundSize: "100%", opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "url('https://www.aamirshaikh.net/_next/image?url=%2Fimages%2Fcloud-bg.jpg&w=1920&q=75')",
        }}
      />

      {/* Grainy and Vignette Effects */}
      <div className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none">
        {/* Grainy Effect */}
        <div
          className="absolute inset-0 bg-grain"
          style={{
            backgroundImage: `url('
            ')`, // Optional texture URL for grainy effect
            opacity: 0.3, // Adjust grain visibility
          }}
        />

        {/* Vignette Effect */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {/* RetroGrid Component */}
      <RetroGrid />
    </div>
  );
};

export default BackgroundZoom;
