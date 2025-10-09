# Admin Components Documentation

This directory contains reusable UI components for the Admin Panel. These components provide a consistent, polished interface with responsive design for tablet and desktop devices.

## Components Overview

### 1. MessageDisplay

Displays success, error, info, or warning messages with appropriate styling and icons.

```tsx
import { MessageDisplay } from '@/components/admin';

<MessageDisplay
  type="success"
  message="บันทึกข้อมูลสำเร็จ"
  onClose={() => setMessage(null)}
/>
```

**Props:**
- `type`: 'success' | 'error' | 'info' | 'warning'
- `message`: string - The message text to display
- `onClose?`: () => void - Optional close handler
- `className?`: string - Additional CSS classes

### 2. FormField

A reusable form input component with label, validation, and error display.

```tsx
import { FormField } from '@/components/admin';

<FormField
  label="ชื่อทริป"
  name="title"
  type="text"
  value={formData.title}
  onChange={(value) => setFormData({ ...formData, title: value as string })}
  error={errors.title}
  required
  placeholder="เช่น Khao Yai Getaway"
  helperText="กรอกชื่อทริปที่ต้องการแสดง"
/>
```

**Props:**
- `label`: string - Field label
- `name`: string - Field name
- `type?`: 'text' | 'textarea' | 'number' | 'url' | 'tel' | 'email' - Input type (default: 'text')
- `value`: string | number - Current value
- `onChange`: (value: string | number) => void - Change handler
- `error?`: string - Error message to display
- `required?`: boolean - Show required indicator
- `placeholder?`: string - Placeholder text
- `helperText?`: string - Helper text below input
- `rows?`: number - Rows for textarea (default: 3)
- `min?`: number - Min value for number input
- `max?`: number - Max value for number input

### 3. SaveButton

A button component with loading state for save operations.

```tsx
import { SaveButton } from '@/components/admin';

<SaveButton
  onClick={handleSave}
  loading={saving}
  disabled={!isValid}
>
  บันทึกข้อมูล
</SaveButton>
```

**Props:**
- `onClick`: () => void - Click handler
- `loading?`: boolean - Show loading state
- `disabled?`: boolean - Disable button
- `children?`: React.ReactNode - Button text (default: 'บันทึกข้อมูล')
- `variant?`: 'primary' | 'secondary' - Button style (default: 'primary')
- `size?`: 'sm' | 'md' | 'lg' - Button size (default: 'md')
- `fullWidth?`: boolean - Full width button

### 4. LoadingSpinner

A loading indicator with customizable size and message.

```tsx
import { LoadingSpinner } from '@/components/admin';

<LoadingSpinner message="กำลังโหลดข้อมูล..." size="lg" />
```

**Props:**
- `message?`: string - Loading message (default: 'กำลังโหลด...')
- `size?`: 'sm' | 'md' | 'lg' - Spinner size (default: 'md')
- `fullScreen?`: boolean - Full screen loading (default: false)

### 5. Modal

A reusable modal dialog component.

```tsx
import { Modal } from '@/components/admin';

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="เพิ่มรายการใหม่"
  maxWidth="lg"
>
  <div className="space-y-4">
    {/* Modal content */}
  </div>
</Modal>
```

**Props:**
- `isOpen`: boolean - Modal visibility
- `onClose`: () => void - Close handler
- `title`: string - Modal title
- `children`: React.ReactNode - Modal content
- `maxWidth?`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' - Max width (default: 'lg')

### 6. ConfirmDialog

A confirmation dialog for destructive actions.

```tsx
import { ConfirmDialog } from '@/components/admin';

<ConfirmDialog
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={handleDelete}
  title="ยืนยันการลบ"
  message="คุณต้องการลบรายการนี้ใช่หรือไม่?"
  confirmText="ลบ"
  cancelText="ยกเลิก"
  variant="danger"
/>
```

