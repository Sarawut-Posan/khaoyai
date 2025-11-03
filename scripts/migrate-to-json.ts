/**
 * Migration script to convert constants.ts to content.json
 * Run with: npx tsx scripts/migrate-to-json.ts
 */

import { writeContentData } from '../lib/data/dataService';
import * as constants from '../lib/constants';
import { ContentData } from '../lib/types';

async function migrate() {
  console.log('🚀 Starting migration from constants.ts to content.json...');
  
  const contentData: ContentData = {
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

  try {
    await writeContentData(contentData);
    console.log('✅ Migration completed successfully!');
    console.log('📁 Content saved to: data/content.json');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
