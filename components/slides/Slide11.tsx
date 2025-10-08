'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, Layout, Layers } from 'lucide-react';
import { COLORS } from '@/lib/constants';
import { SlideProps } from '@/lib/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function Slide11({ isActive }: SlideProps) {
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
    <div className="relative w-full h-full overflow-auto bg-gradient-to-br from-white via-sand/30 to-sage/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta/10 rounded-full mb-4">
            <Layers className="w-8 h-8 text-terracotta" />
          </div>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-deepForest mb-3">
            Design System
          </h2>
          <p className="font-sarabun text-lg md:text-xl text-charcoal/80">
            ระบบออกแบบ Forest Terracotta สำหรับงานนำเสนอนี้
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          className="space-y-8 md:space-y-10"
        >
          {/* Color Palette Section */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-7 h-7 text-terracotta" />
                <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-deepForest">
                  Color Palette
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(COLORS).map(([name, hex]) => (
                  <div key={name} className="text-center">
                    <div
                      className="w-full aspect-square rounded-lg shadow-md mb-3 hover:scale-105 transition-transform cursor-pointer"
                      style={{ backgroundColor: hex }}
                    />
                    <p className="font-sarabun text-sm font-semibold text-charcoal capitalize">
                      {name.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="font-mono text-xs text-charcoal/60">{hex}</p>
                  </div>
                ))}
              </div>

              {/* Color Usage Examples */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-sand rounded-lg p-4 border-2 border-sand">
                  <p className="font-sarabun text-sm text-charcoal/80">
                    <strong className="text-deepForest">Sand Background:</strong> ใช้สำหรับพื้นหลังสไลด์หลัก
                  </p>
                </div>
                <div className="bg-sage/20 rounded-lg p-4 border-2 border-sage">
                  <p className="font-sarabun text-sm text-charcoal/80">
                    <strong className="text-deepForest">Sage Background:</strong> ใช้สำหรับสไลด์สลับ
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Typography Section */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Type className="w-7 h-7 text-terracotta" />
                <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-deepForest">
                  Typography Hierarchy
                </h3>
              </div>

              <div className="space-y-6">
                {/* Heading examples */}
                <div className="border-l-4 border-terracotta pl-4">
                  <h1 className="font-kanit text-4xl md:text-5xl font-bold text-charcoal mb-2">
                    Heading 1 - Kanit Bold
                  </h1>
                  <p className="font-mono text-xs text-charcoal/60">
                    font-kanit text-4xl md:text-5xl font-bold
                  </p>
                </div>

                <div className="border-l-4 border-sage pl-4">
                  <h2 className="font-kanit text-3xl md:text-4xl font-semibold text-charcoal mb-2">
                    Heading 2 - Kanit Semibold
                  </h2>
                  <p className="font-mono text-xs text-charcoal/60">
                    font-kanit text-3xl md:text-4xl font-semibold
                  </p>
                </div>

                <div className="border-l-4 border-deepForest pl-4">
                  <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-charcoal mb-2">
                    Heading 3 - Kanit Semibold
                  </h3>
                  <p className="font-mono text-xs text-charcoal/60">
                    font-kanit text-2xl md:text-3xl font-semibold
                  </p>
                </div>

                <div className="border-l-4 border-charcoal/30 pl-4">
                  <p className="font-sarabun text-base md:text-lg text-charcoal/80 mb-2">
                    Body Text - Sarabun Regular: ใช้สำหรับเนื้อหาหลักและคำอธิบายต่าง ๆ 
                    ให้ความรู้สึกอ่านง่ายและเป็นมิตร เหมาะกับภาษาไทย
                  </p>
                  <p className="font-mono text-xs text-charcoal/60">
                    font-sarabun text-base md:text-lg
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Button Styles Section */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Layout className="w-7 h-7 text-terracotta" />
                <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-deepForest">
                  Button Styles
                </h3>
              </div>

              <div className="space-y-6">
                {/* Primary Button */}
                <div>
                  <p className="font-sarabun text-sm text-charcoal/70 mb-3">
                    <strong>Primary Button:</strong> ใช้สำหรับ Call-to-Action หลัก
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" size="sm">Small Primary</Button>
                    <Button variant="primary" size="md">Medium Primary</Button>
                    <Button variant="primary" size="lg">Large Primary</Button>
                  </div>
                </div>

                {/* Secondary Button */}
                <div>
                  <p className="font-sarabun text-sm text-charcoal/70 mb-3">
                    <strong>Secondary Button:</strong> ใช้สำหรับ Action รอง
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary" size="sm">Small Secondary</Button>
                    <Button variant="secondary" size="md">Medium Secondary</Button>
                    <Button variant="secondary" size="lg">Large Secondary</Button>
                  </div>
                </div>

                {/* Ghost Button */}
                <div>
                  <p className="font-sarabun text-sm text-charcoal/70 mb-3">
                    <strong>Ghost Button:</strong> ใช้สำหรับ Action เสริม
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="ghost" size="sm">Small Ghost</Button>
                    <Button variant="ghost" size="md">Medium Ghost</Button>
                    <Button variant="ghost" size="lg">Large Ghost</Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Component Examples - 3 Mockup Slides */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-deepForest mb-6">
                Component Examples
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mockup 1: Card Component */}
                <div className="border-2 border-sage/30 rounded-lg p-4 bg-sand/20">
                  <p className="font-sarabun text-xs font-semibold text-deepForest mb-3 uppercase tracking-wide">
                    Card Component
                  </p>
                  <Card
                    title="Activity Card"
                    description="คำอธิบายกิจกรรมสั้น ๆ"
                    icon={<Palette className="w-5 h-5 text-terracotta" />}
                  />
                </div>

                {/* Mockup 2: Badge Component */}
                <div className="border-2 border-terracotta/30 rounded-lg p-4 bg-terracotta/5">
                  <p className="font-sarabun text-xs font-semibold text-deepForest mb-3 uppercase tracking-wide">
                    Badge Component
                  </p>
                  <div className="space-y-3">
                    <Badge variant="default">Default Badge</Badge>
                    <Badge variant="success">Success Badge</Badge>
                    <Badge variant="warning">Warning Badge</Badge>
                    <Badge variant="info">Info Badge</Badge>
                  </div>
                </div>

                {/* Mockup 3: Grid Layout */}
                <div className="border-2 border-deepForest/30 rounded-lg p-4 bg-deepForest/5">
                  <p className="font-sarabun text-xs font-semibold text-deepForest mb-3 uppercase tracking-wide">
                    Grid Layout
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-sage/40 rounded h-12"></div>
                    <div className="bg-terracotta/40 rounded h-12"></div>
                    <div className="bg-terracotta/40 rounded h-12"></div>
                    <div className="bg-sage/40 rounded h-12"></div>
                  </div>
                  <div className="mt-3 h-1 bg-gradient-to-r from-sage via-terracotta to-deepForest rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grid and Divider Patterns */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-deepForest mb-6">
                Grid & Divider Patterns
              </h3>

              <div className="space-y-6">
                {/* Responsive Grid Demo */}
                <div>
                  <p className="font-sarabun text-sm text-charcoal/70 mb-3">
                    <strong>Responsive Grid:</strong> 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <div
                        key={num}
                        className="bg-gradient-to-br from-sage/20 to-terracotta/20 rounded-lg p-4 text-center"
                      >
                        <p className="font-kanit text-lg font-semibold text-deepForest">
                          Grid Item {num}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider Patterns */}
                <div>
                  <p className="font-sarabun text-sm text-charcoal/70 mb-3">
                    <strong>Divider Patterns:</strong> แบบต่าง ๆ ของเส้นแบ่ง
                  </p>
                  <div className="space-y-4">
                    <div className="h-px bg-charcoal/20"></div>
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-sage to-transparent"></div>
                    <div className="h-1 bg-gradient-to-r from-deepForest via-terracotta to-sage rounded-full"></div>
                    <div className="border-t-2 border-dashed border-terracotta/40"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Design Principles */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-br from-deepForest/5 to-terracotta/5 rounded-xl p-6 md:p-8 border-2 border-sage/30">
              <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest mb-4 text-center">
                Design Principles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-sarabun text-sm text-charcoal/80">
                    🎨 <strong>Nature-Inspired:</strong> สีสันจากธรรมชาติ สร้างความรู้สึกผ่อนคลาย
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-sarabun text-sm text-charcoal/80">
                    📱 <strong>Responsive:</strong> ใช้งานได้ดีทุกอุปกรณ์
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-sarabun text-sm text-charcoal/80">
                    ✨ <strong>Smooth Animations:</strong> การเคลื่อนไหวที่ลื่นไหล
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-sarabun text-sm text-charcoal/80">
                    ♿ <strong>Accessible:</strong> เข้าถึงได้ง่ายสำหรับทุกคน
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
