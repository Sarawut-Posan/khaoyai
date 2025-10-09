import { ContentData } from '@/lib/types';
import * as constants from '@/lib/constants';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'content.json');

/**
 * Read content data from JSON file
 * Falls back to constants if file doesn't exist
 */
export async function readContentData(): Promise<ContentData> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch {
    // If file doesn't exist, return data from constants
    console.log('content.json not found, using constants as fallback');
    return getDataFromConstants();
  }
}

/**
 * Write content data to JSON file
 */
export async function writeContentData(data: ContentData): Promise<void> {
  // Update lastModified timestamp
  data.lastModified = new Date().toISOString();
  
  // Ensure data directory exists
  const dataDir = path.dirname(DATA_FILE_PATH);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  
  // Write to file with pretty formatting
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
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
