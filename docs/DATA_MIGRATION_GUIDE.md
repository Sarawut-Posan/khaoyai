# Data Migration Guide - Vercel Blob Storage

คู่มือการ migrate ข้อมูล content.json จาก file system ไปยัง Vercel Blob Storage

---

## 🎯 ทำไมต้อง Migrate?

Vercel deployment เป็น **read-only file system** ทำให้ไม่สามารถเขียนไฟล์ `data/content.json` ได้

**Error ที่เจอ:**
```
EROFS: read-only file system, open '/var/task/data/content.json'
```

**วิธีแก้:**
- ย้ายข้อมูลจาก file system ไปเก็บใน **Vercel Blob Storage**
- Blob Storage สามารถอ่าน/เขียนได้จาก serverless functions

---

## 📋 สิ่งที่เปลี่ยนแปลง

### 1. Data Service (`lib/data/dataService.ts`)
```diff
- import { promises as fs } from 'fs';
+ import { uploadJsonToBlob, getJsonFromBlobByPathname } from '@/lib/blobStorage';

- const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'content.json');
+ const CONTENT_JSON_PATHNAME = 'data/content.json';

export async function readContentData(): Promise<ContentData> {
-  const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
-  return JSON.parse(fileContent);
+  const data = await getJsonFromBlobByPathname<ContentData>(CONTENT_JSON_PATHNAME);
+  return data || getDataFromConstants();
}

export async function writeContentData(data: ContentData): Promise<void> {
-  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
+  await uploadJsonToBlob(data, CONTENT_JSON_PATHNAME);
}
```

### 2. Blob Storage Utilities (`lib/blobStorage.ts`)
เพิ่ม functions ใหม่:
- `uploadJsonToBlob<T>()` - อัพโหลด JSON object
- `downloadJsonFromBlob<T>()` - ดาวน์โหลดและ parse JSON
- `getJsonFromBlobByPathname<T>()` - ดึง JSON จาก Blob โดยใช้ pathname

### 3. Migration API (`app/api/data/migrate/route.ts`)
API endpoint ใหม่สำหรับ migrate ข้อมูลครั้งแรก

---

## 🚀 วิธีการ Migrate (ทำครั้งเดียว)

### ขั้นตอนที่ 1: Migrate ข้อมูลไปยัง Blob

**Option A: ใช้ cURL**
```bash
curl -X POST https://your-domain.vercel.app/api/data/migrate
```

**Option B: ใช้ Browser**
1. เปิด browser console (F12)
2. รันคำสั่ง:
```javascript
fetch('/api/data/migrate', { method: 'POST' })
  .then(res => res.json())
  .then(console.log);
```

**Response ที่คาดหวัง:**
```json
{
  "success": true,
  "message": "Migration completed successfully",
  "blobUrl": "https://xxx.blob.vercel-storage.com/data/content.json",
  "pathname": "data/content.json"
}
```

---

### ขั้นตอนที่ 2: ตรวจสอบว่า Migrate สำเร็จ

**ตรวจสอบผ่าน API:**
```bash
curl https://your-domain.vercel.app/api/data
```

