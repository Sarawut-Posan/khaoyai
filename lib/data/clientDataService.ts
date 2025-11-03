/**
 * Client-side data service
 * This file provides utilities for fetching content data from the API
 */

import { ContentData } from '@/lib/types';
import * as constants from '@/lib/constants';

let cachedData: ContentData | null = null;

/**
 * Fetch content data from API or use constants as fallback
 */
export async function getContentData(): Promise<ContentData> {
  // Return cached data if available
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch('/api/data');
    if (response.ok) {
      const result = await response.json();
      cachedData = result.data;
      return cachedData as ContentData;
    }
  } catch {
    console.log('Failed to fetch content data, using constants');
  }

  // Fallback to constants
  return getDataFromConstants();
}

/**
 * Clear cached data (useful after updates)
 */
export function clearCache() {
  cachedData = null;
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
