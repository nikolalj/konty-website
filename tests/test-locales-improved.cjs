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
log('  Locale Files Testing Tool (Improved)', 'cyan');
log('═══════════════════════════════════════════════════════════', 'cyan');
logInfo(`Found ${localeFiles.length} locale files: ${locales.join(', ')}`);

// Load all locale data
const localeData = {};
localeFiles.forEach(file => {
  const locale = file.replace('.json', '');
  const content = fs.readFileSync(path.join(localesDir, file), 'utf8');
  localeData[locale] = JSON.parse(content);
});

// Get all keys from an object
function getAllKeys(obj, prefix = '') {
  const keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// Standard patterns for finding translation keys
const searchPatterns = [
  /\$t\(['"`]([^'"`]+)['"`]/g,
  /(?<![a-zA-Z])t\(['"`]([^'"`]+)['"`]/g,
  /\$i18n\.t\(['"`]([^'"`]+)['"`]/g,
  /i18n\.t\(['"`]([^'"`]+)['"`]/g,
  /\$t\(`([^`]+)`/g,
  /(?<![a-zA-Z])t\(`([^`]+)`/g,
];

// Patterns for dynamic key construction
const dynamicPatterns = [
  // Template literal with ${} interpolation
  /t\([`']([^`']*)\$\{[^}]+\}([^`']*)[`']\)/g,
  /\$t\([`']([^`']*)\$\{[^}]+\}([^`']*)[`']\)/g,
  // translationKey variable assignment
  /translationKey\s*=\s*[`']([^`']+)\$\{[^}]+\}[`']/g,
  /const\s+\w+Key\s*=\s*[`']([^`']+)\$\{[^}]+\}[`']/g,
];

// Known dynamic key patterns in the codebase
const knownDynamicPatterns = [
  {
    pattern: 'ui.breadcrumb.${segmentKey}',
    possibleKeys: ['products', 'pricing', 'konty-hospitality', 'konty-retail', 'konty-download', 'contact', 'client-stories', 'partners', 'features', 'index']
  },
  {
    pattern: 'pages.${product}.faq',
    possibleKeys: ['kontyHospitality', 'kontyRetail']
  }
];

// Components that reference translation keys via props
const componentPropPatterns = [
  // <LazySharedFAQ product="kontyHospitality" />
  {
    component: 'SharedFAQ',
    prop: 'product',
    keyPattern: 'pages.{value}.faq'
  }
];

const usedKeys = new Set();
const dynamicKeyPatterns = new Set();

// Function to extract keys from file content
function extractKeysFromContent(content, filePath) {
  const keys = new Set();

  // Standard key extraction
  searchPatterns.forEach(pattern => {
    let match;
    const regex = new RegExp(pattern);
    while ((match = regex.exec(content)) !== null) {
      if (match[1]) {
        // Handle template literals with ${}
        if (match[1].includes('${')) {
          // Store the pattern for dynamic checking
          dynamicKeyPatterns.add(match[1]);
        } else {
          keys.add(match[1]);
        }
      }
    }
  });

  // Dynamic pattern detection
  dynamicPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const prefix = match[1] || '';
      const suffix = match[2] || '';
      dynamicKeyPatterns.add(`${prefix}\${...}${suffix}`);
    }
  });

  // Component prop pattern detection
  componentPropPatterns.forEach(({ component, prop, keyPattern }) => {
    const componentRegex = new RegExp(`<.*${component}.*${prop}=["']([^"']+)["']`, 'g');
    let match;
    while ((match = componentRegex.exec(content)) !== null) {
      const value = match[1];
      const pattern = keyPattern.replace('{value}', value);
      // Add FAQ keys for the detected product
      if (pattern.includes('faq')) {
        for (let i = 1; i <= 5; i++) {
          keys.add(`${pattern}.q${i}`);
          keys.add(`${pattern}.a${i}`);
        }
      }
    }
  });

  return keys;
}

// Search for translation keys in app directory
const appDir = path.join(__dirname, '../app');
function searchDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      searchDirectory(fullPath);
    } else if (file.endsWith('.vue') || file.endsWith('.ts') || file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const keys = extractKeysFromContent(content, fullPath);
      keys.forEach(key => usedKeys.add(key));
    }
  });
}

searchDirectory(appDir);

// Add keys from known dynamic patterns
knownDynamicPatterns.forEach(({ pattern, possibleKeys }) => {
  possibleKeys.forEach(key => {
    const fullKey = pattern.replace('${segmentKey}', key)
                           .replace('${product}', key);
    usedKeys.add(fullKey);
  });
});

logInfo(`Found ${usedKeys.size} unique translation keys used in the app`);
if (dynamicKeyPatterns.size > 0) {
  logInfo(`Found ${dynamicKeyPatterns.size} dynamic key patterns:`);
  dynamicKeyPatterns.forEach(pattern => {
    console.log(`  - ${pattern}`);
  });
}

// Get all keys from reference locale
const referenceLocale = locales[0];
const allLocaleKeys = getAllKeys(localeData[referenceLocale]);

// Test 3: Find unused keys
log('\n┌─────────────────────────────────────────────────────────┐', 'blue');
log('│ Test: Unused Keys Analysis (with dynamic detection)     │', 'blue');
log('└─────────────────────────────────────────────────────────┘', 'blue');

const unusedKeys = [];
const possiblyDynamicKeys = [];

allLocaleKeys.forEach(localeKey => {
  if (!usedKeys.has(localeKey)) {
    // Check if it might be used dynamically
    let isDynamic = false;

    // Check against known dynamic patterns
    knownDynamicPatterns.forEach(({ pattern }) => {
      const regex = pattern.replace('${segmentKey}', '([^.]+)')
                           .replace('${product}', '([^.]+)');
      if (new RegExp(regex).test(localeKey)) {
        isDynamic = true;
      }
    });

    if (isDynamic) {
      possiblyDynamicKeys.push(localeKey);
    } else {
      unusedKeys.push(localeKey);
    }
  }
});

if (possiblyDynamicKeys.length > 0) {
  logWarning(`Found ${possiblyDynamicKeys.length} keys that appear to be used dynamically:`);
  possiblyDynamicKeys.forEach(key => {
    console.log(`  ⚡ ${key} (dynamic)`);
  });
}

if (unusedKeys.length > 0) {
  logError(`Found ${unusedKeys.length} potentially unused keys:`);
  unusedKeys.forEach(key => {
    console.log(`  - ${key}`);
  });
  logWarning('Consider removing unused keys or marking them as reserved');
} else {
  logSuccess('No unused keys found (excluding dynamic keys)');
}

// Summary
log('\n═══════════════════════════════════════════════════════════', 'cyan');
log('  Summary', 'cyan');
log('═══════════════════════════════════════════════════════════', 'cyan');
logInfo(`Total keys in locales: ${allLocaleKeys.length}`);
logInfo(`Keys detected as used: ${usedKeys.size}`);
logInfo(`Keys possibly dynamic: ${possiblyDynamicKeys.length}`);
logInfo(`Keys potentially unused: ${unusedKeys.length}`);