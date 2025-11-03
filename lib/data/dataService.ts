import { ContentData } from '@/lib/types';
import * as constants from '@/lib/constants';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const CONTENT_JSON_PATH = join(process.cwd(), 'data', 'content.json');

/**
 * Read content data from local file
 * Falls back to constants if file doesn't exist
 */
export async function readContentData(): Promise<ContentData> {
  try {
    // Try to read from local file
    const fileContent = await readFile(CONTENT_JSON_PATH, 'utf-8');
    const data = JSON.parse(fileContent) as ContentData;
    return data;
  } catch (error) {
    console.error('Error reading content from file:', error);
    // Fallback to constants on error
    return getDataFromConstants();
  }
}

/**
 * Write content data to local file
 */
export async function writeContentData(data: ContentData): Promise<void> {
  // Update lastModified timestamp
  data.lastModified = new Date().toISOString();

  try {
    // Write to local file
    await writeFile(CONTENT_JSON_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing content to file:', error);
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
    makroChecklist: [],
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
