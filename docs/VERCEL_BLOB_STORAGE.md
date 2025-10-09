# Vercel Blob Storage Integration

คู่มือการใช้งาน Vercel Blob Storage สำหรับการจัดเก็บรูปภาพและไฟล์ในโปรเจค Khao Yai Presentation

## 📋 สารบัญ

- [ภาพรวม](#ภาพรวม)
- [การติดตั้ง](#การติดตั้ง)
- [การตั้งค่า](#การตั้งค่า)
- [API Routes](#api-routes)
- [Utility Functions](#utility-functions)
- [การใช้งาน](#การใช้งาน)
- [ตัวอย่างโค้ด](#ตัวอย่างโค้ด)

---

## ภาพรวม

โปรเจคนี้ใช้ **Vercel Blob Storage** สำหรับการจัดเก็บรูปภาพและไฟล์แทนการเก็บใน file system ท้องถิ่น ข้อดีของการใช้ Blob Storage:

- ✅ **ประสิทธิภาพสูง**: ไฟล์ถูกเก็บบน CDN ทำให้โหลดเร็ว
- ✅ **ปรับขนาดง่าย**: ไม่มีข้อจำกัดเรื่องพื้นที่เก็บข้อมูล
- ✅ **ปลอดภัย**: URL ที่สร้างขึ้นมีความปลอดภัยสูง
- ✅ **จัดการง่าย**: API ที่เรียบง่ายและใช้งานง่าย

---

## การติดตั้ง

Package ที่ใช้:

```bash
npm install @vercel/blob
```

---

## การตั้งค่า

### 1. Environment Variables

สร้างไฟล์ `.env.local` ใน root ของโปรเจค:

```env
# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="your_token_here"
```

**หมายเหตุ**:
- Token นี้จะได้จาก Vercel Dashboard → Storage → Blob
- ห้ามเปิดเผย token นี้ในที่สาธารณะ
- ไฟล์ `.env.local` ถูก ignore โดย git อยู่แล้ว

### 2. การตั้งค่าใน Vercel Dashboard

1. เข้าไปที่ [Vercel Dashboard](https://vercel.com/dashboard)
2. เลือกโปรเจคของคุณ
3. ไปที่ **Storage** → **Blob**
4. คัดลอก **BLOB_READ_WRITE_TOKEN**
5. เพิ่ม Environment Variable ใน Settings → Environment Variables

---

## API Routes

### 1. อัพโหลดไฟล์ - `POST /api/upload`

อัพโหลดรูปภาพไปยัง Blob Storage

**Request:**
```javascript
const formData = new FormData();
formData.append('file', file); // File object

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});
```

**Response:**
```json
{
  "success": true,
  "url": "https://xxx.public.blob.vercel-storage.com/images/123456-abc-photo.jpg",
  "pathname": "images/123456-abc-photo.jpg",
  "downloadUrl": "https://xxx.public.blob.vercel-storage.com/images/123456-abc-photo.jpg",
  "contentType": "image/jpeg",
  "size": 123456
}
```

**ข้อจำกัด:**
- ขนาดไฟล์สูงสุด: **5MB**
- ประเภทไฟล์: **JPEG, PNG, WebP**

---

### 2. ลบไฟล์ - `DELETE /api/upload/delete`

ลบไฟล์จาก Blob Storage

**Request:**
```javascript
const response = await fetch('/api/upload/delete', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://xxx.public.blob.vercel-storage.com/images/123456-abc-photo.jpg'
  }),
});
```

**Response:**
```json
{
  "success": true,
  "message": "ลบไฟล์สำเร็จ"
}
```

---

### 3. ดึงรายการไฟล์ - `GET /api/upload/list`

ดึงรายการไฟล์ทั้งหมดจาก Blob Storage

**Request:**
```javascript
// ดึงทั้งหมด
const response = await fetch('/api/upload/list');

// ดึงเฉพาะโฟลเดอร์
const response = await fetch('/api/upload/list?prefix=images');
```

**Response:**
```json
{
  "success": true,
  "files": [
    {
      "url": "https://xxx.public.blob.vercel-storage.com/images/123456-abc-photo.jpg",
      "pathname": "images/123456-abc-photo.jpg",
      "size": 123456,
      "uploadedAt": "2024-01-01T00:00:00.000Z",
      "downloadUrl": "https://xxx.public.blob.vercel-storage.com/images/123456-abc-photo.jpg"
    }
  ],
  "count": 1
}
```

---

## Utility Functions

ไฟล์: `lib/blobStorage.ts`

### `validateFile(file: File)`

ตรวจสอบไฟล์ก่อนอัพโหลด

```typescript
import { validateFile } from '@/lib/blobStorage';

const validation = validateFile(file);
if (!validation.valid) {
  console.error(validation.error);
}
```

---

### `uploadToBlob(file: File, folder?: string)`

อัพโหลดไฟล์ไปยัง Blob Storage

```typescript
import { uploadToBlob } from '@/lib/blobStorage';

const blob = await uploadToBlob(file, 'images');
console.log('URL:', blob.url);
```

---

### `deleteFromBlob(url: string)`

ลบไฟล์จาก Blob Storage

```typescript
import { deleteFromBlob } from '@/lib/blobStorage';

await deleteFromBlob('https://xxx.public.blob.vercel-storage.com/images/123456.jpg');
```

---

### `listBlobFiles(prefix?: string)`

ดึงรายการไฟล์

```typescript
import { listBlobFiles } from '@/lib/blobStorage';

const files = await listBlobFiles('images');
console.log('Files:', files);
```

---

### `isBlobUrl(url: string)`

ตรวจสอบว่า URL เป็น Blob URL หรือไม่

```typescript
import { isBlobUrl } from '@/lib/blobStorage';

if (isBlobUrl(imageUrl)) {
  console.log('This is a Blob Storage URL');
}
```

---

## การใช้งาน

### 1. ใช้งานผ่าน ImageUpload Component

Component นี้จัดการทุกอย่างให้อัตโนมัติ:

```tsx
import ImageUpload from '@/components/admin/ImageUpload';

export default function MyForm() {
  const [imageUrl, setImageUrl] = useState<string>('');

  return (
    <ImageUpload
      label="รูปภาพหน้าปก"
      currentImage={imageUrl}
      onUpload={(url) => setImageUrl(url)}
      aspectRatio="aspect-video"
      helperText="รูปภาพควรมีขนาด 16:9"
    />
  );
}
```

---

### 2. อัพโหลดด้วยตัวเอง

```typescript
async function handleFileUpload(file: File) {
  try {
    // ตรวจสอบไฟล์
    const validation = validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // อัพโหลด
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      console.log('URL:', data.url);
      // บันทึก URL ลงฐานข้อมูล
    }
  } catch (error) {
    console.error('Upload error:', error);
  }
}
```

---

## ตัวอย่างโค้ด

### ตัวอย่างที่ 1: อัพโหลดและแสดงผล

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function UploadExample() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setImageUrl(data.url);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleUpload}
        disabled={uploading}
      />

      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Uploaded"
          width={400}
          height={300}
          className="rounded-lg"
        />
      )}
    </div>
  );
}
```

---

### ตัวอย่างที่ 2: ลบรูปภาพ

```tsx
async function handleDelete(url: string) {
  try {
    const response = await fetch('/api/upload/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    if (data.success) {
      console.log('ลบสำเร็จ');
    }
  } catch (error) {
    console.error('Delete error:', error);
  }
}
```

---

### ตัวอย่างที่ 3: แสดงรายการไฟล์ทั้งหมด

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function FileList() {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/upload/list?prefix=images')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFiles(data.files);
        }
      });
  }, []);

  return (
    <div>
      <h2>รายการไฟล์ ({files.length})</h2>
      <ul>
        {files.map((file) => (
          <li key={file.url}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.pathname} ({(file.size / 1024).toFixed(2)} KB)
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🔒 Security Best Practices

1. **ห้ามเปิดเผย Token**
   - ไม่ควร commit `.env.local` เข้า git
   - ใช้ environment variables ใน production

2. **Validate ทุกครั้ง**
   - ตรวจสอบประเภทและขนาดไฟล์เสมอ
   - ไม่ไว้วางใจ client-side validation เพียงอย่างเดียว

3. **Rate Limiting**
   - พิจารณาเพิ่ม rate limiting สำหรับ API routes
   - ป้องกันการ abuse

4. **Access Control**
   - ตรวจสอบสิทธิ์การอัพโหลดและลบ
   - ไม่ให้ public access สำหรับการลบไฟล์

---

## 📚 Resources

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [@vercel/blob NPM Package](https://www.npmjs.com/package/@vercel/blob)
- [Vercel Dashboard](https://vercel.com/dashboard)

---

## 🐛 Troubleshooting

### ปัญหา: "BLOB_READ_WRITE_TOKEN is not defined"

**วิธีแก้:**
1. ตรวจสอบว่ามีไฟล์ `.env.local`
2. ตรวจสอบว่า token ถูกต้อง
3. Restart dev server (`npm run dev`)

---

### ปัญหา: "Failed to upload file"

**วิธีแก้:**
1. ตรวจสอบขนาดไฟล์ (ต้องไม่เกิน 5MB)
2. ตรวจสอบประเภทไฟล์ (JPG, PNG, WebP เท่านั้น)
3. ตรวจสอบ network connection

---

### ปัญหา: "Cannot read properties of undefined"

**วิธีแก้:**
1. ตรวจสอบว่า token ถูกต้องและยังไม่หมดอายุ
2. ตรวจสอบ Vercel Blob quota
3. ตรวจสอบ logs ใน Vercel Dashboard

---

## 📝 Notes

- Blob Storage มี free tier 100 GB bandwidth ต่อเดือน
- ไฟล์จะถูกเก็บไว้ถาวรจนกว่าจะถูกลบ
- URL ที่สร้างขึ้นมีความปลอดภัยและไม่สามารถเดาได้
- รองรับ CDN caching อัตโนมัติ

---

**อัพเดทล่าสุด:** 2025-10-09
