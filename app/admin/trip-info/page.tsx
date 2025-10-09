'use client';

import { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';
import { TripInfo } from '@/lib/types';

export default function TripInfoPage() {
  const [tripInfo, setTripInfo] = useState<TripInfo>({
    title: '',
    subtitle: '',
    dates: '',
    location: '',
    teamSize: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof TripInfo, string>>>({});

  // Load current data
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        if (result.success) {
          setTripInfo(result.data.tripInfo);
        } else {
          setMessage({ type: 'error', text: 'โหลดข้อมูลไม่สำเร็จ' });
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setMessage({ type: 'error', text: 'โหลดข้อมูลไม่สำเร็จ' });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TripInfo, string>> = {};

    if (!tripInfo.title.trim()) {
      newErrors.title = 'กรุณากรอกชื่อทริป';
    }
    if (!tripInfo.subtitle.trim()) {
      newErrors.subtitle = 'กรุณากรอกคำบรรยาย';
    }
    if (!tripInfo.dates.trim()) {
      newErrors.dates = 'กรุณากรอกวันที่';
    }
    if (!tripInfo.location.trim()) {
      newErrors.location = 'กรุณากรอกสถานที่';
    }
    if (!tripInfo.teamSize || tripInfo.teamSize <= 0) {
      newErrors.teamSize = 'กรุณากรอกจำนวนคนที่ถูกต้อง';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = async () => {
    if (!validateForm()) {
      setMessage({ type: 'error', text: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      // Get current data
      const getResponse = await fetch('/api/data');
      const getResult = await getResponse.json();
      
      if (!getResult.success) {
        throw new Error('Failed to get current data');
      }

      // Update trip info
      const updatedData = {
        ...getResult.data,
        tripInfo,
      };

      // Save updated data
      const putResponse = await fetch('/api/data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      const putResult = await putResponse.json();

      if (putResult.success) {
        setMessage({ type: 'success', text: 'บันทึกข้อมูลสำเร็จ' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage({ type: 'error', text: 'บันทึกไม่สำเร็จ กรุณาลองใหม่' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-charcoal/70">กำลังโหลด...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-kanit font-bold text-deep-forest mb-6">
          แก้ไขข้อมูลทริป
        </h1>

        {/* Message Display */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Form */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              ชื่อทริป <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tripInfo.title}
              onChange={(e) => setTripInfo({ ...tripInfo, title: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="เช่น Khao Yai Getaway"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              คำบรรยาย <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tripInfo.subtitle}
              onChange={(e) => setTripInfo({ ...tripInfo, subtitle: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${
                errors.subtitle ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="เช่น 14 Friends, 2D1N"
            />
            {errors.subtitle && (
              <p className="mt-1 text-sm text-red-500">{errors.subtitle}</p>
            )}
          </div>

          {/* Dates */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              วันที่ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tripInfo.dates}
              onChange={(e) => setTripInfo({ ...tripInfo, dates: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${
                errors.dates ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="เช่น เสาร์ 8 - อาทิตย์ 9 พฤศจิกายน 2568"
            />
            {errors.dates && (
              <p className="mt-1 text-sm text-red-500">{errors.dates}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              สถานที่ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tripInfo.location}
              onChange={(e) => setTripInfo({ ...tripInfo, location: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="เช่น DN Poolvilla Khaoyai"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">{errors.location}</p>
            )}
          </div>

          {/* Team Size */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              จำนวนคน <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={tripInfo.teamSize}
              onChange={(e) => setTripInfo({ ...tripInfo, teamSize: parseInt(e.target.value) || 0 })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${
                errors.teamSize ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="เช่น 14"
            />
            {errors.teamSize && (
              <p className="mt-1 text-sm text-red-500">{errors.teamSize}</p>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 bg-deep-forest text-white rounded-lg hover:bg-deep-forest/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={20} />
              <span>{saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
