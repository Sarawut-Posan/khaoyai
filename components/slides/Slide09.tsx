'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sun,
  Coffee,
  Mountain,
  ShoppingBag,
  MapPin,
  ExternalLink,
  Cloud,
  CloudRain,
  Info,
} from 'lucide-react';
import { DAY2_OPTIONS, IMAGE_URLS } from '@/lib/constants';
import { SlideProps } from '@/lib/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

// Icon mapping for option types
const iconMap: Record<string, React.ReactNode> = {
  coffee: <Coffee className="w-8 h-8" />,
  mountain: <Mountain className="w-8 h-8" />,
  'shopping-bag': <ShoppingBag className="w-8 h-8" />,
};

// Cafe details with images
const CAFE_DETAILS = [
  {
    id: 'bloom',
    name: 'Bloom by TV Pool',
    description: 'คาเฟ่สวนสวย บรรยากาศดี เหมาะกับถ่ายรูป',
    image: IMAGE_URLS.cafeBloom,
    mapUrl: 'https://maps.google.com/?q=Bloom+by+TV+Pool+Khao+Yai',
  },
  {
    id: 'midwinter',
    name: 'Midwinter Green',
    description: 'คาเฟ่ท่ามกลางธรรมชาติ อาหารอร่อย',
    image: IMAGE_URLS.midwinter,
    mapUrl: 'https://maps.google.com/?q=Midwinter+Green+Khao+Yai',
  },
];

export default function Slide09({ isActive }: SlideProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <div className="relative w-full h-full overflow-auto bg-gradient-to-br from-sand/30 to-sage/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta/10 rounded-full mb-4">
            <Sun className="w-8 h-8 text-terracotta" />
          </div>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-deepForest mb-3">
            วันที่ 2: กิจกรรมเช้า
          </h2>
          <p className="font-sarabun text-lg md:text-xl text-charcoal/80 mb-3">
            เลือกกิจกรรมตามใจชอบก่อนเดินทางกลับ
          </p>
          <Badge variant="info" size="md" className="text-base px-4 py-2">
            09:00 - 13:00 น.
          </Badge>
        </motion.div>

        {/* Weather note */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-sky-50 border-l-4 border-blue-400 rounded-lg p-4 md:p-5 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Cloud className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-kanit text-base md:text-lg font-semibold text-blue-900 mb-1 flex items-center gap-2">
                <Info className="w-4 h-4" />
                หมายเหตุสภาพอากาศ
              </h3>
              <p className="font-sarabun text-sm md:text-base text-blue-800">
                กิจกรรมกลางแจ้งขึ้นอยู่กับสภาพอากาศ หากฝนตก แนะนำให้เลือกคาเฟ่หรือช้อปปิ้งแทน
              </p>
            </div>
            <CloudRain className="w-5 h-5 text-blue-400 flex-shrink-0" />
          </div>
        </motion.div>

        {/* Option cards - 3 columns */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          {DAY2_OPTIONS.map((option) => (
            <motion.div
              key={option.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:scale-105"
              variants={itemVariants}
            >
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mb-4 text-terracotta">
                  {iconMap[option.icon]}
                </div>
                
                {/* Title and description */}
                <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest mb-2">
                  {option.title}
                </h3>
                <p className="font-sarabun text-base text-charcoal/80 mb-4">
                  {option.description}
                </p>
                
                {/* Options list */}
                <div className="mt-auto space-y-2">
                  {option.options.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 font-sarabun text-sm text-charcoal/70"
                    >
                      <MapPin className="w-4 h-4 text-sage flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cafe recommendations section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-deepForest mb-2 flex items-center justify-center gap-2">
              <Coffee className="w-7 h-7 text-terracotta" />
              คาเฟ่แนะนำ
            </h3>
            <p className="font-sarabun text-base md:text-lg text-charcoal/70">
              คาเฟ่ดัง ๆ ในเขาใหญ่ที่ไม่ควรพลาด
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {CAFE_DETAILS.map((cafe) => (
              <Card
                key={cafe.id}
                title={cafe.name}
                description={cafe.description}
                image={cafe.image}
                icon={<Coffee className="w-6 h-6" />}
                footer={
                  <Button
                    variant="secondary"
                    size="md"
                    icon={<ExternalLink className="w-4 h-4" />}
                    href={cafe.mapUrl}
                    className="w-full"
                  >
                    เปิดแผนที่
                  </Button>
                }
              />
            ))}
          </div>
        </motion.div>

        {/* Viewpoint and shopping highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {/* Viewpoint card */}
          <div className="bg-gradient-to-br from-deepForest/5 to-sage/10 rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-deepForest/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mountain className="w-6 h-6 text-deepForest" />
              </div>
              <div>
                <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest mb-2">
                  จุดชมวิว
                </h3>
                <p className="font-sarabun text-sm text-charcoal/60 mb-3">
                  ชมวิวธรรมชาติสวยงาม
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-kanit text-base font-semibold text-charcoal">
                    ทุ่งหญ้าสวนหิน
                  </h4>
                  <p className="font-sarabun text-sm text-charcoal/70">
                    ทุ่งหญ้ากว้างใหญ่ เหมาะกับถ่ายรูป
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-kanit text-base font-semibold text-charcoal">
                    จุดชมวิวเขาใหญ่
                  </h4>
                  <p className="font-sarabun text-sm text-charcoal/70">
                    มองเห็นภูเขาและหมอกยามเช้า
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white/50 rounded-lg flex items-center gap-2">
                <Cloud className="w-4 h-4 text-blue-500" />
                <p className="font-sarabun text-xs text-charcoal/70">
                  ขึ้นอยู่กับสภาพอากาศ
                </p>
              </div>
            </div>
          </div>

          {/* Shopping card */}
          <div className="bg-gradient-to-br from-terracotta/5 to-sand/20 rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-6 h-6 text-terracotta" />
              </div>
              <div>
                <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest mb-2">
                  ช้อปปิ้งของฝาก
                </h3>
                <p className="font-sarabun text-sm text-charcoal/60 mb-3">
                  ซื้อของฝากติดไม้ติดมือ
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-kanit text-base font-semibold text-charcoal">
                    ตลาดโชคชัย 4
                  </h4>
                  <p className="font-sarabun text-sm text-charcoal/70">
                    ของฝากหลากหลาย ราคาถูก
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-kanit text-base font-semibold text-charcoal">
                    ร้านของฝากเขาใหญ่
                  </h4>
                  <p className="font-sarabun text-sm text-charcoal/70">
                    ผลิตภัณฑ์ท้องถิ่น ของที่ระลึก
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="default" size="sm">
                  🍷 ไวน์
                </Badge>
                <Badge variant="default" size="sm">
                  🍫 ช็อกโกแลต
                </Badge>
                <Badge variant="default" size="sm">
                  🧀 ชีส
                </Badge>
                <Badge variant="default" size="sm">
                  🌾 ข้าวหอมมะลิ
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="text-center bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <p className="font-sarabun text-base md:text-lg text-charcoal/80 mb-2">
            <strong className="text-deepForest">เช็คเอาท์:</strong> 12:00 น. • <strong className="text-deepForest">ออกเดินทาง:</strong> 14:00 น.
          </p>
          <p className="font-sarabun text-sm text-charcoal/60">
            💡 แนะนำให้เก็บของและเช็คเอาท์ก่อน 12:00 น. เพื่อมีเวลาเที่ยวเพิ่ม
          </p>
        </motion.div>
      </div>
    </div>
  );
}
