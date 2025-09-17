const fs = require('fs');
const path = require('path');

// Read all locale files
const localeDir = './app/locales';
const locales = ['rs', 'ba', 'me', 'us'];

// Missing keys to add
const missingKeys = {
  "pages.clientStories.empty.title": {
    rs: "Još nema priča",
    ba: "Još nema priča",
    me: "Još nema priča",
    us: "No stories yet"
  },
  "pages.clientStories.empty.description": {
    rs: "Uskoro proverite nove priče o uspehu klijenata.",
    ba: "Uskoro proverite nove priče o uspjehu klijenata.",
    me: "Uskoro proverite nove priče o uspjehu klijenata.",
    us: "Check back soon for client success stories."
  },
  "pages.home.getStarted.description": {
    rs: "Prelazak na Konty je brz i jednostavan",
    ba: "Prelazak na Konty je brz i jednostavan",
    me: "Prelazak na Konty je brz i jednostavan",
    us: "Switching to Konty is quick and easy"
  },
  "pages.demo.features.liveDemo": {
    rs: "Demo uživo",
    ba: "Demo uživo",
    me: "Demo uživo",
    us: "Live Demo"
  },
  "pages.demo.features.personalizedWalkthrough": {
    rs: "Personalizovan prikaz",
    ba: "Personalizovan prikaz",
    me: "Personalizovan prikaz",
    us: "Personalized Walkthrough"
  },
  "pages.demo.features.industrySpecific": {
    rs: "Specifično za industriju",
    ba: "Specifično za industriju",
    me: "Specifično za industriju",
    us: "Industry Specific"
  },
  "pages.demo.features.qaSession": {
    rs: "Sesija pitanja i odgovora",
    ba: "Sesija pitanja i odgovora",
    me: "Sesija pitanja i odgovora",
    us: "Q&A Session"
  },
  "pages.demo.features.trialSetup": {
    rs: "Podešavanje probne verzije",
    ba: "Podešavanje probne verzije",
    me: "Podešavanje probne verzije",
    us: "Trial Setup"
  },
  "pages.products.features.retail.barcode.title": {
    rs: "Barkod skeniranje",
    ba: "Barkod skeniranje",
    me: "Barkod skeniranje",
    us: "Barcode Scanning"
  },
  "pages.products.features.retail.loyalty.title": {
    rs: "Program lojalnosti",
    ba: "Program lojalnosti",
    me: "Program lojalnosti",
    us: "Loyalty Program"
  },
  "pages.products.features.retail.multiLocation.title": {
    rs: "Više lokacija",
    ba: "Više lokacija",
    me: "Više lokacija",
    us: "Multi-Location"
  },
  "pages.products.features.retail.analytics.title": {
    rs: "Analitika",
    ba: "Analitika",
    me: "Analitika",
    us: "Analytics"
  },
  "pages.products.features.retail.offline.title": {
    rs: "Offline rad",
    ba: "Offline rad",
    me: "Offline rad",
    us: "Offline Mode"
  },
  "pages.products.features.hospitality.tables.title": {
    rs: "Upravljanje stolovima",
    ba: "Upravljanje stolovima",
    me: "Upravljanje stolovima",
    us: "Table Management"
  },
  "pages.products.features.hospitality.kitchen.title": {
    rs: "Kuhinjski ekran",
    ba: "Kuhinjski ekran",
    me: "Kuhinjski ekran",
    us: "Kitchen Display"
  },
  "pages.products.features.hospitality.staff.title": {
    rs: "Upravljanje osobljem",
    ba: "Upravljanje osobljem",
    me: "Upravljanje osobljem",
    us: "Staff Management"
  },
  "pages.products.features.hospitality.onlineOrdering.title": {
    rs: "Online naručivanje",
    ba: "Online naručivanje",
    me: "Online naručivanje",
    us: "Online Ordering"
  },
  "pages.products.features.hospitality.reservations.title": {
    rs: "Rezervacije",
    ba: "Rezervacije",
    me: "Rezervacije",
    us: "Reservations"
  },
  "pages.products.features.hospitality.splitBills.title": {
    rs: "Podela računa",
    ba: "Podjela računa",
    me: "Podjela računa",
    us: "Split Bills"
  },
  "pages.products.features.hospitality.offline.title": {
    rs: "Offline rad",
    ba: "Offline rad",
    me: "Offline rad",
    us: "Offline Mode"
  }
};

// Helper function to set nested property
function setNestedProperty(obj, path, value) {
  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;
}

// Process each locale file
locales.forEach(locale => {
  const filePath = path.join(localeDir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Add missing keys
  Object.keys(missingKeys).forEach(key => {
    setNestedProperty(data, key, missingKeys[key][locale]);
  });

  // Write back
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  console.log(`Updated ${locale}.json`);
});

console.log('Done adding missing keys!');