'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Beef,
  Package,
  Wine,
  Utensils,
  IceCream,
  Flame,
  Clock,
  Users,
  CheckCircle2,
  Circle,
  Leaf,
  ShoppingCart,
} from 'lucide-react';
import { SlideProps } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import { useContentData } from '@/lib/hooks/useContentData';

// Icon mapping for categories
const iconMap: Record<string, React.ReactNode> = {
  beef: <Beef className="w-5 h-5" />,
  package: <Package className="w-5 h-5" />,
  wine: <Wine className="w-5 h-5" />,
  utensils: <Utensils className="w-5 h-5" />,
  'ice-cream': <IceCream className="w-5 h-5" />,
  flame: <Flame className="w-5 h-5" />,
  leaf: <Leaf className="w-5 h-5" />,
};

export default function Slide06({ isActive }: SlideProps) {
  const data = useContentData();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['โปรตีน']));

  const toggleItem = (categoryName: string, itemName: string) => {
    const key = `${categoryName}-${itemName}`;
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const getCategoryProgress = (categoryName: string) => {
    const category = data?.makroChecklist?.find((c) => c.category === categoryName);
    if (!category) return { checked: 0, total: 0 };
    
    const total = category.items.length;
    const checked = category.items.filter((item) => 
      checkedItems.has(`${categoryName}-${item.name}`)
    ).length;
    
    return { checked, total };
  };

  if (!data?.makroChecklist) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-sage/10">
        <p className="font-sarabun text-lg text-charcoal/60">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  const totalItems = data.makroChecklist.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = checkedItems.size;
  const progressPercent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <div className="relative w-full h-full overflow-auto bg-gradient-to-br from-sage/5 to-sand/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-10">
        {/* Header */}
        <motion.div
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-terracotta/10 rounded-full mb-3">
            <ShoppingCart className="w-7 h-7 text-terracotta" />
          </div>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-deepForest mb-2">
            Checklist ช้อปปิ้ง Makro
          </h2>
          <p className="font-sarabun text-base md:text-lg text-charcoal/80 mb-3">
            รายการสินค้าสำหรับ 15 คน
          </p>

          {/* Progress bar */}
          <div className="max-w-md mx-auto mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sarabun text-sm text-charcoal/70">
                ความคืบหน้า
              </span>
              <span className="font-kanit text-sm font-semibold text-terracotta">
                {checkedCount}/{totalItems} รายการ ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-3 bg-sage/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-sage to-terracotta"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Time and team info */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Badge variant="warning" size="md" className="text-sm px-3 py-1.5">
              <Clock className="w-4 h-4 inline mr-1.5" />
              17:00 น.
            </Badge>
            <Badge variant="info" size="md" className="text-sm px-3 py-1.5">
              <Users className="w-4 h-4 inline mr-1.5" />
              15 คน
            </Badge>
          </div>
        </motion.div>

        {/* Checklist categories */}
        <div className="space-y-4">
          {data.makroChecklist.map((category, catIndex) => {
            const { checked, total } = getCategoryProgress(category.category);
            const isExpanded = expandedCategories.has(category.category);
            const categoryPercent = total > 0 ? Math.round((checked / total) * 100) : 0;

            return (
              <motion.div
                key={category.category}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              >
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="w-full px-4 md:px-6 py-4 flex items-center justify-between hover:bg-sage/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-terracotta">
                      {iconMap[category.icon] || <Package className="w-5 h-5" />}
                    </div>
                    <div className="text-left">
                      <h3 className="font-kanit text-lg md:text-xl font-semibold text-deepForest">
                        {category.category}
                      </h3>
                      <p className="font-sarabun text-sm text-charcoal/60">
                        {checked}/{total} รายการ
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block w-24 h-2 bg-sage/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-terracotta transition-all duration-300"
                        style={{ width: `${categoryPercent}%` }}
                      />
                    </div>
                    <Badge
                      variant={checked === total ? 'success' : 'default'}
                      size="sm"
                    >
                      {categoryPercent}%
                    </Badge>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-5 h-5 text-charcoal/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </button>

                {/* Category items */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-sage/20"
                  >
                    <div className="p-4 md:p-6 space-y-2">
                      {category.items.map((item, itemIndex) => {
                        const itemKey = `${category.category}-${item.name}`;
                        const isChecked = checkedItems.has(itemKey);

                        return (
                          <motion.button
                            key={itemIndex}
                            onClick={() => toggleItem(category.category, item.name)}
                            className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all ${
                              isChecked
                                ? 'bg-sage/10 hover:bg-sage/15'
                                : 'bg-sand/30 hover:bg-sand/50'
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIndex * 0.03 }}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              {isChecked ? (
                                <CheckCircle2 className="w-5 h-5 text-sage" />
                              ) : (
                                <Circle className="w-5 h-5 text-charcoal/30" />
                              )}
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex items-start justify-between gap-2">
                                <span
                                  className={`font-sarabun text-sm md:text-base ${
                                    isChecked
                                      ? 'text-charcoal/60 line-through'
                                      : 'text-charcoal font-medium'
                                  }`}
                                >
                                  {item.name}
                                </span>
                                <span className="font-kanit text-sm text-terracotta font-semibold whitespace-nowrap">
                                  {item.minQty === item.maxQty
                                    ? `${item.minQty} ${item.unit}`
                                    : `${item.minQty}-${item.maxQty} ${item.unit}`}
                                </span>
                              </div>
                              {item.notes && (
                                <p className="font-sarabun text-xs text-charcoal/60 mt-1">
                                  💡 {item.notes}
                                </p>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Tips section */}
        <motion.div
          className="mt-6 bg-terracotta/10 border-2 border-terracotta/30 rounded-xl p-4 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="font-kanit text-lg md:text-xl font-semibold text-deepForest mb-3 flex items-center gap-2">
            <Package className="w-5 h-5 text-terracotta" />
            เคล็ดลับการช้อปปิ้ง
          </h3>
          <ul className="font-sarabun text-sm md:text-base text-charcoal/80 space-y-2">
            <li>• แบ่งทีมช้อปตามหมวดหมู่เพื่อความรวดเร็ว</li>
            <li>• ซื้อของแห้งและเครื่องดื่มก่อน ของสดและเนื้อสัตว์ทีหลัง</li>
            <li>• อย่าลืมถุงน้ำแข็งสำหรับเก็บของสด</li>
            <li>• งบประมาณโดยประมาณ: 5,000-7,000 บาท</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
