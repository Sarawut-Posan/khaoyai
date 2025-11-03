'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Filter,
  CheckCheck,
  RotateCcw,
  ChevronDown,
  Sparkles,
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
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

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

  const toggleAllInCategory = (categoryName: string, checkAll: boolean) => {
    const category = data?.makroChecklist?.find((c) => c.category === categoryName);
    if (!category) return;

    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      category.items.forEach((item) => {
        const key = `${categoryName}-${item.name}`;
        if (checkAll) {
          newSet.add(key);
        } else {
          newSet.delete(key);
        }
      });
      return newSet;
    });
  };

  const clearAllChecked = () => {
    setCheckedItems(new Set());
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

  const filteredCategories = useMemo(() => {
    if (!data?.makroChecklist) return [];
    if (selectedFilter === 'all') return data.makroChecklist;
    if (selectedFilter === 'completed') {
      return data.makroChecklist.filter((cat) => {
        const { checked, total } = getCategoryProgress(cat.category);
        return checked === total && total > 0;
      });
    }
    if (selectedFilter === 'incomplete') {
      return data.makroChecklist.filter((cat) => {
        const { checked, total } = getCategoryProgress(cat.category);
        return checked < total;
      });
    }
    return data.makroChecklist;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.makroChecklist, selectedFilter, checkedItems]);

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
    <div className="relative w-full h-full overflow-auto bg-gradient-to-br from-sage/5 via-sand/20 to-terracotta/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-10">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-terracotta/20 to-sage/20 rounded-2xl mb-3 shadow-lg">
            <ShoppingCart className="w-8 h-8 text-terracotta" />
          </div>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-deepForest mb-2">
            🛒 Checklist ช้อปปิ้ง Makro
          </h2>
          <p className="font-sarabun text-base md:text-lg text-charcoal/80 mb-4">
            รายการสินค้าสำหรับปาร์ตี้ปิ้งย่าง 15 คน
          </p>

          {/* Progress bar with celebration */}
          <div className="max-w-lg mx-auto mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sarabun text-sm text-charcoal/70 flex items-center gap-1">
                {progressPercent === 100 && <Sparkles className="w-4 h-4 text-terracotta" />}
                ความคืบหน้า
              </span>
              <span className="font-kanit text-sm font-semibold text-terracotta">
                {checkedCount}/{totalItems} รายการ ({progressPercent}%)
              </span>
            </div>
            <div className="relative w-full h-4 bg-sage/20 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className={`h-full ${
                  progressPercent === 100
                    ? 'bg-gradient-to-r from-sage via-terracotta to-sage bg-[length:200%_100%]'
                    : 'bg-gradient-to-r from-sage to-terracotta'
                }`}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${progressPercent}%`,
                  backgroundPosition: progressPercent === 100 ? ['0% 0%', '100% 0%'] : '0% 0%'
                }}
                transition={{ 
                  width: { duration: 0.5 },
                  backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' }
                }}
              />
              {progressPercent === 100 && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                >
                  <span className="text-white font-kanit text-xs font-bold">🎉 เสร็จสมบูรณ์!</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Info badges */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
            <Badge variant="warning" size="md" className="text-sm px-3 py-1.5">
              <Clock className="w-4 h-4 inline mr-1.5" />
              16:30 น.
            </Badge>
            <Badge variant="info" size="md" className="text-sm px-3 py-1.5">
              <Users className="w-4 h-4 inline mr-1.5" />
              15 คน
            </Badge>
            <Badge variant="default" size="md" className="text-sm px-3 py-1.5">
              💰 งบ 5,000-7,000 บาท
            </Badge>
          </div>
        </motion.div>

        {/* Filter and Quick Actions */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Filter buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-charcoal/60" />
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-sarabun text-sm transition-all ${
                selectedFilter === 'all'
                  ? 'bg-deepForest text-white shadow-md'
                  : 'bg-white text-charcoal/70 hover:bg-sage/10'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setSelectedFilter('incomplete')}
              className={`px-3 py-1.5 rounded-lg font-sarabun text-sm transition-all ${
                selectedFilter === 'incomplete'
                  ? 'bg-terracotta text-white shadow-md'
                  : 'bg-white text-charcoal/70 hover:bg-terracotta/10'
              }`}
            >
              ยังไม่เสร็จ
            </button>
            <button
              onClick={() => setSelectedFilter('completed')}
              className={`px-3 py-1.5 rounded-lg font-sarabun text-sm transition-all ${
                selectedFilter === 'completed'
                  ? 'bg-sage text-white shadow-md'
                  : 'bg-white text-charcoal/70 hover:bg-sage/10'
              }`}
            >
              เสร็จแล้ว
            </button>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={clearAllChecked}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-red-50 text-charcoal/70 hover:text-red-600 rounded-lg font-sarabun text-sm transition-all shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">ล้างทั้งหมด</span>
            </button>
          </div>
        </motion.div>

        {/* Checklist categories */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sage/10 rounded-full mb-4">
                  <CheckCircle2 className="w-8 h-8 text-sage" />
                </div>
                <p className="font-sarabun text-lg text-charcoal/60">
                  {selectedFilter === 'completed' ? 'ยังไม่มีหมวดหมู่ที่เสร็จสมบูรณ์' : 'ไม่พบรายการ'}
                </p>
              </div>
            ) : (
              filteredCategories.map((category, catIndex) => {
            const { checked, total } = getCategoryProgress(category.category);
            const isExpanded = expandedCategories.has(category.category);
            const categoryPercent = total > 0 ? Math.round((checked / total) * 100) : 0;

                return (
                  <motion.div
                    key={category.category}
                    className={`bg-white rounded-xl shadow-md overflow-hidden border-2 transition-all ${
                      checked === total && total > 0
                        ? 'border-sage/40 shadow-sage/20'
                        : 'border-transparent'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: catIndex * 0.08, duration: 0.5 }}
                    layout
                  >
                    {/* Category header */}
                    <div className="relative">
                      <button
                        onClick={() => toggleCategory(category.category)}
                        className="w-full px-4 md:px-6 py-4 flex items-center justify-between hover:bg-sage/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            checked === total && total > 0 ? 'bg-sage/20 text-sage' : 'bg-terracotta/10 text-terracotta'
                          }`}>
                            {iconMap[category.icon] || <Package className="w-5 h-5" />}
                          </div>
                          <div className="text-left">
                            <h3 className="font-kanit text-lg md:text-xl font-semibold text-deepForest flex items-center gap-2">
                              {category.category}
                              {checked === total && total > 0 && (
                                <CheckCircle2 className="w-5 h-5 text-sage" />
                              )}
                            </h3>
                            <p className="font-sarabun text-sm text-charcoal/60">
                              {checked}/{total} รายการ
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="hidden sm:block w-20 md:w-24 h-2 bg-sage/20 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${
                                checked === total && total > 0 ? 'bg-sage' : 'bg-terracotta'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${categoryPercent}%` }}
                              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                            />
                          </div>
                          <Badge
                            variant={checked === total ? 'success' : 'default'}
                            size="sm"
                            className="min-w-[3rem] justify-center"
                          >
                            {categoryPercent}%
                          </Badge>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5 text-charcoal/60" />
                          </motion.div>
                        </div>
                      </button>

                      {/* Quick check/uncheck all for category */}
                      {isExpanded && (
                        <div className="absolute top-2 right-2 z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAllInCategory(category.category, checked < total);
                            }}
                            className="p-1.5 bg-white hover:bg-sage/10 rounded-lg shadow-sm transition-all"
                            title={checked === total ? 'ยกเลิกทั้งหมด' : 'เลือกทั้งหมด'}
                          >
                            <CheckCheck className={`w-4 h-4 ${checked === total ? 'text-sage' : 'text-charcoal/40'}`} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Category items */}
                    <AnimatePresence>
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
                                  className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all border ${
                                    isChecked
                                      ? 'bg-sage/10 hover:bg-sage/15 border-sage/30'
                                      : 'bg-sand/30 hover:bg-sand/50 border-transparent'
                                  }`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: itemIndex * 0.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div className="flex-shrink-0 mt-0.5">
                                    <motion.div
                                      initial={false}
                                      animate={{ scale: isChecked ? [1, 1.2, 1] : 1 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      {isChecked ? (
                                        <CheckCircle2 className="w-5 h-5 text-sage" />
                                      ) : (
                                        <Circle className="w-5 h-5 text-charcoal/30" />
                                      )}
                                    </motion.div>
                                  </div>
                                  <div className="flex-1 text-left">
                                    <div className="flex items-start justify-between gap-2">
                                      <span
                                        className={`font-sarabun text-sm md:text-base transition-all ${
                                          isChecked
                                            ? 'text-charcoal/60 line-through'
                                            : 'text-charcoal font-medium'
                                        }`}
                                      >
                                        {item.name}
                                      </span>
                                      <span className={`font-kanit text-sm font-semibold whitespace-nowrap ${
                                        isChecked ? 'text-sage' : 'text-terracotta'
                                      }`}>
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
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tips section */}
        <motion.div
          className="mt-6 bg-gradient-to-br from-terracotta/10 to-sage/10 border-2 border-terracotta/30 rounded-xl p-5 md:p-7 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-terracotta/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-terracotta" />
            </div>
            <div>
              <h3 className="font-kanit text-lg md:text-xl font-semibold text-deepForest mb-1">
                💡 เคล็ดลับการช้อปปิ้ง
              </h3>
              <p className="font-sarabun text-sm text-charcoal/70">
                ช้อปให้รวดเร็วและครบถ้วน
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 bg-white/50 p-3 rounded-lg">
              <span className="text-terracotta font-bold">1.</span>
              <span className="font-sarabun text-sm text-charcoal/80">
                แบ่งทีมช้อปตามหมวดหมู่เพื่อความรวดเร็ว
              </span>
            </div>
            <div className="flex items-start gap-2 bg-white/50 p-3 rounded-lg">
              <span className="text-terracotta font-bold">2.</span>
              <span className="font-sarabun text-sm text-charcoal/80">
                ซื้อของแห้งและเครื่องดื่มก่อน ของสดทีหลัง
              </span>
            </div>
            <div className="flex items-start gap-2 bg-white/50 p-3 rounded-lg">
              <span className="text-terracotta font-bold">3.</span>
              <span className="font-sarabun text-sm text-charcoal/80">
                อย่าลืมถุงน้ำแข็งสำหรับเก็บของสด
              </span>
            </div>
            <div className="flex items-start gap-2 bg-white/50 p-3 rounded-lg">
              <span className="text-terracotta font-bold">4.</span>
              <span className="font-sarabun text-sm text-charcoal/80">
                ตรวจสอบวันหมดอายุก่อนซื้อ
              </span>
            </div>
          </div>
        </motion.div>

        {/* Summary card */}
        {progressPercent === 100 && (
          <motion.div
            className="mt-4 bg-gradient-to-r from-sage to-terracotta text-white rounded-xl p-6 text-center shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 0.3 }}
          >
            <Sparkles className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-kanit text-xl md:text-2xl font-bold mb-1">
              🎉 เยี่ยมมาก! เช็คลิสต์ครบแล้ว
            </h3>
            <p className="font-sarabun text-sm md:text-base opacity-90">
              พร้อมออกเดินทางไปช้อปปิ้งที่ Makro แล้ว!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