**Props:**
- `isOpen`: boolean - Dialog visibility
- `onClose`: () => void - Close handler
- `onConfirm`: () => void - Confirm handler
- `title`: string - Dialog title
- `message`: string - Confirmation message
- `confirmText?`: string - Confirm button text (default: 'ยืนยัน')
- `cancelText?`: string - Cancel button text (default: 'ยกเลิก')
- `variant?`: 'danger' | 'warning' | 'info' - Dialog style (default: 'danger')

### 7. PageHeader

A consistent page header with title, description, icon, and action button.

```tsx
import { PageHeader } from '@/components/admin';
import { Info, Plus } from 'lucide-react';

<PageHeader
  title="แก้ไขข้อมูลทริป"
  description="จัดการข้อมูลพื้นฐานของทริป"
  icon={Info}
  action={
    <button onClick={handleAdd}>
      <Plus size={20} />
      เพิ่มรายการ
    </button>
  }
/>
```

**Props:**
- `title`: string - Page title
- `description?`: string - Page description
- `icon?`: LucideIcon - Icon component
- `action?`: React.ReactNode - Action button or element

### 8. Card

A simple card container with consistent styling.

```tsx
import { Card } from '@/components/admin';

<Card padding="lg">
  <h2>Card Content</h2>
  <p>Some content here...</p>
</Card>
```

**Props:**
- `children`: React.ReactNode - Card content
- `className?`: string - Additional CSS classes
- `padding?`: 'none' | 'sm' | 'md' | 'lg' - Padding size (default: 'md')

### 9. ImageUpload

An image upload component with preview and validation.

```tsx
import { ImageUpload } from '@/components/admin';

<ImageUpload
  label="รูปภาพกิจกรรม"
  currentImage={formData.image}
  onUpload={(url) => setFormData({ ...formData, image: url })}
  aspectRatio="aspect-video"
  helperText="อัพโหลดรูปภาพกิจกรรม (แนะนำขนาด 16:9)"
/>
```

**Props:**
- `label`: string - Field label
- `currentImage?`: string - Current image URL
- `onUpload`: (url: string) => void - Upload success handler
- `aspectRatio?`: string - Aspect ratio class (e.g., 'aspect-video', 'aspect-square')
- `helperText?`: string - Helper text

## Complete Example

Here's a complete example of a form page using these components:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import {
  MessageDisplay,
  FormField,
  SaveButton,
  LoadingSpinner,
  PageHeader,
  Card,
} from '@/components/admin';

export default function ExamplePage() {
  const [data, setData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load data
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'โหลดข้อมูลไม่สำเร็จ' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!data.title.trim()) {
      newErrors.title = 'กรุณากรอกชื่อ';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setMessage({ type: 'error', text: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'บันทึกข้อมูลสำเร็จ' });
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
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
          title="แก้ไขข้อมูล"
          description="จัดการข้อมูลของคุณ"
          icon={Info}
        />

        {message && (
          <MessageDisplay
            type={message.type}
            message={message.text}
            onClose={() => setMessage(null)}
            className="mb-6"
          />
        )}

        <div className="space-y-6">
          <FormField
            label="ชื่อ"
            name="title"
            value={data.title}
            onChange={(value) => setData({ ...data, title: value as string })}
            error={errors.title}
            required
            placeholder="กรอกชื่อ"
          />

          <FormField
            label="คำอธิบาย"
            name="description"
            type="textarea"
            value={data.description}
            onChange={(value) => setData({ ...data, description: value as string })}
            placeholder="กรอกคำอธิบาย"
          />

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
```

## Responsive Design

All components are designed to be responsive and work well on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)

The admin layout includes:
- Responsive navigation with mobile menu
- Flexible grid layouts
- Touch-friendly button sizes
- Readable text sizes across devices

## Styling

Components use Tailwind CSS with the project's color palette:
- `deep-forest`: Primary color for buttons and headers
- `sage`: Secondary accent color
- `terracotta`: Accent color for actions
- `charcoal`: Text color
- `sand`: Background color

## Accessibility

Components include:
- Proper ARIA labels
- Keyboard navigation support
- Focus indicators
- Screen reader friendly markup
- Semantic HTML elements
