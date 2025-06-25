'use client';
import { motion } from 'framer-motion';
import React from 'react';

export default function ProjectEmbedCard({
  title,
  liveUrl,
  embedHeight = 500,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-black text-white"
    >
      

      {/* iFrame Preview */}
      <div className="w-full" style={{ height: `${embedHeight}px` }}>
        <iframe
          src={liveUrl}
          title={title}
          className="w-full h-full"
          allow="fullscreen"
          loading="lazy"
          style={{
            border: 'none',
            backgroundColor: '#111',
          }}
        />
      </div>

    </motion.div>
  );
}
