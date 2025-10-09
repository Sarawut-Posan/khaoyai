/**
 * React hook for accessing content data
 * Provides easy access to content with fallback to constants
 */

import { useState } from 'react';
import { ContentData } from '@/lib/types';
import * as constants from '@/lib/constants';

/**
 * Hook to get content data with fallback to constants
 * For now, we'll use constants directly until the API is ready
 */
export function useContentData() {
  const [data] = useState<ContentData>(() => ({
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
  }));

  return data;
}

/**
 * Hook to get specific content sections
 */
export function useTripInfo() {
  const data = useContentData();
  return data.tripInfo;
}

export function useTimeline() {
  const data = useContentData();
  return data.timeline;
}

export function useActivities() {
  const data = useContentData();
  return data.activities;
}

export function useRestaurants() {
  const data = useContentData();
  return data.restaurants;
}

export function useImageUrls() {
  const data = useContentData();
  return data.imageUrls;
}
