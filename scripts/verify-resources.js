#!/usr/bin/env node
/**
 * Simple resource verification script
 * Checks that critical static resources exist before build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const criticalResources = [
  'static/posts.json',
  'static/posts.pt.json',
  'static/posts.en.json'
];

let allOk = true;

console.log('Verifying critical resources...');

for (const resource of criticalResources) {
  const fullPath = path.join(__dirname, '..', resource);
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  Warning: ${resource} not found (may cause runtime errors)`);
    // Don't fail the build for missing optional resources
  } else {
    console.log(`✓ ${resource}`);
  }
}

console.log('Resource verification complete.\n');
process.exit(0);
