import { NextRequest, NextResponse } from 'next/server';
import { deleteFromBlob } from '@/lib/blobStorage';

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบ URL ของไฟล์' },
        { status: 400 }
      );
    }

    // Delete from Vercel Blob Storage
    await deleteFromBlob(url);

    return NextResponse.json({
      success: true,
      message: 'ลบไฟล์สำเร็จ',
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการลบไฟล์'
      },
      { status: 500 }
    );
  }
}
