'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Moon,
  Dice5,
  Mic,
  Waves,
  Flame,
  Camera,
  Coffee,
  AlertTriangle,
  Recycle,
  Trash2,
  Leaf,
  Sparkles,
} from 'lucide-react';
import { EVENING_ACTIVITIES } from '@/lib/constants';
import { SlideProps } from '@/lib/types';
import Badge from '@/components/ui/Badge';

// Icon mapping for evening activities
const iconMap: Record<string, React.ReactNode> = {
  dice: <Dice5 className="w-8 h-8" />,
  mic: <Mic className="w-8 h-8" />,
  waves: <Waves className="w-8 h-8" />,
  flame: <Flame className="w-8 h-8" />,
  camera: <Camera className="w-8 h-8" />,
  coffee: <Coffee className="w-8 h-8" />,
};

export default function Slide08({ isActive }: SlideProps) {
  // Animation variants
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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative w-full h-full overflow-auto bg-gradient-to-br from-deepForest/5 to-sage/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-deepForest/10 rounded-full mb-4">
            <Moon className="w-8 h-8 text-deepForest" />
          </div>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-deepForest mb-3">
            กิจกรรมยามค่ำ
          </h2>
          <p className="font-sarabun text-lg md:text-xl text-charcoal/80">
            สนุกสนานและผ่อนคลายไปกับกิจกรรมหลากหลาย
          </p>
          <Badge variant="info" size="md" className="mt-3 text-base px-4 py-2">
            19:00 - 23:00 น.
          </Badge>
        </motion.div>

        {/* Activity grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          {EVENING_ACTIVITIES.map((activity) => (
            <motion.div
              key={activity.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mb-4 text-terracotta">
                  {iconMap[activity.icon]}
                </div>
                <h3 className="font-kanit text-lg md:text-xl font-semibold text-charcoal mb-2">
                  {activity.title}
                </h3>
                <p className="font-sarabun text-sm md:text-base text-charcoal/70">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Photo corner section */}
        <motion.div
          className="bg-gradient-to-r from-sage/20 to-terracotta/20 rounded-xl p-6 md:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-terracotta/20 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-terracotta" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest mb-3 flex items-center gap-2">
                มุมถ่ายรูป
                <Sparkles className="w-5 h-5 text-terracotta" />
              </h3>
              <p className="font-sarabun text-base md:text-lg text-charcoal/80 mb-3">
                จัดมุมถ่ายรูปสวย ๆ ริมสระและในวิลล่า บันทึกความทรงจำดี ๆ ไว้ด้วยกัน
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" size="sm">
                  📸 ริมสระว่ายน้ำ
                </Badge>
                <Badge variant="default" size="sm">
                  🌙 บรรยากาศยามค่ำ
                </Badge>
                <Badge variant="default" size="sm">
                  👥 รูปกลุ่ม
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Safety and guidelines section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Safety notes */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 md:p-8 border-l-4 border-terracotta"
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-terracotta" />
                </div>
              </div>
              <div>
                <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest mb-2">
                  ข้อควรระวัง
                </h3>
                <p className="font-sarabun text-sm text-charcoal/60">
                  เพื่อความปลอดภัยของทุกคน
                </p>
              </div>
            </div>
            <ul className="space-y-3 font-sarabun text-base text-charcoal/80">
              <li className="flex items-start gap-3">
                <span className="text-terracotta mt-1">•</span>
                <span>
                  <strong>สระว่ายน้ำ:</strong> ไม่ว่ายน้ำตอนเมา ปิดไฟสระเวลา 22:00 น.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-terracotta mt-1">•</span>
                <span>
                  <strong>เสียงดัง:</strong> ลดระดับเสียงหลัง 22:00 น. เพื่อเพื่อนบ้าน
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-terracotta mt-1">•</span>
                <span>
                  <strong>ไฟฟ้า:</strong> ระวังการใช้ไฟฟ้าในพื้นที่เปียก
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-terracotta mt-1">•</span>
                <span>
                  <strong>ปิ้งย่าง:</strong> ใช้พื้นที่ที่กำหนด ดับไฟให้เรียบร้อย
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-terracotta mt-1">•</span>
                <span>
                  <strong>เครื่องดื่ม:</strong> ดื่มอย่างมีสติ ดูแลกันและกัน
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Waste and recycling guidelines */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 md:p-8 border-l-4 border-sage"
            initial={{ opacity: 0, x: 20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                  <Recycle className="w-6 h-6 text-sage" />
                </div>
              </div>
              <div>
                <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest mb-2">
                  การจัดการขยะ
                </h3>
                <p className="font-sarabun text-sm text-charcoal/60">
                  ช่วยกันรักษาความสะอาด
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-sage/10 rounded-lg flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-sage" />
                </div>
                <div className="flex-1">
                  <h4 className="font-kanit text-base font-semibold text-charcoal mb-1">
                    ขยะรีไซเคิล
                  </h4>
                  <p className="font-sarabun text-sm text-charcoal/70">
                    ขวดพลาสติก กระป๋อง กระดาษ
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-terracotta/10 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-terracotta" />
                </div>
                <div className="flex-1">
                  <h4 className="font-kanit text-base font-semibold text-charcoal mb-1">
                    ขยะทั่วไป
                  </h4>
                  <p className="font-sarabun text-sm text-charcoal/70">
                    เศษอาหาร ถุงพลาสติก ขยะอื่น ๆ
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-deepForest/10 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-deepForest" />
                </div>
                <div className="flex-1">
                  <h4 className="font-kanit text-base font-semibold text-charcoal mb-1">
                    ขยะอินทรีย์
                  </h4>
                  <p className="font-sarabun text-sm text-charcoal/70">
                    เศษผัก เศษผลไม้ (ถ้ามีถังแยก)
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-sage/10 rounded-lg">
                <p className="font-sarabun text-sm text-charcoal/80 text-center">
                  💚 ช่วยกันทิ้งขยะให้ถูกที่ เพื่อสิ่งแวดล้อม
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <p className="font-sarabun text-sm md:text-base text-charcoal/60">
            🌟 สนุกอย่างมีสติ ดูแลกันและกัน สร้างความทรงจำดี ๆ ไปด้วยกัน
          </p>
        </motion.div>
      </div>
    </div>
  );
}
