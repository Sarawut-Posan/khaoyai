import { NextRequest, NextResponse } from 'next/server';
import { listBlobFiles } from '@/lib/blobStorage';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const prefix = searchParams.get('prefix') || undefined;

    // List files from Vercel Blob Storage
    const files = await listBlobFiles(prefix);

    return NextResponse.json({
      success: true,
      files: files.map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
        downloadUrl: blob.downloadUrl,
      })),
      count: files.length,
    });

  } catch (error) {
    console.error('List files error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการดึงรายการไฟล์'
      },
      { status: 500 }
    );
  }
}
