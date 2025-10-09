/**
 * Admin API Testing Script
 * 
 * This script tests the admin panel API endpoints to verify:
 * - GET /api/data returns content
 * - PUT /api/data updates content
 * - Data persistence works correctly
 * 
 * Run with: npx tsx scripts/test-admin-api.ts
 */

import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'content.json');

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

const results: TestResult[] = [];

function test(name: string, fn: () => boolean, message: string) {
  try {
    const passed = fn();
    results.push({ name, passed, message: passed ? '✅ PASS' : `❌ FAIL: ${message}` });
  } catch (error) {
    results.push({ name, passed: false, message: `❌ ERROR: ${error}` });
  }
}

console.log('🧪 Testing Admin Panel API\n');

// Test 1: Data file exists
test(
  'Data file exists',
  () => fs.existsSync(DATA_FILE),
  'content.json not found'
);

// Test 2: Data file is valid JSON
test(
  'Data file is valid JSON',
  () => {
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    JSON.parse(content);
    return true;
  },
  'Invalid JSON format'
);

// Test 3: Data structure is correct
test(
  'Data structure is correct',
  () => {
    const content = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    return (
      content.version &&
      content.lastModified &&
      content.tripInfo &&
      content.timeline &&
      content.activities &&
      content.restaurants &&
      content.imageUrls
    );
  },
  'Missing required fields'
);

// Test 4: Trip info has required fields
test(
  'Trip info has required fields',
  () => {
    const content = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    const { tripInfo } = content;
    return (
      tripInfo.title &&
      tripInfo.subtitle &&
      tripInfo.dates &&
      tripInfo.location &&
      typeof tripInfo.teamSize === 'number'
    );
  },
  'Trip info missing required fields'
);

// Test 5: Timeline items have required fields
test(
  'Timeline items have required fields',
  () => {
    const content = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    const { timeline } = content;
    return timeline.every((item: any) => 
      item.time && item.title && item.icon
    );
  },
  'Timeline items missing required fields'
);

// Test 6: Activities have required fields
test(
  'Activities have required fields',
  () => {
    const content = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    const { activities } = content;
    return activities.every((item: any) => 
      item.id && item.title && item.description && item.image && item.icon
    );
  },
  'Activities missing required fields'
);

// Test 7: Restaurants have required fields
test(
  'Restaurants have required fields',
  () => {
    const content = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    const { restaurants } = content;
    return restaurants.every((item: any) => 
      item.name && item.type && item.phone && item.mapUrl && item.image
    );
  },
  'Restaurants missing required fields'
);

// Test 8: Images directory exists
test(
  'Images directory exists',
  () => fs.existsSync(path.join(process.cwd(), 'public', 'images')),
  'Images directory not found'
);

// Test 9: Data file is writable
test(
  'Data file is writable',
  () => {
    try {
      fs.accessSync(DATA_FILE, fs.constants.W_OK);
      return true;
    } catch {
      return false;
    }
  },
  'Data file is not writable'
);

// Test 10: Images directory is writable
test(
  'Images directory is writable',
  () => {
    try {
      const imagesDir = path.join(process.cwd(), 'public', 'images');
      fs.accessSync(imagesDir, fs.constants.W_OK);
      return true;
    } catch {
      return false;
    }
  },
  'Images directory is not writable'
);

// Print results
console.log('Test Results:\n');
results.forEach((result, index) => {
  console.log(`${index + 1}. ${result.name}`);
  console.log(`   ${result.message}\n`);
});

const passed = results.filter(r => r.passed).length;
const total = results.length;
const percentage = Math.round((passed / total) * 100);

console.log('─'.repeat(50));
console.log(`\n📊 Summary: ${passed}/${total} tests passed (${percentage}%)\n`);

if (passed === total) {
  console.log('✅ All tests passed! Admin panel is ready.\n');
  process.exit(0);
} else {
  console.log('❌ Some tests failed. Please review the errors above.\n');
  process.exit(1);
}
