import { NextRequest, NextResponse } from 'next/server';
import { readContentData, writeContentData } from '@/lib/data/dataService';
import { ContentData } from '@/lib/types';

/**
 * API Response format
 */
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Validate content data structure
 */
function validateContentData(data: unknown): data is ContentData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const content = data as Partial<ContentData>;

  // Check required top-level fields
  if (!content.version || typeof content.version !== 'string') {
    return false;
  }

  if (!content.tripInfo || typeof content.tripInfo !== 'object') {
    return false;
  }

  if (!content.imageUrls || typeof content.imageUrls !== 'object') {
    return false;
  }

  if (!Array.isArray(content.timeline)) {
    return false;
  }

  if (!Array.isArray(content.activities)) {
    return false;
  }

  if (!Array.isArray(content.restaurants)) {
    return false;
  }

  // Validate tripInfo structure
  const tripInfo = content.tripInfo as {
    title?: unknown;
    subtitle?: unknown;
    dates?: unknown;
    location?: unknown;
    teamSize?: unknown;
  };
  if (
    typeof tripInfo.title !== 'string' ||
    typeof tripInfo.subtitle !== 'string' ||
    typeof tripInfo.dates !== 'string' ||
    typeof tripInfo.location !== 'string' ||
    typeof tripInfo.teamSize !== 'number'
  ) {
    return false;
  }

  return true;
}

/**
 * GET /api/data - Read all content
 * Returns the complete content.json data
 */
export async function GET(): Promise<NextResponse<ApiResponse<ContentData>>> {
  try {
    const content = await readContentData();
    
    return NextResponse.json({
      success: true,
      data: content,
      message: 'Content data retrieved successfully'
    });
  } catch (error) {
    console.error('Error reading content:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to read content data',
        message: errorMessage
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/data - Update content
 * Updates the entire content.json file with new data
 */
export async function PUT(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Parse request body
    let data: unknown;
    try {
      data = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON format',
          message: 'Request body must be valid JSON'
        },
        { status: 400 }
      );
    }

    // Validate data structure
    if (!validateContentData(data)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid data structure',
          message: 'Content data does not match required schema'
        },
        { status: 400 }
      );
    }

    // Write data to file
    await writeContentData(data);
    
    return NextResponse.json({
      success: true,
      message: 'Content data updated successfully'
    });
  } catch (error) {
    console.error('Error updating content:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update content data',
        message: errorMessage
      },
      { status: 500 }
    );
  }
}
