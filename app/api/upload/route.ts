import { NextRequest, NextResponse } from 'next/server';
import { uploadToBlob, validateFile } from '@/lib/blobStorage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบไฟล์' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob Storage
    const blob = await uploadToBlob(file, 'images');

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      downloadUrl: blob.downloadUrl,
      contentType: blob.contentType,
      size: file.size, // ใช้ size จาก File object
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการอัพโหลด'
      },
      { status: 500 }
    );
  }
}
