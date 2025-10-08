'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Beef,
  Package,
  Wine,
  Utensils,
  IceCream,
  Flame,
  Download,
  Clock,
  Users,
  ExternalLink,
} from 'lucide-react';
import { SHOPPING_CATEGORIES, EXTERNAL_LINKS } from '@/lib/constants';
import { SlideProps } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

// Icon mapping for shopping categories
const iconMap: Record<string, React.ReactNode> = {
  beef: <Beef className="w-6 h-6" />,
  package: <Package className="w-6 h-6" />,
  wine: <Wine className="w-6 h-6" />,
  utensils: <Utensils className="w-6 h-6" />,
  'ice-cream': <IceCream className="w-6 h-6" />,
  flame: <Flame className="w-6 h-6" />,
};

export default function Slide06({ isActive }: SlideProps) {
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
            ช้อปปิ้งที่ Makro
          </h2>
          <p className="font-sarabun text-lg md:text-xl text-charcoal/80 mb-4">
            หมวดหมู่สินค้าที่ต้องซื้อ
          </p>

          {/* Time and team info */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Badge variant="warning" size="md" className="text-base px-4 py-2">
              <Clock className="w-4 h-4 inline mr-2" />
              15:00 - 16:00 น.
            </Badge>
            <Badge variant="info" size="md" className="text-base px-4 py-2">
              <Users className="w-4 h-4 inline mr-2" />
              ทีมช้อปปิ้ง
            </Badge>
          </div>
        </motion.div>

        {/* Shopping categories table */}
        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-deepForest text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-kanit text-lg">
                    หมวดหมู่
                  </th>
                  <th className="px-6 py-4 text-left font-kanit text-lg">
                    รายละเอียด
                  </th>
                  <th className="px-6 py-4 text-center font-kanit text-lg">
                    ทีม
                  </th>
                </tr>
              </thead>
              <tbody>
                {SHOPPING_CATEGORIES.map((category, index) => (
                  <motion.tr
                    key={category.name}
                    className="border-b border-sage/20 hover:bg-sage/5 transition-colors"
                    variants={itemVariants}
                    initial="hidden"
                    animate={isActive ? 'visible' : 'hidden'}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-terracotta">
                          {iconMap[category.icon]}
                        </div>
                        <span className="font-kanit text-lg font-semibold text-charcoal">
                          {category.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-sarabun text-base text-charcoal/80">
                        {category.note}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant={index % 2 === 0 ? 'success' : 'info'}
                        size="sm"
                      >
                        ทีม {index % 2 === 0 ? 'A' : 'B'}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Download checklist section */}
        <motion.div
          className="bg-terracotta/10 border-2 border-terracotta/30 rounded-xl p-6 md:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta/20 rounded-full mb-4">
              <Download className="w-8 h-8 text-terracotta" />
            </div>
            <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-deepForest mb-3">
              รายการช้อปปิ้งแบบละเอียด
            </h3>
            <p className="font-sarabun text-base md:text-lg text-charcoal/80 mb-6">
              ดาวน์โหลดรายการสินค้าแบบละเอียดพร้อมปริมาณและราคาโดยประมาณ
            </p>
            <Button
              variant="primary"
              size="lg"
              href={EXTERNAL_LINKS.shoppingChecklist}
              icon={<ExternalLink className="w-5 h-5" />}
              className="inline-flex"
            >
              เปิด Google Sheets
            </Button>
          </div>
        </motion.div>

        {/* Tips section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          {/* Shopping tips */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="font-kanit text-xl font-semibold text-deepForest mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-terracotta" />
              เคล็ดลับการช้อปปิ้ง
            </h3>
            <ul className="font-sarabun text-base text-charcoal/80 space-y-2">
              <li>• แบ่งทีมช้อปตามหมวดหมู่เพื่อความรวดเร็ว</li>
              <li>• เช็ครายการใน Google Sheets ก่อนออกเดินทาง</li>
              <li>• ซื้อของแห้งและเครื่องดื่มก่อน</li>
              <li>• ซื้อของสดและเนื้อสัตว์ทีหลัง</li>
              <li>• อย่าลืมถุงน้ำแข็งสำหรับเก็บของสด</li>
            </ul>
          </motion.div>

          {/* Budget info */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="font-kanit text-xl font-semibold text-deepForest mb-4 flex items-center gap-2">
              <Wine className="w-5 h-5 text-terracotta" />
              ข้อมูลเพิ่มเติม
            </h3>
            <ul className="font-sarabun text-base text-charcoal/80 space-y-2">
              <li>• งบประมาณโดยประมาณ: 5,000-7,000 บาท</li>
              <li>• แบ่งจ่ายกันเท่า ๆ กันหลังช้อปเสร็จ</li>
              <li>• เก็บใบเสร็จไว้เคลียร์ค่าใช้จ่าย</li>
              <li>• มีรถเข็นและถุงช้อปปิ้งเพียงพอ</li>
              <li>• ใช้เวลาประมาณ 45-60 นาที</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Additional note */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="font-sarabun text-sm md:text-base text-charcoal/60">
            💡 อย่าลืมเช็ครายการใน Google Sheets ก่อนออกเดินทางนะ!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
