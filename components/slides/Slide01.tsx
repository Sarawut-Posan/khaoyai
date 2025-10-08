'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { TRIP_INFO, IMAGE_URLS } from '@/lib/constants';
import { SlideProps } from '@/lib/types';

export default function Slide01({ isActive }: SlideProps) {
  // Animation variants for staggered fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Full-bleed background with gradient overlay */}
      <div className="absolute inset-0">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${IMAGE_URLS.hero}')`,
            backgroundColor: '#2F6B3C', // Fallback color
          }}
        />
        
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(47, 107, 60, 0.85) 0%, rgba(47, 107, 60, 0.4) 50%, rgba(209, 122, 71, 0.3) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-12 lg:px-16 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        {/* Main title */}
        <motion.h1
          className="font-kanit font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-6 leading-tight"
          variants={itemVariants}
        >
          {TRIP_INFO.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-kanit font-semibold text-sand text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8"
          variants={itemVariants}
        >
          {TRIP_INFO.subtitle}
        </motion.p>

        {/* Dates and location */}
        <motion.div
          className="font-sarabun text-white/90 text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 space-y-2"
          variants={itemVariants}
        >
          <p>{TRIP_INFO.dates}</p>
          <p className="text-terracotta font-medium">{TRIP_INFO.location}</p>
        </motion.div>

        {/* Team icon with count */}
        <motion.div
          className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 md:px-8 md:py-4"
          variants={itemVariants}
        >
          <Users className="w-6 h-6 md:w-8 md:h-8 text-terracotta" />
          <span className="font-sarabun text-white text-lg md:text-xl font-medium">
            {TRIP_INFO.teamSize} คน
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
