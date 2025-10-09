# Images Directory

⚠️ **โปรเจคนี้ใช้ Vercel Blob Storage สำหรับการจัดเก็บรูปภาพแล้ว**

โฟลเดอร์นี้เก็บเฉพาะ **static assets** (logos, icons) เท่านั้น
รูปภาพที่อัพโหลดผ่าน Admin Panel จะถูกเก็บใน **Vercel Blob Storage**

---

## 📂 Image Storage

### Static Assets (เก็บที่นี่)
- Logos
- Icons
- Background images
- Design assets ที่ไม่เปลี่ยนแปลง

### User Uploads (เก็บใน Vercel Blob)
- รูปภาพที่อัพโหลดผ่าน ImageUpload component
- รูปภาพที่อัพโหลดผ่าน `/api/upload`
- รูปภาพที่จัดการผ่าน Admin Panel (`/admin/images`)

---

## 🔧 การใช้งาน

### Static Images (จากโฟลเดอร์นี้)
```tsx
import Image from 'next/image';

<Image
  src="/images/logo.png"
  alt="Logo"
  width={500}
  height={300}
/>
```

### Uploaded Images (จาก Blob Storage)
```tsx
import Image from 'next/image';

<Image
  src="https://xxx.blob.vercel-storage.com/images/file.jpg"
  alt="Uploaded Image"
  width={500}
  height={300}
  unoptimized // จำเป็นสำหรับ external URLs
/>
```

---

## 📋 Upload Specifications

- **Allowed formats**: JPG, PNG, WebP
- **Maximum file size**: 5MB
- **Naming**: ไฟล์จะถูกเปลี่ยนชื่ออัตโนมัติด้วย timestamp เพื่อป้องกันชื่อซ้ำ
- **Storage**: Vercel Blob Storage (CDN-backed)

---

## 🖼️ Image Categories

### Main Images
- Hero image (hero)
- Villa images (villa, villaPool, villaInterior)

### Activity Images
- Thongsomboon Club (thongsomboonMain)
- Activities (atv, zipline, luge, goKart, paintball, archery, horseRiding, rafting, buggy)

### Restaurant Images
- Restaurants (midwinter, chocolate, kruaKhaoYai)

---

## 📚 เอกสารเพิ่มเติม

- [Vercel Blob Storage Guide](../../docs/VERCEL_BLOB_STORAGE.md) - คู่มือการใช้งาน Blob Storage
- [Admin Panel User Guide](../../docs/ADMIN_PANEL_USER_GUIDE.md) - คู่มือการจัดการรูปภาพ

---

## 📝 Note

- Presentation จะทำงานได้ปกติแม้ไม่มีรูปภาพ (fallback colors)
- รูปภาพที่อัพโหลดจะถูกเก็บใน Vercel Blob และอ้างอิงใน `data/content.json`
- URL ของรูปภาพจะเป็น full URL ของ Blob Storage
