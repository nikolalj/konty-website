const fs = require('fs');
const path = require('path');

// Unused keys to remove (excluding priceValue and breadcrumb translations)
const unusedKeys = [
  "ui.footer.links.aboutUs",
  "pages.pricing.monthly",
  "pages.pricing.yearly",
  "pages.pricing.mostPopular",
  "pages.blog.related.subtitle",
  "pages.blog.publishedOn"
];

// Helper function to delete nested property
function deleteNestedProperty(obj, path) {
  const keys = path.split('.');
  let current = obj;
  const stack = [];

  // Navigate to the parent of the property to delete
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      return; // Property doesn't exist
    }
    stack.push({ obj: current, key: keys[i] });
    current = current[keys[i]];
  }

  // Delete the property
  delete current[keys[keys.length - 1]];

  // Clean up empty parent objects
  for (let i = stack.length - 1; i >= 0; i--) {
    const { obj, key } = stack[i];
    if (Object.keys(obj[key]).length === 0) {
      delete obj[key];
    }
  }
}

// Process each locale file
const localeDir = './app/locales';
const locales = ['rs', 'ba', 'me', 'us'];

locales.forEach(locale => {
  const filePath = path.join(localeDir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Remove unused keys
  unusedKeys.forEach(key => {
    deleteNestedProperty(data, key);
  });

  // Write back
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  console.log(`Updated ${locale}.json - removed unused keys`);
});

console.log('Done removing unused keys!');