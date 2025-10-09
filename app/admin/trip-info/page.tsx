'use client';

import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { TripInfo } from '@/lib/types';
import {
  MessageDisplay,
  FormField,
  SaveButton,
  LoadingSpinner,
  PageHeader,
  Card,
} from '@/components/admin';

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
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <PageHeader
          title="แก้ไขข้อมูลทริป"
          description="จัดการข้อมูลพื้นฐานของทริป เช่น ชื่อ วันที่ สถานที่ และจำนวนคน"
          icon={Info}
        />

        {/* Message Display */}
        {message && (
          <MessageDisplay
            type={message.type}
            message={message.text}
            onClose={() => setMessage(null)}
            className="mb-6"
          />
        )}

        {/* Form */}
        <div className="space-y-6">
          <FormField
            label="ชื่อทริป"
            name="title"
            type="text"
            value={tripInfo.title}
            onChange={(value) => setTripInfo({ ...tripInfo, title: value as string })}
            error={errors.title}
            required
            placeholder="เช่น Khao Yai Getaway"
          />

          <FormField
            label="คำบรรยาย"
            name="subtitle"
            type="text"
            value={tripInfo.subtitle}
            onChange={(value) => setTripInfo({ ...tripInfo, subtitle: value as string })}
            error={errors.subtitle}
            required
            placeholder="เช่น 14 Friends, 2D1N"
          />

          <FormField
            label="วันที่"
            name="dates"
            type="text"
            value={tripInfo.dates}
            onChange={(value) => setTripInfo({ ...tripInfo, dates: value as string })}
            error={errors.dates}
            required
            placeholder="เช่น เสาร์ 8 - อาทิตย์ 9 พฤศจิกายน 2568"
          />

          <FormField
            label="สถานที่"
            name="location"
            type="text"
            value={tripInfo.location}
            onChange={(value) => setTripInfo({ ...tripInfo, location: value as string })}
            error={errors.location}
            required
            placeholder="เช่น DN Poolvilla Khaoyai"
          />

          <FormField
            label="จำนวนคน"
            name="teamSize"
            type="number"
            value={tripInfo.teamSize}
            onChange={(value) => setTripInfo({ ...tripInfo, teamSize: value as number })}
            error={errors.teamSize}
            required
            min={1}
            placeholder="เช่น 14"
          />

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t">
            <SaveButton onClick={handleSave} loading={saving}>
              บันทึกข้อมูล
            </SaveButton>
          </div>
        </div>
      </Card>
    </div>
  );
}
