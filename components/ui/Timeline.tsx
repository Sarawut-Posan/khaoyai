'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Car, Coffee, Activity, Utensils, ShoppingCart,
  Home, Moon, Sun, Bike, Zap, Target, Crosshair,
  Heart, Truck, MapPin, Calendar, Flame
} from 'lucide-react';

export interface TimelineItem {
  time: string;
  title: string;
  icon: string;
  description?: string;
  image?: string;
  isDayMarker?: boolean;
}

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  car: Car,
  coffee: Coffee,
  activity: Activity,
  utensils: Utensils,
  'shopping-cart': ShoppingCart,
  home: Home,
  moon: Moon,
  sun: Sun,
  bike: Bike,
  zap: Zap,
  target: Target,
  crosshair: Crosshair,
  heart: Heart,
  truck: Truck,
  'map-pin': MapPin,
  calendar: Calendar,
  flame: Flame,
};

export default function Timeline({
  items,
  orientation = 'horizontal',
  className = '',
}: TimelineProps) {
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Activity;
    return <IconComponent className="w-5 h-5" />;
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  if (orientation === 'vertical') {
    return (
      <div className={`space-y-6 ${className}`}>
        {items.map((item, index) => {
          // Day marker styling
          if (item.isDayMarker) {
            return (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="flex items-center gap-4 my-8"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-terracotta text-white shadow-lg">
                  {getIcon(item.icon)}
                </div>
                <div>
                  <h3 className="font-kanit text-xl md:text-2xl font-bold text-terracotta">
                    {item.title}
                  </h3>
                  <p className="font-sarabun text-sm text-charcoal/60">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          }

          // Regular timeline item
          return (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="flex gap-4 group"
            >
              {/* Icon and line */}
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-sage text-white flex-shrink-0 shadow-md transition-shadow group-hover:shadow-lg"
                >
                  {getIcon(item.icon)}
                </motion.div>
                {index < items.length - 1 && (
                  <div className="w-0.5 h-full min-h-[60px] bg-sage/30 mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="font-sarabun text-sm text-sage font-semibold mb-1">
                  {item.time}
                </div>
                <h4 className="font-kanit text-lg font-semibold text-charcoal mb-2">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="font-sarabun text-sm text-charcoal/70 mb-3">
                    {item.description}
                  </p>
                )}

                {/* Image */}
                {item.image && (
                  <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative w-full h-40 rounded-lg overflow-hidden shadow-md"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }
  
  // Horizontal orientation (for desktop only - show as scrollable cards)
  return (
    <div className={`relative ${className}`}>
      <div className="overflow-x-auto pb-6 scrollbar-hide">
        <div className="flex gap-6 min-w-max px-4">
          {items.map((item, index) => {
            // Day marker for horizontal
            if (item.isDayMarker) {
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col items-center justify-center min-w-[200px] bg-terracotta/10 rounded-xl p-6 border-2 border-terracotta"
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-terracotta text-white shadow-lg mb-3">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="font-kanit text-lg font-bold text-terracotta text-center">
                    {item.title}
                  </h3>
                  <p className="font-sarabun text-xs text-charcoal/60 text-center mt-1">
                    {item.description}
                  </p>
                </motion.div>
              );
            }

            // Regular timeline card
            return (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="flex flex-col items-center min-w-[240px] max-w-[280px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Image */}
                {item.image && (
                  <div className="relative w-full h-40 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="280px"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Time badge */}
                    <div className="absolute top-3 right-3 bg-sage text-white px-3 py-1 rounded-full font-sarabun text-xs font-semibold shadow-lg">
                      {item.time}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-4 flex-1 w-full">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sage/20 text-sage flex-shrink-0">
                      {getIcon(item.icon)}
                    </div>
                    <div className="flex-1">
                      {!item.image && (
                        <div className="font-sarabun text-xs text-sage font-semibold mb-1">
                          {item.time}
                        </div>
                      )}
                      <h4 className="font-kanit text-base font-semibold text-charcoal leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {item.description && (
                    <p className="font-sarabun text-sm text-charcoal/70 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="text-center mt-2">
        <p className="font-sarabun text-xs text-charcoal/40">
          ← เลื่อนดูกิจกรรมทั้งหมด →
        </p>
      </div>
    </div>
  );
}
