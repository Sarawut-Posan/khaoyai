'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import { ImageUrls } from '@/lib/types';
import { Loader2, Save, AlertCircle } from 'lucide-react';

interface ImageConfig {
  key: string;
  label: string;
  category: string;
  aspectRatio?: string;
}

const IMAGE_CONFIGS: ImageConfig[] = [
  { key: 'hero', label: 'รูปหน้าปก (Hero)', category: 'main', aspectRatio: 'aspect-[21/9]' },
  { key: 'villa', label: 'รูปวิลล่า', category: 'main' },
  { key: 'villaPool', label: 'รูปสระว่ายน้ำวิลล่า', category: 'main' },
  { key: 'villaInterior', label: 'รูปภายในวิลล่า', category: 'main' },
  { key: 'thongsomboonMain', label: 'รูป Thongsomboon Club', category: 'activities' },
  { key: 'atv', label: 'รูป ATV', category: 'activities' },
  { key: 'zipline', label: 'รูป Zipline', category: 'activities' },
  { key: 'luge', label: 'รูป Luge', category: 'activities' },
  { key: 'goKart', label: 'รูป Go Kart', category: 'activities' },
  { key: 'paintball', label: 'รูป Paintball', category: 'activities' },
  { key: 'archery', label: 'รูป Archery', category: 'activities' },
  { key: 'horseRiding', label: 'รูป Horse Riding', category: 'activities' },
  { key: 'rafting', label: 'รูป Rafting', category: 'activities' },
  { key: 'buggy', label: 'รูป Buggy', category: 'activities' },
  { key: 'midwinter', label: 'รูป Midwinter Green', category: 'restaurants' },
  { key: 'chocolate', label: 'รูป Chocolate Factory', category: 'restaurants' },
  { key: 'kruaKhaoYai', label: 'รูป Krua Khao Yai', category: 'restaurants' },
];

export default function ImagesPage() {
  const [imageUrls, setImageUrls] = useState<ImageUrls>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      
      if (data.success) {
        setImageUrls(data.data.imageUrls || {});
      } else {
        setError('โหลดข้อมูลไม่สำเร็จ');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (key: string, url: string) => {
    setImageUrls(prev => ({
      ...prev,
      [key]: url
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Load current data
      const response = await fetch('/api/data');
      const currentData = await response.json();

      if (!currentData.success) {
        throw new Error('โหลดข้อมูลไม่สำเร็จ');
      }

      // Update imageUrls
      const updatedData = {
        ...currentData.data,
        imageUrls,
        lastModified: new Date().toISOString()
      };

      // Save
      const saveResponse = await fetch('/api/data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const saveResult = await saveResponse.json();

      if (!saveResult.success) {
        throw new Error(saveResult.error || 'บันทึกไม่สำเร็จ');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setSaving(false);
    }
  };

  const categories = [
    { value: 'all', label: 'ทั้งหมด' },
    { value: 'main', label: 'รูปหลัก' },
    { value: 'activities', label: 'กิจกรรม' },
    { value: 'restaurants', label: 'ร้านอาหาร' },
  ];

  const filteredConfigs = selectedCategory === 'all' 
    ? IMAGE_CONFIGS 
    : IMAGE_CONFIGS.filter(config => config.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-deep-forest" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-kanit font-bold text-deep-forest mb-2">
              จัดการรูปภาพ
            </h1>
            <p className="text-charcoal/70">
              อัพโหลดและจัดการรูปภาพที่ใช้ในงานนำเสนอ
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-deep-forest text-white rounded-lg hover:bg-deep-forest/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                กำลังบันทึก...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                บันทึกการเปลี่ยนแปลง
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">✓ บันทึกสำเร็จ</p>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-6 flex gap-2">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-deep-forest text-white'
                  : 'bg-cream text-charcoal hover:bg-cream/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image Upload Grid */}
        <div className="space-y-8">
          {filteredConfigs.map(config => (
            <ImageUpload
              key={config.key}
              label={config.label}
              currentImage={imageUrls[config.key]}
              onUpload={(url) => handleImageUpload(config.key, url)}
              aspectRatio={config.aspectRatio}
              helperText={`คีย์: ${config.key}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
