import { ContentData } from '@/lib/types';
import * as constants from '@/lib/constants';
import {
  uploadJsonToBlob,
  getJsonFromBlobByPathname
} from '@/lib/blobStorage';

const CONTENT_JSON_PATHNAME = 'data/content.json';

/**
 * Read content data from Blob Storage
 * Falls back to constants if file doesn't exist
 */
export async function readContentData(): Promise<ContentData> {
  try {
    // Try to read from Blob Storage
    const data = await getJsonFromBlobByPathname<ContentData>(CONTENT_JSON_PATHNAME);

    if (data) {
      return data;
    }

    // If file doesn't exist in Blob, return data from constants
    console.log('content.json not found in Blob Storage, using constants as fallback');
    return getDataFromConstants();
  } catch (error) {
    console.error('Error reading content from Blob:', error);
    // Fallback to constants on error
    return getDataFromConstants();
  }
}

/**
 * Write content data to Blob Storage
 */
export async function writeContentData(data: ContentData): Promise<void> {
  // Update lastModified timestamp
  data.lastModified = new Date().toISOString();

  try {
    // Upload to Blob Storage
    await uploadJsonToBlob(data, CONTENT_JSON_PATHNAME);
  } catch (error) {
    console.error('Error writing content to Blob:', error);
    throw new Error('ไม่สามารถบันทึกข้อมูลได้');
  }
}

/**
 * Convert constants to ContentData format
 */
function getDataFromConstants(): ContentData {
  return {
    version: '1.0',
    lastModified: new Date().toISOString(),
    tripInfo: constants.TRIP_INFO,
    imageUrls: constants.IMAGE_URLS,
    timeline: constants.TIMELINE_DATA,
    activities: constants.ACTIVITIES,
    restaurants: constants.RESTAURANTS,
    thongsomboonPackages: constants.THONGSOMBOON_PACKAGES,
    villaZones: constants.VILLA_ZONES,
    houseRules: constants.HOUSE_RULES,
    eveningActivities: constants.EVENING_ACTIVITIES,
    day2Options: constants.DAY2_OPTIONS,
    dressCodeColors: constants.DRESS_CODE_COLORS,
    checklistItems: constants.CHECKLIST_ITEMS,
    shoppingCategories: constants.SHOPPING_CATEGORIES,
    thongsomboonPromotions: constants.THONGSOMBOON_PROMOTIONS,
    departureInfo: constants.DEPARTURE_INFO,
    tathamplaphowInfo: constants.TATHAMPLAPHOW_INFO,
    breakfastSpots: constants.BREAKFAST_SPOTS,
    externalLinks: constants.EXTERNAL_LINKS,
  };
}

/**
 * Update specific section of content data
 */
export async function updateTripInfo(tripInfo: ContentData['tripInfo']): Promise<void> {
  const data = await readContentData();
  data.tripInfo = tripInfo;
  await writeContentData(data);
}

export async function updateTimeline(timeline: ContentData['timeline']): Promise<void> {
  const data = await readContentData();
  data.timeline = timeline;
  await writeContentData(data);
}

export async function updateActivities(activities: ContentData['activities']): Promise<void> {
  const data = await readContentData();
  data.activities = activities;
  await writeContentData(data);
}

export async function updateRestaurants(restaurants: ContentData['restaurants']): Promise<void> {
  const data = await readContentData();
  data.restaurants = restaurants;
  await writeContentData(data);
}

export async function updateImageUrls(imageUrls: Partial<ContentData['imageUrls']>): Promise<void> {
  const data = await readContentData();
  data.imageUrls = { ...data.imageUrls, ...imageUrls } as ContentData['imageUrls'];
  await writeContentData(data);
}
