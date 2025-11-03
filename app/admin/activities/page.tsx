'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Edit2, Trash2, X, AlertCircle, CheckCircle, Activity } from 'lucide-react';
import { ActivityCard } from '@/lib/types';
import ImageUpload from '@/components/admin/ImageUpload';

export default function ActivitiesPage() {
    const [activities, setActivities] = useState<ActivityCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<ActivityCard>({
        id: '',
        title: '',
        description: '',
        image: '',
        icon: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof ActivityCard, string>>>({});
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    // Load current data
    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch('/api/data');
                const result = await response.json();
                if (result.success) {
                    setActivities(result.data.activities || []);
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
        const newErrors: Partial<Record<keyof ActivityCard, string>> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'กรุณากรอกชื่อกิจกรรม';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'กรุณากรอกคำอธิบาย';
        }
        if (!formData.image.trim()) {
            newErrors.image = 'กรุณาอัพโหลดรูปภาพ';
        }
        if (!formData.icon?.trim()) {
            newErrors.icon = 'กรุณากรอกไอคอน';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Generate unique ID
    const generateId = (title: string): string => {
        return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    };

    // Handle add new item
    const handleAdd = () => {
        setFormData({
            id: '',
            title: '',
            description: '',
            image: '',
            icon: '',
        });
        setEditingIndex(null);
        setShowForm(true);
        setErrors({});
    };

    // Handle edit item
    const handleEdit = (index: number) => {
        setFormData({ ...activities[index] });
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
            const newActivities = activities.filter((_, i) => i !== deleteConfirm);
            setActivities(newActivities);
            setDeleteConfirm(null);
            setMessage({ type: 'success', text: 'ลบกิจกรรมสำเร็จ (อย่าลืมบันทึก)' });
        }
    };

    // Handle save form
    const handleSaveForm = () => {
        if (!validateForm()) {
            setMessage({ type: 'error', text: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
            return;
        }

        // Generate ID if adding new
        const activityData = {
            ...formData,
            id: formData.id || generateId(formData.title),
        };

        if (editingIndex !== null) {
            // Update existing item
            const newActivities = [...activities];
            newActivities[editingIndex] = activityData;
            setActivities(newActivities);
            setMessage({ type: 'success', text: 'แก้ไขกิจกรรมสำเร็จ (อย่าลืมบันทึก)' });
        } else {
            // Add new item
            setActivities([...activities, activityData]);
            setMessage({ type: 'success', text: 'เพิ่มกิจกรรมสำเร็จ (อย่าลืมบันทึก)' });
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

            // Update activities
            const updatedData = {
                ...getResult.data,
                activities,
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
                        จัดการกิจกรรม
                    </h1>
                    <button
                        onClick={handleAdd}
                        className="flex items-center space-x-2 px-4 py-2 bg-deep-forest text-white rounded-lg hover:bg-deep-forest/90 transition-colors"
                    >
                        <Plus size={20} />
                        <span>เพิ่มกิจกรรม</span>
                    </button>
                </div>

                {/* Message Display */}
                {message && (
                    <div
                        className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${message.type === 'success'
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

                {/* Activities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activities.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-charcoal/60">
                            ยังไม่มีกิจกรรม
                        </div>
                    ) : (
                        activities.map((activity, index) => (
                            <div
                                key={activity.id}
                                className="bg-white border-2 border-charcoal/10 rounded-lg overflow-hidden hover:border-deep-forest/30 transition-colors"
                            >
                                {/* Activity Image */}
                                <div className="relative aspect-video bg-charcoal/5">
                                    {activity.image ? (
                                        <img
                                            src={activity.image}
                                            alt={activity.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Activity className="w-12 h-12 text-charcoal/30" />
                                        </div>
                                    )}
                                </div>

                                {/* Activity Content */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-kanit font-semibold text-charcoal flex-1">
                                            {activity.title}
                                        </h3>
                                        <div className="flex items-center space-x-1 ml-2">
                                            <button
                                                onClick={() => handleEdit(index)}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                title="แก้ไข"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                title="ลบ"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-charcoal/70 mb-2">
                                        {activity.description}
                                    </p>
                                    <div className="text-xs text-charcoal/50">
                                        ไอคอน: {activity.icon || 'ไม่ระบุ'}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Save Button */}
                {activities.length > 0 && (
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
                                {editingIndex !== null ? 'แก้ไขกิจกรรม' : 'เพิ่มกิจกรรมใหม่'}
                            </h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">
                                    ชื่อกิจกรรม <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="เช่น ATV ขับรถ 4 ล้อ"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">
                                    คำอธิบาย <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${errors.description ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="เช่น ลุยเส้นทาง 1,500 เมตร เหมาะกับทุกวัย"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                                )}
                            </div>

                            {/* Icon */}
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">
                                    ไอคอน <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.icon || ''}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-deep-forest focus:border-transparent ${errors.icon ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="เช่น bike, zap, target, heart"
                                />
                                <p className="mt-1 text-xs text-charcoal/60">
                                    ใช้ชื่อไอคอนจาก Lucide React (เช่น bike, zap, target, heart, crosshair)
                                </p>
                                {errors.icon && (
                                    <p className="mt-1 text-sm text-red-500">{errors.icon}</p>
                                )}
                            </div>

                            {/* Image Upload */}
                            <ImageUpload
                                label="รูปภาพกิจกรรม"
                                currentImage={formData.image}
                                onUpload={(url) => setFormData({ ...formData, image: url })}
                                aspectRatio="aspect-video"
                                helperText="อัพโหลดรูปภาพกิจกรรม (แนะนำขนาด 16:9)"
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
                                    {editingIndex !== null ? 'บันทึกการแก้ไข' : 'เพิ่มกิจกรรม'}
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
                            คุณต้องการลบกิจกรรม &ldquo;{activities[deleteConfirm]?.title}&rdquo; ใช่หรือไม่?
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
