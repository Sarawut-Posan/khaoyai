'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Phone, Star, Info, UtensilsCrossed, ChefHat } from 'lucide-react';
import { DEPARTURE_INFO, TATHAMPLAPHOW_INFO } from '@/lib/constants';
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
            จุดนัดพบ: {TATHAMPLAPHOW_INFO.name}
          </h2>
          <p className="font-sarabun text-base md:text-lg text-charcoal/70 mb-3">
            {TATHAMPLAPHOW_INFO.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3 items-center">
            <Badge variant="info" size="md" className="font-sarabun">
              <Clock className="w-4 h-4 mr-1" />
              นัดพบ {DEPARTURE_INFO.meetingTime}
            </Badge>
            <Badge variant="success" size="md" className="font-sarabun">
              <UtensilsCrossed className="w-4 h-4 mr-1" />
              เปิด {TATHAMPLAPHOW_INFO.hours}
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
          {/* Restaurant Info Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-5 md:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="bg-deepForest/10 p-3 rounded-full">
                  <MapPin className="w-5 h-5 text-deepForest" />
                </div>
                <div>
                  <h4 className="font-kanit text-base md:text-lg font-semibold text-deepForest mb-1">
                    ที่อยู่
                  </h4>
                  <p className="font-sarabun text-sm md:text-base text-charcoal/80">
                    {TATHAMPLAPHOW_INFO.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="bg-terracotta/10 p-3 rounded-full">
                  <Phone className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h4 className="font-kanit text-base md:text-lg font-semibold text-deepForest mb-1">
                    โทรศัพท์
                  </h4>
                  <a
                    href={`tel:${TATHAMPLAPHOW_INFO.phone}`}
                    className="font-sarabun text-sm md:text-base text-terracotta hover:underline"
                  >
                    {TATHAMPLAPHOW_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Atmosphere */}
              <div className="flex items-start gap-3">
                <div className="bg-sage/30 p-3 rounded-full">
                  <Info className="w-5 h-5 text-deepForest" />
                </div>
                <div>
                  <h4 className="font-kanit text-base md:text-lg font-semibold text-deepForest mb-1">
                    บรรยากาศ
                  </h4>
                  <p className="font-sarabun text-sm md:text-base text-charcoal/80">
                    {TATHAMPLAPHOW_INFO.atmosphere.highlight}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Button */}
            <div className="mt-5">
              <Button
                variant="primary"
                href={TATHAMPLAPHOW_INFO.mapUrl}
                icon={<MapPin className="w-5 h-5" />}
                className="w-full"
              >
                เปิดแผนที่ Google Maps
              </Button>
            </div>
          </motion.div>

          {/* Menu Highlights */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4 md:mb-5">
              <ChefHat className="w-6 h-6 md:w-7 md:h-7 text-terracotta" />
              <h3 className="font-kanit text-2xl md:text-3xl font-bold text-deepForest">
                เมนูแนะนำ
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {TATHAMPLAPHOW_INFO.menuHighlights.map((menu) => (
                <motion.div
                  key={menu.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Menu Image */}
                  <div className="relative h-40 md:h-48 overflow-hidden bg-sage/10">
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="w-full h-full object-cover"
                    />
                    {menu.isSignature && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="warning" size="sm" className="font-sarabun">
                          <Star className="w-3 h-3 mr-1" />
                          เมนูเด็ด
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Menu Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-kanit text-lg md:text-xl font-semibold text-deepForest">
                        {menu.name}
                      </h4>
                      <span className="font-kanit text-lg md:text-xl font-bold text-terracotta ml-2">
                        {menu.price}฿
                      </span>
                    </div>
                    <p className="font-sarabun text-sm md:text-base text-charcoal/70 line-clamp-2">
                      {menu.description}
                    </p>
                    {'weight' in menu && menu.weight && (
                      <p className="font-sarabun text-xs md:text-sm text-charcoal/60 mt-1">
                        ขนาด: {menu.weight}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Specialties & Tips */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Specialties */}
            <div className="bg-deepForest/5 rounded-xl p-5 md:p-6">
              <h4 className="font-kanit text-lg md:text-xl font-bold text-deepForest mb-3 md:mb-4">
                จุดเด่นของร้าน
              </h4>
              <ul className="space-y-2">
                {TATHAMPLAPHOW_INFO.specialties.map((specialty, index) => (
                  <li
                    key={index}
                    className="font-sarabun text-sm md:text-base text-charcoal/80 flex items-start"
                  >
                    <Star className="w-4 h-4 text-terracotta mr-2 mt-0.5 flex-shrink-0" />
                    <span>{specialty}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div className="bg-terracotta/10 rounded-xl p-5 md:p-6">
              <h4 className="font-kanit text-lg md:text-xl font-bold text-deepForest mb-3 md:mb-4">
                เคล็ดลับสำหรับกลุ่ม
              </h4>
              <div className="space-y-2">
                {TATHAMPLAPHOW_INFO.tips.map((tip, index) => (
                  <p
                    key={index}
                    className="font-sarabun text-sm md:text-base text-charcoal/80"
                  >
                    {tip}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Note */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-2"
          >
            <p className="font-sarabun text-sm md:text-base text-charcoal/60">
              📍 กรุณามาถึงให้ตรงเวลา {DEPARTURE_INFO.meetingTime} เพื่อเราจะได้ออกเดินทางพร้อมกัน
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
