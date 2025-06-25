"use client";
import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { cn } from "../utils/cn"; // adjust if path differs

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full z-0",
        className
      )}
    >
      {/* Lamp Beams */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Right beam */}
        <motion.div
          animate={{
            opacity: [0.4, 0.6, 0.5, 0.8],
            width: ["28rem", "30rem", "29rem", "30rem"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute right-1/2 h-56 w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Left beam */}
        <motion.div
          animate={{
            opacity: [0.4, 0.6, 0.5, 0.8],
            width: ["28rem", "30rem", "29rem", "30rem"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-full right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Base Blur Glow Layers */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Flickering Glow Orb */}
        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.5, 0.8],
            scale: [1, 1.05, 0.95, 1.02],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 blur-3xl"
        />

        {/* Flickering Center Light */}
        <motion.div
          animate={{
            opacity: [0.6, 1, 0.7, 0.9],
            scale: [1, 1.05, 0.95, 1.02],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute z-30 h-36 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        />

        {/* Thin Light Line */}
        <motion.div
          animate={{
            opacity: [0.6, 1, 0.7, 1],
            width: ["28rem", "30rem", "29rem", "30rem"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute z-50 h-0.5 -translate-y-[7rem] bg-cyan-400"
        />

        {/* Mask to cover top */}
        <div className="absolute z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950" />
      </div>

      {/* Centered Text */}
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5 text-center">
        {children}
      </div>
    </div>
  );
};

export default function MaintenancePage() {
  return (
    <>
      <Head>
        <title>Under Maintenance | Preetham Reddy</title>
        <meta
          name="description"
          content="My portfolio is currently under maintenance. Please check back soon!"
        />
      </Head>

      <LampContainer
      >
      <motion.div
        animate={{
            opacity: [0.6, 1, 0.7, 1],
            
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          
      >  
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.8, ease: "easeInOut" }}
          className="mt-8 bg-gradient-to-br from-slate-100 to-slate-500 py-4 bg-clip-text text-2xl md:text-5xl font-semibold text-transparent font-[moderniz]"
          >
          Portfolio Under Maintenance <br />
          <span className="text-[#6082B6] text-sm md:text-lg block mt-2">
            Cokking something amazing!
          </span>
        </motion.h1>
      </motion.div>
      </LampContainer>
    </>
  );
}
