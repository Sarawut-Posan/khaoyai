'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Timeline from '@/components/ui/Timeline';
import { TIMELINE_DATA } from '@/lib/constants';
import { SlideProps } from '@/lib/types';

export default function Slide02({ isActive }: SlideProps) {
  // Animation variants for staggered fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-sand">
      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col h-full px-6 md:px-12 lg:px-16 py-8 md:py-12 lg:py-16"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        {/* Header */}
        <motion.div className="text-center mb-8 md:mb-12" variants={itemVariants}>
          <h2 className="font-kanit font-bold text-deepForest text-3xl sm:text-4xl md:text-5xl mb-3">
            กำหนดการทริป
          </h2>
          <p className="font-sarabun text-charcoal/70 text-base md:text-lg">
            ตารางเวลา 2 วัน 1 คืน ที่เขาใหญ่
          </p>
        </motion.div>

        {/* Timeline - Horizontal on desktop, Vertical on mobile */}
        <motion.div 
          className="flex-1 flex items-center justify-center overflow-auto"
          variants={itemVariants}
        >
          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block w-full max-w-6xl">
            <Timeline 
              items={TIMELINE_DATA} 
              orientation="horizontal"
              className="px-4"
            />
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="block md:hidden w-full max-w-2xl">
            <Timeline 
              items={TIMELINE_DATA} 
              orientation="vertical"
            />
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div 
          className="text-center mt-8 md:mt-12"
          variants={itemVariants}
        >
          <p className="font-sarabun text-sm text-charcoal/60">
            💡 เลื่อนเมาส์ไปที่ไอคอนเพื่อดูรายละเอียดเพิ่มเติม
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
