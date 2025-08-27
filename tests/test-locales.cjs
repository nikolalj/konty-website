#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  console.error(`${colors.red}✗ ${message}${colors.reset}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✓ ${message}${colors.reset}`);
}

function logInfo(message) {
  console.log(`${colors.cyan}ℹ ${message}${colors.reset}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠ ${message}${colors.reset}`);
}

// Get all locale files
const localesDir = path.join(__dirname, '../app/locales');
const localeFiles = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));
const locales = localeFiles.map(f => f.replace('.json', ''));

log('\n═══════════════════════════════════════════════════════════', 'cyan');
log('  Locale Files Testing Tool', 'cyan');
log('═══════════════════════════════════════════════════════════', 'cyan');
logInfo(`Found ${localeFiles.length} locale files: ${locales.join(', ')}`);

// Load all locale data
const localeData = {};
localeFiles.forEach(file => {
  const locale = file.replace('.json', '');
  const content = fs.readFileSync(path.join(localesDir, file), 'utf8');
  localeData[locale] = JSON.parse(content);
});

// Function to get all keys recursively with full paths
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// Function to get keys in order (preserving structure)
function getKeysInOrder(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    keys.push(fullKey);
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getKeysInOrder(obj[key], fullKey));
    }
  }
  return keys;
}

// Test 1: Check that all locale files have the same keys in the same order
log('\n┌─────────────────────────────────────────────────────────┐', 'blue');
log('│ Test 1: Same Keys in Same Order                        │', 'blue');
log('└─────────────────────────────────────────────────────────┘', 'blue');

let test1Passed = true;
const referenceLocale = locales[0];
const referenceKeys = getKeysInOrder(localeData[referenceLocale]);
const referenceKeysSet = new Set(referenceKeys);

locales.slice(1).forEach(locale => {
  const currentKeys = getKeysInOrder(localeData[locale]);
  const currentKeysSet = new Set(currentKeys);
  
  // Check if keys are the same
  const missingInCurrent = [...referenceKeysSet].filter(k => !currentKeysSet.has(k));
  const extraInCurrent = [...currentKeysSet].filter(k => !referenceKeysSet.has(k));
  
  if (missingInCurrent.length > 0 || extraInCurrent.length > 0) {
    test1Passed = false;
    logError(`${locale}.json has different keys than ${referenceLocale}.json`);
    if (missingInCurrent.length > 0) {
      logWarning(`  Missing keys (${missingInCurrent.length}):`);
      missingInCurrent.slice(0, 5).forEach(k => console.log(`    - ${k}`));
      if (missingInCurrent.length > 5) {
        console.log(`    ... and ${missingInCurrent.length - 5} more`);
      }
    }
    if (extraInCurrent.length > 0) {
      logWarning(`  Extra keys (${extraInCurrent.length}):`);
      extraInCurrent.slice(0, 5).forEach(k => console.log(`    - ${k}`));
      if (extraInCurrent.length > 5) {
        console.log(`    ... and ${extraInCurrent.length - 5} more`);
      }
    }
  }
  
  // Check if order is the same
  const orderMismatch = referenceKeys.some((key, index) => currentKeys[index] !== key);
  if (!missingInCurrent.length && !extraInCurrent.length && orderMismatch) {
    test1Passed = false;
    logError(`${locale}.json has keys in different order than ${referenceLocale}.json`);
    // Find first mismatch
    for (let i = 0; i < Math.min(referenceKeys.length, currentKeys.length); i++) {
      if (referenceKeys[i] !== currentKeys[i]) {
        logWarning(`  First order mismatch at index ${i}:`);
        console.log(`    Expected: ${referenceKeys[i]}`);
        console.log(`    Found: ${currentKeys[i]}`);
        break;
      }
    }
  }
});

if (test1Passed) {
  logSuccess('All locale files have the same keys in the same order');
  logInfo(`Total keys per locale: ${referenceKeys.length}`);
}

// Test 2: Find all translation keys used in the app
log('\n┌─────────────────────────────────────────────────────────┐', 'blue');
log('│ Test 2: All Used Keys Present in Locale Files         │', 'blue');
log('└─────────────────────────────────────────────────────────┘', 'blue');

