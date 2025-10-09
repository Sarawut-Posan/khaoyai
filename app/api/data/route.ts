import { NextRequest, NextResponse } from 'next/server';
import { readContentData, writeContentData } from '@/lib/data/dataService';

// GET - Read all content
export async function GET() {
  try {
    const content = await readContentData();
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read content data' },
      { status: 500 }
    );
  }
}

// PUT - Update content
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    await writeContentData(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update content data' },
      { status: 500 }
    );
  }
}
