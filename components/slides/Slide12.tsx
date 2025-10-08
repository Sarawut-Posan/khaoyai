'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle, 
  MapPin, 
  FileSpreadsheet, 
  Phone,
  Share2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useQRCode } from 'next-qrcode';
import { SlideProps } from '@/lib/types';
import { CHECKLIST_ITEMS, EXTERNAL_LINKS } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function Slide12({ isActive }: SlideProps) {
  const { Canvas } = useQRCode();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Toggle checklist item
  const toggleItem = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Check if all items are checked
  const allChecked = checkedItems.size === CHECKLIST_ITEMS.length;

  // Handle confirmation
  const handleConfirmation = () => {
    if (allChecked) {
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    }
  };

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
    <div className="relative w-full h-full overflow-auto bg-gradient-to-br from-sage/10 via-white to-terracotta/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta/10 rounded-full mb-4">
            <CheckCircle2 className="w-8 h-8 text-terracotta" />
          </div>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-deepForest mb-3">
            เช็คลิสต์ก่อนออกเดินทาง
          </h2>
          <p className="font-sarabun text-lg md:text-xl text-charcoal/80">
            เตรียมตัวให้พร้อมสำหรับทริปสุดพิเศษ!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left Column: Checklist */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-deepForest mb-6">
                สิ่งที่ต้องเตรียม
              </h3>

              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-sarabun text-sm text-charcoal/70">
                    ความคืบหน้า
                  </span>
                  <span className="font-sarabun text-sm font-semibold text-terracotta">
                    {checkedItems.size}/{CHECKLIST_ITEMS.length}
                  </span>
                </div>
                <div className="w-full h-2 bg-sand rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sage to-terracotta"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${(checkedItems.size / CHECKLIST_ITEMS.length) * 100}%` 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Checklist items */}
              <div className="space-y-3">
                {CHECKLIST_ITEMS.map((item) => {
                  const isChecked = checkedItems.has(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      className={`
                        flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer
                        transition-all duration-300
                        ${isChecked 
                          ? 'bg-sage/10 border-sage' 
                          : 'bg-white border-charcoal/10 hover:border-sage/50'
                        }
                      `}
                      onClick={() => toggleItem(item.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-6 h-6 text-sage flex-shrink-0" />
                      ) : (
                        <Circle className="w-6 h-6 text-charcoal/30 flex-shrink-0" />
                      )}
                      <span 
                        className={`
                          font-sarabun text-base md:text-lg
                          ${isChecked 
                            ? 'text-charcoal/70 line-through' 
                            : 'text-charcoal'
                          }
                        `}
                      >
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Confirmation button */}
              <div className="mt-6">
                <Button
                  variant={allChecked ? 'primary' : 'secondary'}
                  size="lg"
                  onClick={handleConfirmation}
                  disabled={!allChecked}
                  className="w-full"
                >
                  <Sparkles className="w-5 h-5" />
                  {allChecked ? 'พร้อมแล้ว!' : 'เช็คให้ครบก่อนนะ'}
                </Button>
              </div>

              {/* Confirmation message */}
              {showConfirmation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 bg-gradient-to-r from-sage/20 to-terracotta/20 rounded-lg border-2 border-sage"
                >
                  <p className="font-sarabun text-center text-deepForest font-semibold">
                    🎉 เยี่ยมเลย! พร้อมออกเดินทางแล้ว!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right Column: QR Codes and Resources */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* QR Codes Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-deepForest mb-6">
                QR Codes สำหรับเข้าถึงง่าย
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Villa Map QR */}
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg border-2 border-sage/30 inline-block">
                    <Canvas
                      text={EXTERNAL_LINKS.villaMap}
                      options={{
                        errorCorrectionLevel: 'M',
                        margin: 1,
                        scale: 4,
                        width: 150,
                        color: {
                          dark: '#2F6B3C',
                          light: '#FFFFFF',
                        },
                      }}
                    />
                  </div>
                  <div className="mt-3">
                    <MapPin className="w-5 h-5 text-terracotta mx-auto mb-1" />
                    <p className="font-sarabun text-sm font-semibold text-charcoal">
                      แผนที่วิลล่า
                    </p>
                    <p className="font-sarabun text-xs text-charcoal/60">
                      DN Poolvilla Khaoyai
                    </p>
                  </div>
                </div>

                {/* Shopping Checklist QR */}
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg border-2 border-terracotta/30 inline-block">
                    <Canvas
                      text={EXTERNAL_LINKS.shoppingChecklist}
                      options={{
                        errorCorrectionLevel: 'M',
                        margin: 1,
                        scale: 4,
                        width: 150,
                        color: {
                          dark: '#D17A47',
                          light: '#FFFFFF',
                        },
                      }}
                    />
                  </div>
                  <div className="mt-3">
                    <FileSpreadsheet className="w-5 h-5 text-terracotta mx-auto mb-1" />
                    <p className="font-sarabun text-sm font-semibold text-charcoal">
                      รายการช้อปปิ้ง
                    </p>
                    <p className="font-sarabun text-xs text-charcoal/60">
                      Google Sheets
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Links */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest mb-4">
                ลิงก์สำคัญ
              </h3>

              <div className="space-y-3">
                {/* Villa Map */}
                <a
                  href={EXTERNAL_LINKS.villaMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border-2 border-charcoal/10 hover:border-sage hover:bg-sage/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-sage" />
                    <span className="font-sarabun text-sm md:text-base text-charcoal">
                      แผนที่วิลล่า
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-charcoal/40 group-hover:text-sage" />
                </a>

                {/* Thong Somboon Map */}
                <a
                  href={EXTERNAL_LINKS.thongSomboonMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border-2 border-charcoal/10 hover:border-sage hover:bg-sage/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-sage" />
                    <span className="font-sarabun text-sm md:text-base text-charcoal">
                      Thong Somboon Club
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-charcoal/40 group-hover:text-sage" />
                </a>

                {/* Makro Map */}
                <a
                  href={EXTERNAL_LINKS.makroMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border-2 border-charcoal/10 hover:border-sage hover:bg-sage/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-sage" />
                    <span className="font-sarabun text-sm md:text-base text-charcoal">
                      Makro ปากช่อง
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-charcoal/40 group-hover:text-sage" />
                </a>

                {/* Shopping Checklist */}
                <a
                  href={EXTERNAL_LINKS.shoppingChecklist}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border-2 border-charcoal/10 hover:border-terracotta hover:bg-terracotta/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-terracotta" />
                    <span className="font-sarabun text-sm md:text-base text-charcoal">
                      รายการช้อปปิ้ง
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-charcoal/40 group-hover:text-terracotta" />
                </a>

                {/* Villa Phone */}
                <a
                  href={`tel:${EXTERNAL_LINKS.villaPhone}`}
                  className="flex items-center justify-between p-3 rounded-lg border-2 border-charcoal/10 hover:border-terracotta hover:bg-terracotta/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-terracotta" />
                    <span className="font-sarabun text-sm md:text-base text-charcoal">
                      โทรวิลล่า: {EXTERNAL_LINKS.villaPhone}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-charcoal/40 group-hover:text-terracotta" />
                </a>
              </div>
            </div>

            {/* Social Share Section */}
            <div className="bg-gradient-to-br from-sage/10 to-terracotta/10 rounded-xl p-6 border-2 border-sage/30">
              <div className="text-center">
                <Share2 className="w-8 h-8 text-terracotta mx-auto mb-3" />
                <h4 className="font-kanit text-lg md:text-xl font-semibold text-deepForest mb-2">
                  แชร์ความสนุกกัน!
                </h4>
                <p className="font-sarabun text-sm text-charcoal/70 mb-4">
                  อย่าลืมแชร์รูปสวย ๆ ในทริปนี้กันนะ
                </p>
                <div className="flex justify-center gap-3">
                  <Button variant="ghost" size="sm">
                    📸 Instagram
                  </Button>
                  <Button variant="ghost" size="sm">
                    💬 Line
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="inline-block bg-white rounded-xl shadow-md px-8 py-6 border-2 border-sage/30">
            <p className="font-kanit text-2xl md:text-3xl font-bold text-deepForest mb-2">
              ขอให้สนุกกับทริปนี้! 🌲🎉
            </p>
            <p className="font-sarabun text-base md:text-lg text-charcoal/70">
              เจอกันที่เขาใหญ่ วันเสาร์ที่ 8 พฤศจิกายน 2568
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
