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
  Clock
} from 'lucide-react';
import { ACTIVITIES } from '@/lib/constants';
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
            กิจกรรมหลัก
          </h2>
          <p className="font-sarabun text-lg md:text-xl text-charcoal/80 mb-4">
            Thong Somboon Club - เลือกกิจกรรมที่ชอบ
          </p>
          
          {/* Team split indicator */}
          <div className="flex items-center justify-center gap-3">
            <Badge variant="info" size="md" className="text-base px-4 py-2">
              <Users className="w-4 h-4 inline mr-2" />
              แบ่งทีม 7 + 7 คน
            </Badge>
            <Badge variant="warning" size="md" className="text-base px-4 py-2">
              <Clock className="w-4 h-4 inline mr-2" />
              10:00 - 13:00 น.
            </Badge>
          </div>
        </motion.div>

        {/* Activity cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          {ACTIVITIES.map((activity) => (
            <motion.div key={activity.id} variants={itemVariants}>
              <Card
                title={activity.title}
                description={activity.description}
                image={activity.image}
                icon={activity.icon ? iconMap[activity.icon] : undefined}
              />
            </motion.div>
          ))}
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
              <li>• จองกิจกรรมล่วงหน้าเพื่อหลีกเลี่ยงคิว</li>
              <li>• แต่ละกิจกรรมใช้เวลาประมาณ 30-45 นาที</li>
              <li>• สามารถเล่นได้หลายกิจกรรมตามเวลาที่มี</li>
              <li>• มีล็อกเกอร์ฝากของ และห้องน้ำบริการ</li>
              <li>• แนะนำให้สวมรองเท้าผ้าใบ</li>
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
              <li>• เลือกกิจกรรมในร่ม (ยิงธนู, Paintball)</li>
              <li>• ไปช้อปปิ้งที่ Makro ก่อนเวลา</li>
              <li>• เช็คอินวิลล่าเร็วขึ้นและทำกิจกรรมที่วิลล่า</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Additional note */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="font-sarabun text-sm md:text-base text-charcoal/60">
            💡 อย่าลืมถ่ายรูปเก็บความทรงจำกันเยอะ ๆ นะ!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