// Search for translation usage patterns in Vue files and composables
const appDir = path.join(__dirname, '../app');
const searchPatterns = [
  /\$t\(['"`]([^'"`]+)['"`]/g,           // $t('key')
  /(?<![a-zA-Z])t\(['"`]([^'"`]+)['"`]/g, // t('key') - with word boundary
  /\$i18n\.t\(['"`]([^'"`]+)['"`]/g,     // $i18n.t('key')
  /i18n\.t\(['"`]([^'"`]+)['"`]/g,       // i18n.t('key')
  /\$t\(`([^`]+)`/g,                     // $t(`key`) - template literals
  /(?<![a-zA-Z])t\(`([^`]+)`/g,          // t(`key`) - template literals
  /\$t\(['"`]([^'"`]+)['"`]\s*,/g,       // $t('key', 'fallback') - with fallback
  /(?<![a-zA-Z])t\(['"`]([^'"`]+)['"`]\s*,/g, // t('key', 'fallback') - with fallback
];

const usedKeys = new Set();

// Function to extract keys from file content
function extractKeysFromContent(content) {
  const keys = new Set();
  
  searchPatterns.forEach(pattern => {
    let match;
    const regex = new RegExp(pattern);
    while ((match = regex.exec(content)) !== null) {
      // Handle dynamic keys (with ${...})
      const key = match[1] || match[2]; // Some patterns have capture groups
      
      // Filter out obvious non-translation keys
      if (!key || key.length < 2) continue;
      if (key === '/' || key === '.' || key === ';' || key === '=' || key === 'T') continue;
      if (['script', 'style', 'template', 'error', 'load', 'CTA', 'Conversion', 'Engagement', 
           'External Link', 'File Download', 'Lead Generation', 'web-vitals', 'konty:cookie-consent',
           'update:modelValue'].includes(key)) continue;
      if (!key.match(/^[a-zA-Z]/)) continue; // Keys should start with a letter
      if (key.includes(':') && !key.includes('.')) continue; // Skip event names
      if (!key.includes('.') && key.length < 4) continue; // Very short keys without dots are likely not translation keys
      
      if (key.includes('${')) {
        // For dynamic keys, try to extract the base pattern
        const baseKey = key.split('${')[0];
        if (baseKey) {
          // Add wildcard pattern for dynamic keys
          keys.add(`${baseKey}*`);
        }
      } else {
        keys.add(key);
      }
    }
  });
  
  return keys;
}

// Recursively search for translation keys in all relevant files
function searchDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      searchDirectory(fullPath);
    } else if (stat.isFile() && (file.endsWith('.vue') || file.endsWith('.ts') || file.endsWith('.js'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const keys = extractKeysFromContent(content);
      keys.forEach(key => usedKeys.add(key));
    }
  });
}

searchDirectory(appDir);
logInfo(`Found ${usedKeys.size} unique translation keys used in the app`);

// Check if all used keys exist in locale files
let test2Passed = true;
const missingKeysInLocales = [];
const allLocaleKeys = getAllKeys(localeData[referenceLocale]);

usedKeys.forEach(usedKey => {
  // Handle wildcard patterns for dynamic keys
  if (usedKey.includes('*')) {
    const basePattern = usedKey.replace('*', '');
    const matchingKeys = allLocaleKeys.filter(k => k.startsWith(basePattern));
    if (matchingKeys.length === 0) {
      missingKeysInLocales.push(usedKey);
      test2Passed = false;
    }
  } else {
    if (!allLocaleKeys.includes(usedKey)) {
      missingKeysInLocales.push(usedKey);
      test2Passed = false;
    }
  }
});

if (missingKeysInLocales.length > 0) {
  logError(`Found ${missingKeysInLocales.length} keys used in app but missing from locale files:`);
  missingKeysInLocales.forEach(key => {
    console.log(`  - ${key}`);
  });
} else {
  logSuccess('All keys used in the app are present in locale files');
}

// Test 3: Find unused keys in locale files
log('\n┌─────────────────────────────────────────────────────────┐', 'blue');
log('│ Test 3: No Unused Keys in Locale Files                 │', 'blue');
log('└─────────────────────────────────────────────────────────┘', 'blue');

let test3Passed = true;
const unusedKeys = [];

allLocaleKeys.forEach(localeKey => {
  let isUsed = false;
  
  // Check direct usage
  if (usedKeys.has(localeKey)) {
    isUsed = true;
  }
  
  // Check if it matches any wildcard pattern
  if (!isUsed) {
    for (const usedKey of usedKeys) {
      if (usedKey.includes('*')) {
        const basePattern = usedKey.replace('*', '');
        if (localeKey.startsWith(basePattern)) {
          isUsed = true;
          break;
        }
      }
    }
  }
  
  // Check if it's a parent key (has children)
  if (!isUsed) {
    const isParentKey = allLocaleKeys.some(k => k.startsWith(localeKey + '.'));
    if (isParentKey) {
      // Parent keys might not be directly used but are structural
      isUsed = true;
    }
  }
  
  if (!isUsed) {
    unusedKeys.push(localeKey);
    test3Passed = false;
  }
});

if (unusedKeys.length > 0) {
  logError(`Found ${unusedKeys.length} unused keys in locale files:`);
  unusedKeys.forEach(key => {
    console.log(`  - ${key}`);
  });
  logWarning('Consider removing unused keys to keep locale files clean');
} else {
  logSuccess('No unused keys found in locale files');
}

// Summary
log('\n═══════════════════════════════════════════════════════════', 'cyan');
log('  Test Summary', 'cyan');
log('═══════════════════════════════════════════════════════════', 'cyan');

const allTestsPassed = test1Passed && test2Passed && test3Passed;

if (allTestsPassed) {
  logSuccess('All tests passed! ✨');
  logInfo(`Locale files are properly synchronized and optimized`);
  process.exit(0);
} else {
  const failedTests = [];
  if (!test1Passed) failedTests.push('Keys consistency');
  if (!test2Passed) failedTests.push('Missing translations');
  if (!test3Passed) failedTests.push('Unused translations');
  
  logError(`Some tests failed: ${failedTests.join(', ')}`);
  logWarning('Please fix the issues above to ensure proper internationalization');
  process.exit(1);
}