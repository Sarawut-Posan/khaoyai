/**
 * Script to upload content.json to Blob Storage
 */

import { readFile } from 'fs/promises';
import { join } from 'path';

async function uploadContent() {
  try {
    // Read content.json
    const contentPath = join(process.cwd(), 'data', 'content.json');
    const content = await readFile(contentPath, 'utf-8');
    const data = JSON.parse(content);

    // Upload to API
    const response = await fetch('http://localhost:3000/api/data', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Success:', result.message);
    } else {
      const error = await response.json();
      console.error('❌ Error:', error.message);
    }
  } catch (error) {
    console.error('❌ Failed to upload:', error);
  }
}

uploadContent();
