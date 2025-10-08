'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Phone,
  Copy,
  Check,
  MapPin,
  ExternalLink,
  ChefHat,
  Waves,
  Mic,
  Sofa,
  Bed,
} from 'lucide-react';
import { VILLA_ZONES, HOUSE_RULES, EXTERNAL_LINKS, IMAGE_URLS } from '@/lib/constants';
import { SlideProps } from '@/lib/types';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import Badge from '@/components/ui/Badge';

// Icon mapping for villa zones
const iconMap: Record<string, React.ReactNode> = {
  'chef-hat': <ChefHat className="w-6 h-6" />,
  waves: <Waves className="w-6 h-6" />,
  mic: <Mic className="w-6 h-6" />,
  sofa: <Sofa className="w-6 h-6" />,
  bed: <Bed className="w-6 h-6" />,
};

export default function Slide07({ isActive }: SlideProps) {
  const [copied, setCopied] = useState(false);

  // Copy phone number to clipboard
  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(EXTERNAL_LINKS.villaPhone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Animation variants
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
    <div className="relative w-full h-full overflow-auto bg-sand/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-deepForest/10 rounded-full mb-4">
            <Home className="w-8 h-8 text-deepForest" />
          </div>
          <h2 className="font-kanit text-3xl md:text-4xl lg:text-5xl font-bold text-deepForest mb-3">
            เช็คอินวิลล่า
          </h2>
          <p className="font-sarabun text-lg md:text-xl text-charcoal/80">
            DN Poolvilla Khaoyai
          </p>
          <Badge variant="info" size="md" className="mt-3 text-base px-4 py-2">
            เช็คอิน 17:00 น.
          </Badge>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left column: Floor plan and zones */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Villa image */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="relative h-64 md:h-80">
                <img
                  src={IMAGE_URLS.villa}
                  alt="DN Poolvilla Khaoyai"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-kanit text-2xl font-bold text-white mb-1">
                    DN Poolvilla Khaoyai
                  </h3>
                  <p className="font-sarabun text-sm text-white/90">
                    วิลล่าส่วนตัว พร้อมสระว่ายน้ำและสิ่งอำนวยความสะดวกครบครัน
                  </p>
                </div>
              </div>
            </div>

            {/* Villa zones */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-terracotta" />
                พื้นที่ภายในวิลล่า
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VILLA_ZONES.map((zone, index) => (
                  <motion.div
                    key={zone.id}
                    className="flex items-start gap-3 p-4 bg-sage/10 rounded-lg hover:bg-sage/20 transition-colors"
                    variants={itemVariants}
                    initial="hidden"
                    animate={isActive ? 'visible' : 'hidden'}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 text-terracotta mt-1">
                      {iconMap[zone.icon]}
                    </div>
                    <div>
                      <h4 className="font-kanit text-lg font-semibold text-charcoal mb-1">
                        {zone.name}
                      </h4>
                      <p className="font-sarabun text-sm text-charcoal/70">
                        {zone.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column: Contact and info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-kanit text-xl md:text-2xl font-semibold text-deepForest mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-terracotta" />
                ติดต่อวิลล่า
              </h3>
              
              {/* Phone number with copy button */}
              <div className="bg-terracotta/10 border-2 border-terracotta/30 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-sarabun text-sm text-charcoal/70 mb-1">
                      เบอร์โทรศัพท์
                    </p>
                    <a
                      href={`tel:${EXTERNAL_LINKS.villaPhone}`}
                      className="font-kanit text-2xl font-bold text-deepForest hover:text-terracotta transition-colors"
                    >
                      {EXTERNAL_LINKS.villaPhone}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="flex-shrink-0 p-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-all hover:scale-105"
                    aria-label="Copy phone number"
                  >
                    {copied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-sarabun text-sm text-terracotta mt-2"
                  >
                    ✓ คัดลอกเบอร์แล้ว
                  </motion.p>
                )}
              </div>

              {/* Map button */}
              <Button
                variant="secondary"
                size="md"
                href={EXTERNAL_LINKS.villaMap}
                icon={<ExternalLink className="w-5 h-5" />}
                className="w-full"
              >
                เปิดแผนที่ Google Maps
              </Button>
            </div>

            {/* Check-in info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-kanit text-xl font-semibold text-deepForest mb-4">
                ข้อมูลการเข้าพัก
              </h3>
              <div className="space-y-3 font-sarabun text-base text-charcoal/80">
                <div className="flex items-start gap-3">
                  <span className="text-terracotta">•</span>
                  <div>
                    <span className="font-semibold">เช็คอิน:</span> 14:00 น. เป็นต้นไป
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-terracotta">•</span>
                  <div>
                    <span className="font-semibold">เช็คเอาท์:</span> 12:00 น.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-terracotta">•</span>
                  <div>
                    <span className="font-semibold">จำนวนผู้เข้าพัก:</span> 14 คน
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-terracotta">•</span>
                  <div>
                    <span className="font-semibold">ห้องนอน:</span> 5 ห้อง
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* House rules accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="font-kanit text-2xl md:text-3xl font-semibold text-deepForest mb-6 text-center">
            กฎและข้อตกลงของวิลล่า
          </h3>
          <Accordion
            items={HOUSE_RULES}
            allowMultiple={true}
            defaultOpen={['checkin']}
          />
        </motion.div>

        {/* Additional note */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="font-sarabun text-sm md:text-base text-charcoal/60">
            💡 กรุณาปฏิบัติตามกฎของวิลล่าเพื่อความสะดวกของทุกคน
          </p>
        </motion.div>
      </div>
    </div>
  );
}
