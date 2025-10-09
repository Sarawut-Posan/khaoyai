/**
 * Vercel Blob Storage Utilities
 * ยูทิลิตี้สำหรับจัดการการอัพโหลดและจัดเก็บไฟล์ผ่าน Vercel Blob
 */

import { put, del, list, type PutBlobResult } from '@vercel/blob';

// ข้อกำหนดสำหรับไฟล์อัพโหลด
export const UPLOAD_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
} as const;

/**
 * ตรวจสอบไฟล์ก่อนอัพโหลด
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  // ตรวจสอบประเภทไฟล์
  if (!UPLOAD_CONFIG.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'ประเภทไฟล์ไม่ถูกต้อง (รองรับเฉพาะ JPG, PNG, WebP)',
    };
  }

  // ตรวจสอบขนาดไฟล์
  if (file.size > UPLOAD_CONFIG.maxFileSize) {
    return {
      valid: false,
      error: 'ไฟล์มีขนาดใหญ่เกินไป (สูงสุด 5MB)',
    };
  }

  // ตรวจสอบนามสกุลไฟล์
  const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  if (!UPLOAD_CONFIG.allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: 'นามสกุลไฟล์ไม่ถูกต้อง',
    };
  }

  return { valid: true };
}

/**
 * สร้างชื่อไฟล์ที่ไม่ซ้ำกัน
 */
export function generateUniqueFilename(originalFilename: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const sanitizedName = originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
  const extension = sanitizedName.substring(sanitizedName.lastIndexOf('.'));
  const nameWithoutExt = sanitizedName.substring(0, sanitizedName.lastIndexOf('.'));

  return `${timestamp}-${randomString}-${nameWithoutExt}${extension}`;
}

/**
 * อัพโหลดไฟล์ไปยัง Vercel Blob Storage
 */
export async function uploadToBlob(
  file: File,
  folder: string = 'images'
): Promise<PutBlobResult> {
  // ตรวจสอบไฟล์
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // สร้างชื่อไฟล์ใหม่
  const filename = generateUniqueFilename(file.name);
  const pathname = `${folder}/${filename}`;

  try {
    // อัพโหลดไฟล์
    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: false, // ใช้ชื่อที่เรากำหนดเอง
    });

    return blob;
  } catch (error) {
    console.error('Blob upload error:', error);
    throw new Error('ไม่สามารถอัพโหลดไฟล์ได้ กรุณาลองใหม่อีกครั้ง');
  }
}

/**
 * ลบไฟล์จาก Vercel Blob Storage
 */
export async function deleteFromBlob(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error('Blob delete error:', error);
    throw new Error('ไม่สามารถลบไฟล์ได้');
  }
}

/**
 * ดึงรายการไฟล์ทั้งหมดในโฟลเดอร์
 */
export async function listBlobFiles(prefix?: string) {
  try {
    const { blobs } = await list({
      prefix: prefix || '',
    });
    return blobs;
  } catch (error) {
    console.error('Blob list error:', error);
    throw new Error('ไม่สามารถดึงรายการไฟล์ได้');
  }
}

/**
 * แปลง File เป็น ArrayBuffer (สำหรับการประมวลผล)
 */
export async function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

/**
 * ตรวจสอบว่า URL เป็น Blob URL หรือไม่
 */
export function isBlobUrl(url: string): boolean {
  return url.includes('vercel-storage.com') || url.includes('blob.vercel-storage.com');
}

/**
 * แยก pathname จาก Blob URL
 */
export function extractPathnameFromBlobUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.substring(1); // ตัด '/' ตัวแรกออก
  } catch {
    return null;
  }
}
