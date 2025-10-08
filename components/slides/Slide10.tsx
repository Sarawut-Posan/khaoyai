'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, Palette, Sparkles, ShoppingBag } from 'lucide-react';
import { IMAGE_URLS, DRESS_CODE_COLORS } from '@/lib/constants';
import { SlideProps } from '@/lib/types';
import Badge from '@/components/ui/Badge';

// Outfit images for lookbook
const OUTFIT_IMAGES = [
  IMAGE_URLS.outfit1,
  IMAGE_URLS.outfit2,
  IMAGE_URLS.outfit3,
  IMAGE_URLS.outfit4,
  IMAGE_URLS.outfit5,
  IMAGE_URLS.outfit6,
];

// Style suggestions
const STYLE_SUGGESTIONS = {
  women: [
    'เสื้อผ้าโทนสีเขียว น้ำตาล ครีม',
    'เดรสลายดอกไม้หรือลายธรรมชาติ',
    'กางเกงขายาวผ้าลินิน',
    'เสื้อเชิ้ตโอเวอร์ไซส์',
  ],
  men: [
    'เสื้อเชิ้ตโทนสีเขียว น้ำตาล',
    'เสื้อยืดสีพื้นหรือลายเรียบ',
    'กางเกงขายาวสีกากี หรือน้ำตาล',
    'เสื้อคอปกสไตล์ Casual',
  ],
};

// Props and accessories
const PROPS_IDEAS = [
  { icon: '🎩', name: 'หมวกสาน/หมวกปีกกว้าง' },
  { icon: '🕶️', name: 'แว่นกันแดด' },
  { icon: '👜', name: 'กระเป๋าผ้า Tote Bag' },
  { icon: '🧣', name: 'ผ้าพันคอ/ผ้าคลุมไหล่' },
  { icon: '👟', name: 'รองเท้าผ้าใบสีขาว/ครีม' },
  { icon: '💐', name: 'ดอกไม้แห้ง (ถ่ายรูป)' },
];

export default function Slide10({ isActive }: SlideProps) {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="relative w-full h-full overflow-auto bg-gradient-to-br from-sand via-white to-sage/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta/10 rounded-full mb-4">
            <Shirt className="w-8 h-8 text-terracotta" />
          </div>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-deepForest mb-3">
            Dress Code: Forest Terracotta Picnic
          </h2>
          <p className="font-sarabun text-lg md:text-xl text-charcoal/80 mb-3">
            แต่งกายโทนสีธรรมชาติ เพื่อรูปกลุ่มสวย ๆ
          </p>
          <Badge variant="info" size="md" className="text-base px-4 py-2">
            🌿 Nature-Inspired Style
          </Badge>
        </motion.div>

        {/* Color Palette Section */}
        <motion.div
          className="mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-deepForest mb-2 flex items-center justify-center gap-2">
              <Palette className="w-7 h-7 text-terracotta" />
              Color Palette
            </h3>
            <p className="font-sarabun text-base text-charcoal/70">
              โทนสีแนะนำสำหรับการแต่งกาย
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
            {DRESS_CODE_COLORS.map((color, index) => (
              <motion.div
                key={color.hex}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg mb-2 border-4 border-white hover:scale-110 transition-transform cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
                <p className="font-sarabun text-xs md:text-sm font-semibold text-charcoal">
                  {color.name}
                </p>
                <p className="font-mono text-xs text-charcoal/60">{color.hex}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Lookbook Grid */}
        <motion.div
          className="mb-10 md:mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          <div className="text-center mb-6">
            <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-deepForest mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-7 h-7 text-terracotta" />
              Outfit Inspiration
            </h3>
            <p className="font-sarabun text-base text-charcoal/70">
              ไอเดียการแต่งกายสไตล์ Forest Terracotta
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {OUTFIT_IMAGES.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                variants={imageVariants}
              >
                <img
                  src={image}
                  alt={`Outfit inspiration ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Style Suggestions - Men's and Women's */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Women's Style */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">👗</span>
              </div>
              <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest">
                สำหรับผู้หญิง
              </h3>
            </div>
            <ul className="space-y-3">
              {STYLE_SUGGESTIONS.women.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 font-sarabun text-base text-charcoal/80"
                >
                  <span className="text-sage text-xl flex-shrink-0">✓</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Men's Style */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-terracotta/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">👔</span>
              </div>
              <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest">
                สำหรับผู้ชาย
              </h3>
            </div>
            <ul className="space-y-3">
              {STYLE_SUGGESTIONS.men.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 font-sarabun text-base text-charcoal/80"
                >
                  <span className="text-terracotta text-xl flex-shrink-0">✓</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Props and Accessories */}
        <motion.div
          className="bg-gradient-to-br from-terracotta/5 to-sage/10 rounded-xl p-6 md:p-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-deepForest mb-2 flex items-center justify-center gap-2">
              <ShoppingBag className="w-7 h-7 text-terracotta" />
              Props & Accessories
            </h3>
            <p className="font-sarabun text-base text-charcoal/70">
              อุปกรณ์เสริมที่จะทำให้ลุคสมบูรณ์แบบ
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {PROPS_IDEAS.map((prop, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 1.1 + index * 0.05, duration: 0.3 }}
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl mb-2">{prop.icon}</div>
                  <p className="font-sarabun text-sm md:text-base text-charcoal/80">
                    {prop.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          className="text-center mt-8 bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <p className="font-sarabun text-base md:text-lg text-charcoal/80">
            💡 <strong className="text-deepForest">เคล็ดลับ:</strong> ไม่จำเป็นต้องซื้อชุดใหม่ 
            แค่เลือกเสื้อผ้าที่มีอยู่แล้วให้ตรงกับโทนสีก็สวยแล้ว!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
