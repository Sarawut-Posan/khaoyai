'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  ExternalLink,
  Users,
  Clock,
  Info
} from 'lucide-react';
import { RESTAURANTS } from '@/lib/constants';
import { SlideProps } from '@/lib/types';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function Slide05({ isActive }: SlideProps) {
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
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative w-full h-full overflow-auto bg-sand">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-deepForest mb-3">
            ร้านอาหารและคาเฟ่แนะนำ
          </h2>
          <p className="font-sarabun text-lg md:text-xl text-charcoal/80 mb-4">
            เลือกร้านที่ชอบสำหรับมื้อกลางวัน
          </p>
          
          {/* Time and group info */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Badge variant="info" size="md" className="text-base px-4 py-2">
              <Clock className="w-4 h-4 inline mr-2" />
              13:00 - 14:30 น.
            </Badge>
            <Badge variant="success" size="md" className="text-base px-4 py-2">
              <Users className="w-4 h-4 inline mr-2" />
              กลุ่ม 14 คน
            </Badge>
          </div>
        </motion.div>

        {/* Restaurant cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          {RESTAURANTS.map((restaurant) => (
            <motion.div 
              key={restaurant.name} 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Restaurant image */}
              <div className="relative h-48 bg-sage/20 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Map pin indicator */}
                <div className="absolute top-3 right-3 bg-terracotta text-white rounded-full p-2 shadow-md">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>

              {/* Restaurant info */}
              <div className="p-6">
                <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest mb-2">
                  {restaurant.name}
                </h3>
                <p className="font-sarabun text-base text-charcoal/70 mb-4">
                  {restaurant.type}
                </p>

                {/* Notes */}
                {restaurant.notes && (
                  <div className="bg-sage/10 rounded-lg p-3 mb-4">
                    <p className="font-sarabun text-sm text-charcoal/80 flex items-start gap-2">
                      <Info className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                      {restaurant.notes}
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${restaurant.phone}`}
                    className="flex-1"
                  >
                    <Button
                      variant="primary"
                      size="md"
                      icon={<Phone className="w-4 h-4" />}
                      className="w-full"
                    >
                      โทรจอง
                    </Button>
                  </a>
                  <a
                    href={restaurant.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="secondary"
                      size="md"
                      icon={<ExternalLink className="w-4 h-4" />}
                      className="w-full"
                    >
                      แผนที่
                    </Button>
                  </a>
                </div>

                {/* Phone number display */}
                <p className="font-sarabun text-sm text-charcoal/60 text-center mt-3">
                  📞 {restaurant.phone}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Group seating notes */}
        <motion.div
          className="bg-terracotta/10 border-2 border-terracotta/30 rounded-xl p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-terracotta/20 p-3 rounded-full flex-shrink-0">
              <Users className="w-6 h-6 text-terracotta" />
            </div>
            <div>
              <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest mb-2">
                ข้อมูลสำหรับกลุ่มใหญ่
              </h3>
              <p className="font-sarabun text-base text-charcoal/80">
                เนื่องจากเราเป็นกลุ่มใหญ่ (14 คน) แนะนำให้:
              </p>
            </div>
          </div>
          
          <ul className="font-sarabun text-base text-charcoal/80 space-y-3 ml-4">
            <li className="flex items-start gap-3">
              <span className="text-terracotta font-bold flex-shrink-0">1.</span>
              <span><strong>โทรจองล่วงหน้า</strong> - แจ้งจำนวนคนและเวลาที่จะไปถึง</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-terracotta font-bold flex-shrink-0">2.</span>
              <span><strong>ขอโต๊ะกลุ่มใหญ่</strong> - เพื่อให้นั่งรวมกันได้</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-terracotta font-bold flex-shrink-0">3.</span>
              <span><strong>สอบถามเมนูแนะนำ</strong> - สำหรับกลุ่มใหญ่หรือเซ็ตอาหาร</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-terracotta font-bold flex-shrink-0">4.</span>
              <span><strong>เตรียมเวลา</strong> - ควรมีเวลาประมาณ 1-1.5 ชั่วโมงสำหรับมื้อนี้</span>
            </li>
          </ul>
        </motion.div>

        {/* Additional tip */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <p className="font-sarabun text-sm md:text-base text-charcoal/60">
            💡 สามารถโหวตเลือกร้านในกลุ่มก่อนถึงวันเดินทางได้นะ!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