**ตรวจสอบผ่าน Vercel Dashboard:**
1. ไปที่ [Vercel Dashboard](https://vercel.com/dashboard)
2. เลือกโปรเจค → **Storage** → **Blob**
3. ควรเห็นไฟล์ `data/content.json`

---

### ขั้นตอนที่ 3: ทดสอบการแก้ไขข้อมูล

1. เข้าไปที่ Admin Panel: `https://your-domain.vercel.app/admin/trip-info`
2. แก้ไขข้อมูล เช่น เปลี่ยนจำนวนคน
3. กด **บันทึกข้อมูล**
4. ตรวจสอบว่าบันทึกสำเร็จ

---

## 🔄 วิธีการทำงานหลัง Migrate

### การอ่านข้อมูล
```typescript
// lib/data/dataService.ts
export async function readContentData(): Promise<ContentData> {
  // 1. พยายามอ่านจาก Blob Storage
  const data = await getJsonFromBlobByPathname<ContentData>('data/content.json');

  if (data) {
    return data; // ✅ พบข้อมูลใน Blob
  }

  // 2. ถ้าไม่มีใน Blob, ใช้ constants เป็น fallback
  return getDataFromConstants();
}
```

### การเขียนข้อมูล
```typescript
export async function writeContentData(data: ContentData): Promise<void> {
  data.lastModified = new Date().toISOString();

  // เขียนไปยัง Blob Storage
  await uploadJsonToBlob(data, 'data/content.json');
}
```

---

## 📊 Architecture Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     User Action                              │
│              (Edit data in Admin Panel)                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   PUT /api/data                              │
│                (API Route Handler)                           │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              writeContentData(data)                          │
│            (lib/data/dataService.ts)                         │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│       uploadJsonToBlob(data, 'data/content.json')            │
│              (lib/blobStorage.ts)                            │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Vercel Blob Storage                             │
│          (Cloud-based JSON storage)                          │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚠️ สิ่งที่ต้องระวัง

### 1. ไฟล์ `data/content.json` ใน Codebase

หลัง migrate แล้ว ไฟล์ `data/content.json` ใน codebase จะ**ไม่ถูกใช้**อีกต่อไป

ข้อมูลจริงจะถูกเก็บใน Blob Storage แทน

**แนะนำ:**
- เก็บไฟล์ `data/content.json` ไว้เป็น backup
- ใช้เป็น default data สำหรับ development

---

### 2. Environment Variable

ต้องมี `BLOB_READ_WRITE_TOKEN` ใน environment variables:

**Local (.env.local):**
```env
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

**Vercel Production:**
1. Vercel Dashboard → Settings → Environment Variables
2. เพิ่ม `BLOB_READ_WRITE_TOKEN`
3. Redeploy

---

### 3. การ Rollback

ถ้าต้องการกลับไปใช้ file system (local dev only):

1. แก้ `lib/data/dataService.ts`:
```typescript
export async function readContentData(): Promise<ContentData> {
  // อ่านจาก local file
  const filePath = path.join(process.cwd(), 'data', 'content.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
```

2. **หมายเหตุ:** Rollback จะใช้ได้เฉพาะ local เท่านั้น, production บน Vercel ยังคงต้องใช้ Blob Storage

---

## 🛠️ Troubleshooting

### ปัญหา: Migration ไม่สำเร็จ

**Error:** `ไม่พบไฟล์ content.json`

**วิธีแก้:**
1. ตรวจสอบว่ามีไฟล์ `data/content.json`
2. ตรวจสอบว่า deploy ไฟล์ data/ ด้วย

---

### ปัญหา: บันทึกข้อมูลไม่สำเร็จ

**Error:** `ไม่สามารถบันทึกข้อมูลได้`

**วิธีแก้:**
1. ตรวจสอบ `BLOB_READ_WRITE_TOKEN` ใน environment variables
2. ตรวจสอบว่า token ยังไม่หมดอายุ
3. ตรวจสอบ Vercel Blob quota

---

### ปัญหา: ข้อมูลไม่อัพเดท

**อาการ:** แก้ไขข้อมูลแล้วไม่เปลี่ยน

**วิธีแก้:**
1. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. ตรวจสอบ Blob Storage ว่ามีไฟล์อัพเดทไหม
3. ตรวจสอบ `lastModified` timestamp

---

## 📝 Best Practices

### 1. Backup ข้อมูลเป็นประจำ

**ดาวน์โหลด content.json จาก Blob:**
```bash
curl https://xxx.blob.vercel-storage.com/data/content.json > backup.json
```

---

### 2. ใช้ Version Control

เก็บ `data/content.json` ใน Git เป็น baseline:
```bash
git add data/content.json
git commit -m "chore: update content baseline"
```

---

### 3. Monitor Blob Storage Usage

ตรวจสอบที่ Vercel Dashboard → Storage → Blob
- **Bandwidth:** 100 GB/month (free tier)
- **Storage:** Unlimited (pay per GB)

---

## 🎓 สรุป

หลังจาก migrate แล้ว:

✅ **ข้อดี:**
- สามารถแก้ไขข้อมูลบน production ได้
- ไม่มีปัญหา read-only file system
- ข้อมูลถูกเก็บบน CDN (โหลดเร็ว)

⚠️ **ข้อควรระวัง:**
- ต้องมี `BLOB_READ_WRITE_TOKEN`
- ต้อง migrate ครั้งแรกก่อนใช้งาน
- ข้อมูลจริงอยู่ใน Blob, ไม่ใช่ file system

---

**อัพเดทล่าสุด:** 2025-10-09
