'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PlaceholderSlideProps {
  slideNumber: number;
  title: string;
  backgroundColor?: string;
  isActive?: boolean;
}

export default function PlaceholderSlide({
  slideNumber,
  title,
  backgroundColor = 'bg-sand',
  isActive,
}: PlaceholderSlideProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`w-full h-full flex items-center justify-center ${backgroundColor}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        className="text-center px-8"
      >
        <motion.div
          variants={itemVariants}
          className="inline-block px-4 py-2 mb-6 bg-terracotta/20 rounded-full"
        >
          <span className="font-sarabun text-sm text-terracotta">
            Slide {slideNumber}
          </span>
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="font-kanit text-5xl md:text-6xl font-bold text-charcoal mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="font-sarabun text-lg text-deepForest"
        >
          Use arrow keys, swipe, or click the dots below to navigate
        </motion.p>
      </motion.div>
    </div>
  );
}
