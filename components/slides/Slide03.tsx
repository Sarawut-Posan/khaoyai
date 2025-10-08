'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Map } from 'lucide-react';
import { DEPARTURE_INFO, BREAKFAST_SPOTS } from '@/lib/constants';
import { SlideProps } from '@/lib/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function Slide03({ isActive }: SlideProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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
    <div className="relative w-full h-full overflow-auto bg-sand">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-deepForest mb-3">
            วันที่ 1: ออกเดินทาง
          </h2>
          <p className="font-sarabun text-lg md:text-xl text-charcoal/80">
            เช้าวันเสาร์ที่ 8 พฤศจิกายน 2568
          </p>
        </motion.div>

        {/* Main content - Split layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          {/* Left side - Map preview and meeting point */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Map preview */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative w-full h-64 md:h-80 bg-sage/20">
                {/* Map placeholder - in production, this could be an actual map embed */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-terracotta mx-auto mb-4" />
                    <p className="font-kanit text-xl font-semibold text-deepForest mb-2">
                      จุดนัดพบ
                    </p>
                    <p className="font-sarabun text-lg text-charcoal">
                      {DEPARTURE_INFO.meetingPoint}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map button */}
              <div className="p-4 md:p-6">
                <Button
                  variant="primary"
                  href={DEPARTURE_INFO.mapUrl}
                  icon={<Map className="w-5 h-5" />}
                  className="w-full"
                >
                  เปิดแผนที่
                </Button>
              </div>
            </div>

            {/* Estimated arrival badge */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center"
            >
              <Badge variant="info" size="md" className="text-base px-4 py-2">
                {DEPARTURE_INFO.estimatedArrival}
              </Badge>
            </motion.div>
          </motion.div>

          {/* Right side - Schedule details */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Meeting time */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-terracotta/10 p-3 rounded-full">
                  <Clock className="w-8 h-8 text-terracotta" />
                </div>
                <div>
                  <h3 className="font-kanit text-2xl font-semibold text-deepForest">
                    เวลานัดพบ
                  </h3>
                  <p className="font-sarabun text-3xl font-bold text-terracotta">
                    {DEPARTURE_INFO.meetingTime}
                  </p>
                </div>
              </div>
              <p className="font-sarabun text-base text-charcoal/80">
                กรุณามาถึงให้ตรงเวลา เพื่อให้เราออกเดินทางพร้อมกัน
              </p>
            </div>

            {/* Breakfast spots */}
            <div>
              <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest mb-4">
                ตัวเลือกอาหารเช้า
              </h3>
              <div className="space-y-4">
                {BREAKFAST_SPOTS.map((spot) => (
                  <Card
                    key={spot.id}
                    title={spot.name}
                    description={spot.description}
                    image={spot.image}
                    icon={<MapPin className="w-5 h-5" />}
                    footer={
                      <Button
                        variant="secondary"
                        size="sm"
                        href={spot.mapUrl}
                        icon={<Map className="w-4 h-4" />}
                      >
                        ดูแผนที่
                      </Button>
                    }
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional info */}
        <motion.div
          className="mt-8 md:mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="font-sarabun text-sm md:text-base text-charcoal/60">
            💡 แนะนำให้เติมน้ำมันเต็มถังก่อนออกเดินทาง
          </p>
        </motion.div>
      </div>
    </div>
  );
}
