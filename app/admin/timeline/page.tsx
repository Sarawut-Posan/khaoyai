'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Edit2, Trash2, X, AlertCircle, CheckCircle, Calendar, Clock } from 'lucide-react';
import { TimelineItem } from '@/lib/types';
import ImageUpload from '@/components/admin/ImageUpload';

export default function TimelinePage() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<TimelineItem>({
    time: '',
    title: '',
    icon: '',
    description: '',
    isDayMarker: false,
    image: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof TimelineItem, string>>>({});
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Load current data
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        if (result.success) {
          setTimeline(result.data.timeline || []);
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
    const newErrors: Partial<Record<keyof TimelineItem, string>> = {};

    if (!formData.time.trim()) {
      newErrors.time = 'กรุณากรอกเวลา';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'กรุณากรอกหัวข้อ';
    }
    if (!formData.icon.trim()) {
      newErrors.icon = 'กรุณากรอกไอคอน';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle add new item
  const handleAdd = () => {
    setFormData({
      time: '',
      title: '',
      icon: '',
      description: '',
      isDayMarker: false,
      image: '',
    });
    setEditingIndex(null);
    setShowForm(true);
    setErrors({});
  };

  // Handle edit item
  const handleEdit = (index: number) => {
    setFormData({ ...timeline[index] });
    setEditingIndex(index);
    setShowForm(true);
    setErrors({});
  };

  // Handle delete item
  const handleDelete = (index: number) => {
    setDeleteConfirm(index);
  };

  const confirmDelete = () => {
    if (deleteConfirm !== null) {
      const newTimeline = timeline.filter((_, i) => i !== deleteConfirm);
      setTimeline(newTimeline);
      setDeleteConfirm(null);
      setMessage({ type: 'success', text: 'ลบรายการสำเร็จ (อย่าลืมบันทึก)' });
    }
  };

  // Handle save form
  const handleSaveForm = () => {
    if (!validateForm()) {
      setMessage({ type: 'error', text: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
      return;
    }

    if (editingIndex !== null) {
      // Update existing item
      const newTimeline = [...timeline];
      newTimeline[editingIndex] = formData;
      setTimeline(newTimeline);
      setMessage({ type: 'success', text: 'แก้ไขรายการสำเร็จ (อย่าลืมบันทึก)' });
    } else {
      // Add new item
      setTimeline([...timeline, formData]);
      setMessage({ type: 'success', text: 'เพิ่มรายการสำเร็จ (อย่าลืมบันทึก)' });
    }

    setShowForm(false);
    setEditingIndex(null);
    setTimeout(() => setMessage(null), 3000);
  };

  // Handle save to server
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      // Get current data
      const getResponse = await fetch('/api/data');
      const getResult = await getResponse.json();
      
      if (!getResult.success) {
        throw new Error('Failed to get current data');
      }

      // Update timeline
      const updatedData = {
        ...getResult.data,
        timeline,
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
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-kanit font-bold text-deep-forest">
            จัดการตารางเวลา
          </h1>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 px-4 py-2 bg-deep-forest text-white rounded-lg hover:bg-deep-forest/90 transition-colors"
          >
            <Plus size={20} />
            <span>เพิ่มรายการ</span>
          </button>
        </div>

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

        {/* Timeline List */}
        <div className="space-y-4">
          {timeline.length === 0 ? (
            <div className="text-center py-12 text-charcoal/60">
              ยังไม่มีรายการในตารางเวลา
            </div>
          ) : (
            timeline.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  item.isDayMarker
                    ? 'bg-deep-forest/5 border-deep-forest/20'
                    : 'bg-white border-charcoal/10'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {item.isDayMarker ? (
                        <Calendar className="w-5 h-5 text-deep-forest" />
                      ) : (
                        <Clock className="w-5 h-5 text-charcoal/60" />
                      )}
                      <span className="font-semibold text-deep-forest">
                        {item.time}
                      </span>
                      <span className="text-sm text-charcoal/60">
                        (icon: {item.icon})
                      </span>
                    </div>
                    <h3 className="text-lg font-kanit font-semibold text-charcoal mb-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-charcoal/70 text-sm mb-2">
                        {item.description}
                      </p>
                    )}
                    {item.image && (
                      <div className="text-xs text-charcoal/50">
                        รูปภาพ: {item.image}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="แก้ไข"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="ลบ"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Save Button */}
        {timeline.length > 0 && (
          <div className="flex justify-end pt-6 mt-6 border-t">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 bg-deep-forest text-white rounded-lg hover:bg-deep-forest/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={20} />
              <span>{saving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-kanit font-bold text-deep-forest">
                {editingIndex !== null ? 'แก้ไขรายการ' : 'เพิ่มรายการใหม่'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  เวลา <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${
                    errors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="เช่น 10:00 หรือ วันที่ 1"
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  หัวข้อ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="เช่น ทานอาหารกลางวัน"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Icon */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  ไอคอน <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${
                    errors.icon ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="เช่น utensils, car, home"
                />
                <p className="mt-1 text-xs text-charcoal/60">
                  ใช้ชื่อไอคอนจาก Lucide React (เช่น calendar, clock, utensils, car, home)
                </p>
                {errors.icon && (
                  <p className="mt-1 text-sm text-red-500">{errors.icon}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  คำอธิบาย
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent"
                  placeholder="รายละเอียดเพิ่มเติม"
                />
              </div>

              {/* Is Day Marker */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isDayMarker"
                  checked={formData.isDayMarker || false}
                  onChange={(e) => setFormData({ ...formData, isDayMarker: e.target.checked })}
                  className="w-4 h-4 text-deep-forest border-gray-300 rounded focus:ring-deep-forest"
                />
                <label htmlFor="isDayMarker" className="text-sm font-medium text-charcoal">
                  เป็นหัวข้อวัน (Day Marker)
                </label>
              </div>

              {/* Image Upload */}
              <ImageUpload
                label="รูปภาพ (ไม่บังคับ)"
                currentImage={formData.image}
                onUpload={(url) => setFormData({ ...formData, image: url })}
                aspectRatio="aspect-video"
                helperText="อัพโหลดรูปภาพประกอบสำหรับรายการนี้"
              />

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSaveForm}
                  className="px-6 py-2 bg-deep-forest text-white rounded-lg hover:bg-deep-forest/90 transition-colors"
                >
                  {editingIndex !== null ? 'บันทึกการแก้ไข' : 'เพิ่มรายการ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-kanit font-bold text-charcoal mb-4">
              ยืนยันการลบ
            </h3>
            <p className="text-charcoal/70 mb-6">
              คุณต้องการลบรายการ &quot;{timeline[deleteConfirm]?.title}&quot; ใช่หรือไม่?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-6 py-2 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
