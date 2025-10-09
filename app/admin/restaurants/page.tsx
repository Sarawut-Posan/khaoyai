'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Edit2, Trash2, X, AlertCircle, CheckCircle, Utensils } from 'lucide-react';
import { RestaurantInfo } from '@/lib/types';
import ImageUpload from '@/components/admin/ImageUpload';

// Extended type with id for CRUD operations
interface RestaurantWithId extends RestaurantInfo {
  id?: string;
}

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<RestaurantWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<RestaurantWithId>({
    id: '',
    name: '',
    type: '',
    phone: '',
    mapUrl: '',
    image: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RestaurantWithId, string>>>({});
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Load current data
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        if (result.success) {
          // Add IDs if they don't exist
          const restaurantsWithIds = (result.data.restaurants || []).map((r: RestaurantInfo, index: number) => ({
            ...r,
            id: (r as RestaurantWithId).id || `restaurant-${index}`,
          }));
          setRestaurants(restaurantsWithIds);
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

  // Validate phone number format
  const validatePhone = (phone: string): boolean => {
    // Thai phone format: 0XX-XXX-XXXX or 0XXXXXXXXX
    const phoneRegex = /^0\d{1,2}-?\d{3}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Validate URL format
  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RestaurantWithId, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'กรุณากรอกชื่อร้าน';
    }
    if (!formData.type.trim()) {
      newErrors.type = 'กรุณากรอกประเภทร้าน';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (เช่น 044-365-999)';
    }
    if (!formData.mapUrl.trim()) {
      newErrors.mapUrl = 'กรุณากรอก URL แผนที่';
    } else if (!validateUrl(formData.mapUrl)) {
      newErrors.mapUrl = 'รูปแบบ URL ไม่ถูกต้อง';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'กรุณาอัพโหลดรูปภาพ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate unique ID
  const generateId = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  // Handle add new item
  const handleAdd = () => {
    setFormData({
      id: '',
      name: '',
      type: '',
      phone: '',
      mapUrl: '',
      image: '',
      notes: '',
    });
    setEditingIndex(null);
    setShowForm(true);
    setErrors({});
  };

  // Handle edit item
  const handleEdit = (index: number) => {
    setFormData({ ...restaurants[index] });
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
      const newRestaurants = restaurants.filter((_, i) => i !== deleteConfirm);
      setRestaurants(newRestaurants);
      setDeleteConfirm(null);
      setMessage({ type: 'success', text: 'ลบร้านอาหารสำเร็จ (อย่าลืมบันทึก)' });
    }
  };

  // Handle save form
  const handleSaveForm = () => {
    if (!validateForm()) {
      setMessage({ type: 'error', text: 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง' });
      return;
    }

    // Generate ID if adding new
    const restaurantData = {
      ...formData,
      id: formData.id || generateId(formData.name),
    };

    if (editingIndex !== null) {
      // Update existing item
      const newRestaurants = [...restaurants];
      newRestaurants[editingIndex] = restaurantData;
      setRestaurants(newRestaurants);
      setMessage({ type: 'success', text: 'แก้ไขร้านอาหารสำเร็จ (อย่าลืมบันทึก)' });
    } else {
      // Add new item
      setRestaurants([...restaurants, restaurantData]);
      setMessage({ type: 'success', text: 'เพิ่มร้านอาหารสำเร็จ (อย่าลืมบันทึก)' });
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

      // Remove id field before saving (to match original type)
      const restaurantsToSave = restaurants.map(({ id: _, ...rest }) => rest);

      // Update restaurants
      const updatedData = {
        ...getResult.data,
        restaurants: restaurantsToSave,
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
            จัดการร้านอาหาร
          </h1>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 px-4 py-2 bg-deep-forest text-white rounded-lg hover:bg-deep-forest/90 transition-colors"
          >
            <Plus size={20} />
            <span>เพิ่มร้านอาหาร</span>
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

        {/* Restaurants List */}
        <div className="space-y-4">
          {restaurants.length === 0 ? (
            <div className="text-center py-12 text-charcoal/60">
              ยังไม่มีร้านอาหาร
            </div>
          ) : (
            restaurants.map((restaurant, index) => (
              <div
                key={restaurant.id || index}
                className="bg-white border-2 border-charcoal/10 rounded-lg overflow-hidden hover:border-deep-forest/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Restaurant Image */}
                  <div className="relative w-full md:w-48 aspect-video md:aspect-square bg-charcoal/5 flex-shrink-0">
                    {restaurant.image ? (
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Utensils className="w-12 h-12 text-charcoal/30" />
                      </div>
                    )}
                  </div>

                  {/* Restaurant Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-xl font-kanit font-semibold text-charcoal">
                          {restaurant.name}
                        </h3>
                        <p className="text-sm text-charcoal/60">{restaurant.type}</p>
                      </div>
                      <div className="flex items-center space-x-1 ml-4">
                        <button
                          onClick={() => handleEdit(index)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="แก้ไข"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="ลบ"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex items-center text-charcoal/70">
                        <span className="font-medium w-24">โทร:</span>
                        <span>{restaurant.phone}</span>
                      </div>
                      <div className="flex items-center text-charcoal/70">
                        <span className="font-medium w-24">แผนที่:</span>
                        <a
                          href={restaurant.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate"
                        >
                          {restaurant.mapUrl}
                        </a>
                      </div>
                      {restaurant.notes && (
                        <div className="flex items-start text-charcoal/70 mt-2">
                          <span className="font-medium w-24">หมายเหตุ:</span>
                          <span className="flex-1">{restaurant.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Save Button */}
        {restaurants.length > 0 && (
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
                {editingIndex !== null ? 'แก้ไขร้านอาหาร' : 'เพิ่มร้านอาหารใหม่'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  ชื่อร้าน <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="เช่น Midwinter Green"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  ประเภทร้าน <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${
                    errors.type ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="เช่น คาเฟ่และอาหารฝรั่ง"
                />
                {errors.type && (
                  <p className="mt-1 text-sm text-red-500">{errors.type}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="เช่น 044-365-999"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Map URL */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  URL แผนที่ <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={formData.mapUrl}
                  onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${
                    errors.mapUrl ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://maps.google.com/?q=..."
                />
                {errors.mapUrl && (
                  <p className="mt-1 text-sm text-red-500">{errors.mapUrl}</p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  หมายเหตุ
                </label>
                <textarea
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent"
                  placeholder="เช่น จองล่วงหน้าสำหรับกลุ่มใหญ่"
                />
              </div>

              {/* Image Upload */}
              <ImageUpload
                label="รูปภาพร้าน"
                currentImage={formData.image}
                onUpload={(url) => setFormData({ ...formData, image: url })}
                aspectRatio="aspect-video"
                helperText="อัพโหลดรูปภาพร้านอาหาร (แนะนำขนาด 16:9)"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
              )}

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
                  {editingIndex !== null ? 'บันทึกการแก้ไข' : 'เพิ่มร้านอาหาร'}
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
              คุณต้องการลบร้าน &quot;{restaurants[deleteConfirm]?.name}&quot; ใช่หรือไม่?
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
