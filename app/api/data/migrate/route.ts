import { NextResponse } from 'next/server';
import { uploadJsonToBlob } from '@/lib/blobStorage';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * POST /api/data/migrate
 * Migrate content.json from local file system to Vercel Blob Storage
 * This endpoint should be called ONCE during deployment setup
 */
export async function POST() {
  try {
    // Read from local file system
    const filePath = path.join(process.cwd(), 'data', 'content.json');

    let fileContent: string;
    try {
      fileContent = await fs.readFile(filePath, 'utf-8');
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'ไม่พบไฟล์ content.json',
          message: 'กรุณาตรวจสอบว่าไฟล์ data/content.json มีอยู่'
        },
        { status: 404 }
      );
    }

    // Parse JSON
    const data = JSON.parse(fileContent);

    // Upload to Blob Storage
    const result = await uploadJsonToBlob(data, 'data/content.json');

    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully',
      blobUrl: result.url,
      pathname: result.pathname,
    });

  } catch (error) {
    console.error('Migration error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Migration failed',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
