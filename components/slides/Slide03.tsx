'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Heart, Info, Car } from 'lucide-react';
import { DEPARTURE_INFO, CHARITY_INFO, KRUA_BAN_NAI_PHON_INFO } from '@/lib/constants';
import { SlideProps } from '@/lib/types';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function Slide03({ isActive }: SlideProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative w-full h-full overflow-auto bg-sand">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-10">
        {/* Header */}
        <motion.div
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-deepForest mb-2">
            จุดนัดพบ: {CHARITY_INFO.name}
          </h2>
          <p className="font-sarabun text-base md:text-lg text-charcoal/70 mb-3">
            {CHARITY_INFO.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3 items-center">
            <Badge variant="info" size="md" className="font-sarabun">
              <Clock className="w-4 h-4 mr-1" />
              ออกเดินทาง {DEPARTURE_INFO.meetingTime}
            </Badge>
            <Badge variant="success" size="md" className="font-sarabun">
              <Heart className="w-4 h-4 mr-1" />
              กิจกรรมบริจาค {CHARITY_INFO.activityTime}
            </Badge>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          className="space-y-6 md:space-y-8"
        >
          {/* Charity Location Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-5 md:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="bg-deepForest/10 p-3 rounded-full">
                  <MapPin className="w-5 h-5 text-deepForest" />
                </div>
                <div>
                  <h4 className="font-kanit text-base md:text-lg font-semibold text-deepForest mb-1">
                    สถานที่
                  </h4>
                  <p className="font-sarabun text-sm md:text-base text-charcoal/80">
                    {CHARITY_INFO.name}, {CHARITY_INFO.location}
                  </p>
                </div>
              </div>

              {/* Activity Time */}
              <div className="flex items-start gap-3">
                <div className="bg-terracotta/10 p-3 rounded-full">
                  <Clock className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h4 className="font-kanit text-base md:text-lg font-semibold text-deepForest mb-1">
                    กิจกรรมบริจาค
                  </h4>
                  <p className="font-sarabun text-sm md:text-base text-charcoal/80">
                    {CHARITY_INFO.activityTime} ({CHARITY_INFO.duration})
                  </p>
                </div>
              </div>
            </div>

            {/* Map Button */}
            <div className="mt-5">
              <Button
                variant="primary"
                href={CHARITY_INFO.mapUrl}
                icon={<MapPin className="w-5 h-5" />}
                className="w-full"
              >
                เปิดแผนที่ Google Maps
              </Button>
            </div>
          </motion.div>

          {/* Timeline Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {/* Step 1: Meeting Point */}
            <div className="bg-gradient-to-br from-deepForest/10 to-sage/20 rounded-xl p-5 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-deepForest text-white w-8 h-8 rounded-full flex items-center justify-center font-kanit font-bold">
                  1
                </div>
                <h4 className="font-kanit text-lg md:text-xl font-bold text-deepForest">
                  จุดนัดพบ
                </h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-deepForest mt-0.5 flex-shrink-0" />
                  <p className="font-sarabun text-sm md:text-base text-charcoal/80">
                    <strong>{DEPARTURE_INFO.meetingTime}</strong> - ออกเดินทาง
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-deepForest mt-0.5 flex-shrink-0" />
                  <p className="font-sarabun text-sm md:text-base text-charcoal/80">
                    {CHARITY_INFO.name}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Car className="w-4 h-4 text-deepForest mt-0.5 flex-shrink-0" />
                  <p className="font-sarabun text-sm md:text-base text-charcoal/80">
                    {DEPARTURE_INFO.estimatedArrival}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Charity Activity */}
            <div className="bg-gradient-to-br from-terracotta/10 to-terracotta/20 rounded-xl p-5 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-terracotta text-white w-8 h-8 rounded-full flex items-center justify-center font-kanit font-bold">
                  2
                </div>
                <h4 className="font-kanit text-lg md:text-xl font-bold text-deepForest">
                  กิจกรรมบริจาค
                </h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                  <p className="font-sarabun text-sm md:text-base text-charcoal/80">
                    <strong>{CHARITY_INFO.activityTime}</strong>
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                  <p className="font-sarabun text-sm md:text-base text-charcoal/80">
                    {CHARITY_INFO.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Lunch */}
            <div className="bg-gradient-to-br from-sage/20 to-sage/30 rounded-xl p-5 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-sage text-white w-8 h-8 rounded-full flex items-center justify-center font-kanit font-bold">
                  3
                </div>
                <h4 className="font-kanit text-lg md:text-xl font-bold text-deepForest">
                  มื้อเที่ยง
                </h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-deepForest mt-0.5 flex-shrink-0" />
                  <p className="font-sarabun text-sm md:text-base text-charcoal/80">
                    <strong>{KRUA_BAN_NAI_PHON_INFO.mealTime}</strong>
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-deepForest mt-0.5 flex-shrink-0" />
                  <p className="font-sarabun text-sm md:text-base text-charcoal/80">
                    {KRUA_BAN_NAI_PHON_INFO.name}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-deepForest mt-0.5 flex-shrink-0" />
                  <p className="font-sarabun text-sm md:text-base text-charcoal/80">
                    {KRUA_BAN_NAI_PHON_INFO.duration}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Important Notes */}
          <motion.div variants={itemVariants} className="bg-deepForest/5 rounded-xl p-5 md:p-6">
            <h4 className="font-kanit text-lg md:text-xl font-bold text-deepForest mb-3 md:mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-terracotta" />
              ข้อมูลสำคัญ
            </h4>
            <ul className="space-y-2">
              <li className="font-sarabun text-sm md:text-base text-charcoal/80 flex items-start">
                <span className="text-terracotta mr-2">⏰</span>
                <span>กรุณามาถึงให้ตรงเวลา <strong>{DEPARTURE_INFO.meetingTime}</strong> เพื่อเราจะได้ออกเดินทางพร้อมกัน</span>
              </li>
              <li className="font-sarabun text-sm md:text-base text-charcoal/80 flex items-start">
                <span className="text-terracotta mr-2">❤️</span>
                <span>กิจกรรมบริจาคใช้เวลาประมาณ 30 นาที</span>
              </li>
              <li className="font-sarabun text-sm md:text-base text-charcoal/80 flex items-start">
                <span className="text-terracotta mr-2">🍽️</span>
                <span>หลังจากนั้นเดินทางต่อไปทานอาหารกลางวันที่ {KRUA_BAN_NAI_PHON_INFO.name}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
