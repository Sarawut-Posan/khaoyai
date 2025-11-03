'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Bike,
  Zap,
  Target,
  Crosshair,
  Heart,
  Truck,
  Users,
  Info,
  CloudRain,
  Clock,
  Tag,
  Baby,
  User,
  Check,
  Star
} from 'lucide-react';
import { useContentData } from '@/lib/hooks/useContentData';
import { SlideProps } from '@/lib/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  bike: <Bike className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  target: <Target className="w-6 h-6" />,
  crosshair: <Crosshair className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  truck: <Truck className="w-6 h-6" />,
};

export default function Slide04({ isActive }: SlideProps) {
  // Get data with fallback to constants
  const contentData = useContentData();
  const activities = contentData.activities;
  const packages = contentData.thongsomboonPackages;
  const promotions = contentData.thongsomboonPromotions;

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
    <div className="relative w-full h-full overflow-auto bg-sage/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-deepForest mb-3">
            Rapsodia Park Khao Yai
          </h2>
          <p className="font-sarabun text-lg md:text-xl text-charcoal/80 mb-4">
            สวนสนุกและกิจกรรมกลางแจ้งในเขาใหญ่
          </p>
          
          {/* Activity info */}
          <div className="flex items-center justify-center gap-3">
            <Badge variant="info" size="md" className="text-base px-4 py-2">
              <Bike className="w-4 h-4 inline mr-2" />
              ATV และนั่งชิล
            </Badge>
            <Badge variant="warning" size="md" className="text-base px-4 py-2">
              <Clock className="w-4 h-4 inline mr-2" />
              14:00 - 16:00 น. (1-2 ชม.)
            </Badge>
          </div>
        </motion.div>

        {/* Main Activity Highlights */}
        <motion.div
          className="mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ATV Activity */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-terracotta/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-terracotta/20 p-3 rounded-full">
                  <Bike className="w-6 h-6 text-terracotta" />
                </div>
                <h3 className="font-kanit text-2xl font-bold text-deepForest">
                  ATV Adventure
                </h3>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="ATV"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-sarabun text-base text-charcoal/80 mb-3">
                ขับรถ ATV สุดมันส์ลุยเส้นทางผจญภัยในธรรมชาติ เหมาะกับทุกวัย
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 font-sarabun text-sm text-charcoal/70">
                  <Check className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                  <span>เส้นทางปลอดภัย มีเจ้าหน้าที่คอยดูแล</span>
                </li>
                <li className="flex items-start gap-2 font-sarabun text-sm text-charcoal/70">
                  <Check className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                  <span>อุปกรณ์ป้องกันครบครัน</span>
                </li>
                <li className="flex items-start gap-2 font-sarabun text-sm text-charcoal/70">
                  <Check className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                  <span>ระยะเวลาประมาณ 30-45 นาที</span>
                </li>
              </ul>
            </motion.div>

            {/* Chill Zone */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-sage/40"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-sage/30 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-deepForest" />
                </div>
                <h3 className="font-kanit text-2xl font-bold text-deepForest">
                  Chill Zone
                </h3>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                  alt="Chill Zone"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-sarabun text-base text-charcoal/80 mb-3">
                พื้นที่พักผ่อนท่ามกลางธรรมชาติ เหมาะสำหรับถ่ายรูปและนั่งชิล
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 font-sarabun text-sm text-charcoal/70">
                  <Check className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                  <span>บรรยากาศสวยงาม มุมถ่ายรูปเยอะ</span>
                </li>
                <li className="flex items-start gap-2 font-sarabun text-sm text-charcoal/70">
                  <Check className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                  <span>มีคาเฟ่และร้านอาหาร</span>
                </li>
                <li className="flex items-start gap-2 font-sarabun text-sm text-charcoal/70">
                  <Check className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                  <span>เหมาะสำหรับพักผ่อนและสังสรรค์</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Tips and info boxes */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          {/* Tips box */}
          <motion.div
            variants={itemVariants}
            className="bg-terracotta/10 border-2 border-terracotta/30 rounded-xl p-6"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-terracotta/20 p-2 rounded-full flex-shrink-0">
                <Info className="w-5 h-5 text-terracotta" />
              </div>
              <h3 className="font-kanit text-xl font-semibold text-deepForest">
                ข้อมูลสำคัญ
              </h3>
            </div>
            <ul className="font-sarabun text-base text-charcoal/80 space-y-2">
              <li>• กิจกรรมใช้เวลา 1-2 ชั่วโมง</li>
              <li>• มีทั้ง ATV และพื้นที่นั่งชิล</li>
              <li>• สวมรองเท้าผ้าใบและเสื้อผ้าสบาย ๆ</li>
              <li>• มีห้องน้ำและร้านอาหาร</li>
              <li>• บรรยากาศสวยงาม เหมาะถ่ายรูป</li>
              <li>• ราคาและรายละเอียดจะแจ้งให้ทราบอีกครั้ง</li>
            </ul>
          </motion.div>

          {/* Weather backup note */}
          <motion.div
            variants={itemVariants}
            className="bg-sage/20 border-2 border-sage/40 rounded-xl p-6"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-sage/30 p-2 rounded-full flex-shrink-0">
                <CloudRain className="w-5 h-5 text-deepForest" />
              </div>
              <h3 className="font-kanit text-xl font-semibold text-deepForest">
                แผนสำรอง (กรณีฝนตก)
              </h3>
            </div>
            <p className="font-sarabun text-base text-charcoal/80 mb-3">
              หากสภาพอากาศไม่เอื้ออำนวย เราสามารถเปลี่ยนแผนได้:
            </p>
            <ul className="font-sarabun text-base text-charcoal/80 space-y-2">
              <li>• เลื่อนเวลาไปคาเฟ่/ร้านอาหารก่อน</li>
              <li>• ไปช้อปปิ้งที่ Makro ก่อนเวลา</li>
              <li>• เช็คอินวิลล่าเร็วขึ้นและทำกิจกรรมที่วิลล่า</li>
              <li>• พักผ่อนที่ Chill Zone ในร่ม</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Additional note */}
        <motion.div
          className="mt-8 text-center space-y-2"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="font-sarabun text-sm md:text-base text-charcoal/60">
            📍 Rapsodia Park Khao Yai - สวนสนุกและกิจกรรมกลางแจ้ง
          </p>
          <p className="font-sarabun text-sm md:text-base text-charcoal/60">
            💡 อย่าลืมถ่ายรูปมุมสวย ๆ และเก็บความทรงจำดี ๆ กันเยอะ ๆ นะ!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
