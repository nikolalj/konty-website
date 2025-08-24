# Konty Website Localization Guide

## Overview

The Konty website automatically detects where visitors are from and shows them content in their country's version - with local prices, currency, and language. This happens seamlessly without requiring users to manually select their country.

## How It Works - Simple Flow

```
Visitor arrives → Detect country → Show right version → Remember choice
```

### Real Examples:

**Scenario 1: First-time visitor from Montenegro**
1. User types `konty.com` in browser
2. System detects they're in Montenegro (ME)
3. Automatically redirects to `konty.com/me`
4. Shows prices in EUR, content in Montenegrin dialect
5. Saves preference in cookie for next visit

**Scenario 2: Returning visitor**
1. Same user visits `konty.com` next week
2. System reads cookie: "This user prefers ME version"
3. Immediately redirects to `konty.com/me`
4. No detection needed - instant (0ms)

**Scenario 3: User manually switches country**
1. Montenegrin user clicks country selector (flag icon)
2. Chooses "Serbia" from dropdown
3. Site switches to Serbian version at `konty.com`
4. Saves this as explicit choice - won't suggest Montenegro anymore

## Supported Countries

| Country | URL | Currency | Language | Market |
|---------|-----|----------|----------|--------|
| Serbia 🇷🇸 | konty.com | RSD (Din) | Serbian | Primary market |
| Montenegro 🇲🇪 | konty.com/me | EUR (€) | Montenegrin | Secondary market |
| Bosnia 🇧🇦 | konty.com/ba | BAM (KM) | Bosnian | Expanding |
| USA/International 🇺🇸 | konty.com/us | USD ($) | English | Future |

## Technical Implementation

### 1. Country Detection (5-15ms)

We use MaxMind GeoLite2 database to detect countries from IP addresses:

```javascript
User IP: 89.188.45.123 → Database lookup → Country: ME (Montenegro)
```

**Why MaxMind?**
- **Fast**: 5-15ms local database lookup (no internet required)
- **Reliable**: 99.9% uptime (database is local)
- **Accurate**: 99.8% accuracy for country-level detection
- **Free**: GeoLite2 has generous free tier

**Fallback**: If database unavailable, uses api.country.is (slower, 100-500ms)

### 2. Cookie System

Simple cookie structure stores user preference:

```json
{
  "locale": "me",        // Which country version
  "explicit": false      // Did user manually choose?
}
```

- **Cookie name**: `konty-locale`
- **Duration**: 1 year
- **Size**: ~50 bytes

### 3. URL Structure

Using `prefix_except_default` strategy:

- **Serbia** (default): `konty.com`, `konty.com/pricing`, `konty.com/demo`
- **Montenegro**: `konty.com/me`, `konty.com/me/pricing`, `konty.com/me/demo`
- **Bosnia**: `konty.com/ba`, `konty.com/ba/pricing`, `konty.com/ba/demo`
- **USA**: `konty.com/us`, `konty.com/us/pricing`, `konty.com/us/demo`

Serbia doesn't need prefix because it's the primary market.

## Features

### 1. Automatic Detection & Redirect

**How it works:**
```
                    ┌─────────────┐
                    │ User visits │
                    │  konty.com  │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ Has cookie? │
                    └──────┬──────┘
                           │
                ┌──────────┴──────────┐
                │                     │
             No │                     │ Yes
                │                     │
         ┌──────▼──────┐      ┌──────▼──────┐
         │   Detect    │      │  Read saved │
         │   country   │      │ preference  │
         └──────┬──────┘      └──────┬──────┘
                │                     │
         ┌──────▼──────┐      ┌──────▼──────┐
         │  Save in    │      │   Redirect  │
         │   cookie    │      │     to      │
         └──────┬──────┘      │   locale    │
                │              └─────────────┘
         ┌──────▼──────┐
         │  Redirect   │
         │ to detected │
         │   locale    │
         └─────────────┘
```

### 2. Locale Suggestion Banner

When users browse to a different country's version, we suggest their detected locale:

**Example**: Montenegro user visits `konty.com/pricing` (Serbian version)
- Banner appears: "Choose a country to see content specific to your location"
- Options: "View Montenegro version" or "Stay here"
- If they switch: Redirects to `konty.com/me/pricing`
- If they stay: Marks Serbian as their choice

**Smart behavior:**
- Only shows for external visits (not when browsing internally)
- Respects explicit choices (won't nag if user chose)
- Appears after 2-second delay (prevents layout shift)
- Mobile-friendly (slides from bottom on phones)

### 3. Country Selector

Flag icon in header allows manual country switching:

```
[🇷🇸] → Click → Dropdown:
              ├─ 🇲🇪 Crna Gora (€ EUR) [Recommended]
              ├─ 🇷🇸 Srbija (Din RSD) ✓
              ├─ 🇧🇦 Bosna (KM BAM)
              └─ 🇺🇸 United States ($ USD)
```

Features:
- Shows currency for each country
- Marks current selection with checkmark
- Shows "Recommended" badge for detected country
- Pulsing dot indicator when different locale suggested

### 4. SEO Implementation

Each locale has proper SEO setup:

```html
<!-- Hreflang tags tell Google about all versions -->
<link rel="alternate" hreflang="sr-RS" href="https://konty.com/pricing" />
<link rel="alternate" hreflang="sr-ME" href="https://konty.com/me/pricing" />
<link rel="alternate" hreflang="bs-BA" href="https://konty.com/ba/pricing" />
<link rel="alternate" hreflang="en-US" href="https://konty.com/us/pricing" />

<!-- Canonical URL for this version -->
<link rel="canonical" href="https://konty.com/me/pricing" />

<!-- Localized meta tags -->
<title>Cijene - Konty POS sistema</title>
<meta name="description" content="Transparentne cijene bez skrivenih troškova..." />
```

## User Journeys

### Journey 1: New Visitor from Montenegro

```
1. Searches Google for "POS sistem"
2. Clicks konty.com link
3. [5ms] MaxMind detects: Montenegro
4. [0ms] Creates cookie: {locale: "me", explicit: false}
5. [0ms] Redirects to konty.com/me
6. Sees Montenegrin content with EUR prices
```

### Journey 2: Intentional Cross-Locale Browsing

```
1. Montenegrin restaurant owner wants to compare prices
2. Already on konty.com/me/pricing
3. Manually types konty.com/pricing to see Serbian prices
4. Sees Serbian prices in RSD
5. Banner suggests: "Choose a country to see content specific to your location"
6. Ignores banner - comparing prices
7. Cookie remains: {locale: "me", explicit: false}
8. Next visit still goes to /me (respects original preference)
```

### Journey 3: Permanent Locale Switch

```
1. Serbian user temporarily in Montenegro
2. Gets redirected to konty.com/me
3. Clicks country selector → chooses Serbia
4. Redirects to konty.com
5. Cookie updates: {locale: "rs", explicit: true}
6. Won't see suggestions anymore - explicit choice
```

### Journey 4: Shared Link

```
1. US-based investor receives link: konty.com/me/pricing
2. Opens link - sees Montenegrin version
3. System detects: USA
4. Shows banner: "Choose a country to see content specific to your location"
5. Clicks "View United States version"
6. Redirects to konty.com/us/pricing
7. Sees prices in USD, content in English
```

## Performance Metrics

| Operation | Time | Method |
|-----------|------|--------|
| First visit detection | 5-15ms | MaxMind database |
| Return visit | 0ms | Cookie |
| API fallback | 100-500ms | api.country.is |
| Locale switch | ~200ms | Client navigation |
| Banner appearance | 2000ms | Delayed to prevent shift |

## File Structure

```
konty-website/
├── server/
│   ├── data/
│   │   └── GeoLite2-Country.mmdb    # 9.2MB country database
│   ├── middleware/
│   │   └── 01.locale-redirect.ts    # Root path redirect
│   └── utils/
│       ├── country-detection.ts     # Main detection logic
│       └── maxmind-detection.ts     # Database lookups
├── app/
│   ├── composables/
│   │   └── useCountryDetection.ts   # Vue composable
│   ├── components/
│   │   ├── App/
│   │   │   ├── CountrySelector.vue  # Flag dropdown
│   │   │   └── LocaleSuggestionBanner.vue
│   └── locales/
│       ├── rs.json    # Serbian translations
│       ├── me.json    # Montenegrin translations
│       ├── ba.json    # Bosnian translations
│       └── us.json    # English translations
└── scripts/
    └── download-geolite2.js         # Database updater
```

## Deployment Setup

### 1. Initial Setup

```bash
# 1. Get free MaxMind license key
# Visit: https://dev.maxmind.com/geoip/geolite2-free-geolocation-data

# 2. Download database
MAXMIND_LICENSE_KEY=your_key npm run download-geolite2

# 3. Verify database exists
ls -lh server/data/GeoLite2-Country.mmdb
# Should show: 9.2MB file
```

### 2. Automated Updates (Cron)

Add to crontab for weekly updates:

```bash
# Edit crontab
crontab -e

# Add these lines:
MAXMIND_LICENSE_KEY=your_actual_key_here

# Update every Monday at 3am
0 3 * * 1 cd /path/to/konty-website && npm run update-geolite2 >> /var/log/geolite2.log 2>&1
```

### 3. Testing

```bash
# Test detection without cookie
curl -I https://konty.com

# Test with specific locale cookie
curl -I https://konty.com -H 'Cookie: konty-locale={"locale":"me","explicit":false}'

# Test locale pages
curl https://konty.com/me/pricing
curl https://konty.com/us/pricing
```

## Troubleshooting

### Problem: Detection not working

**Symptoms**: Everyone gets default locale
**Check**:
1. Database file exists: `ls server/data/*.mmdb`
2. Database loaded: Look for `[MaxMind] Database loaded` in logs
3. IP detection: Check server logs for IP address

**Fix**: Re-download database with valid license key

### Problem: Wrong country detected

**Symptoms**: VPN users, corporate networks
**Cause**: IP geolocation sees VPN/proxy location, not real location
**Solution**: Users can manually switch via country selector

### Problem: Cookie not persisting

**Symptoms**: Re-detection on every visit
**Check**: Browser developer tools → Application → Cookies
**Fix**: Ensure cookie domain matches, check SameSite settings

### Problem: Banner showing too often

**Symptoms**: Banner appears for internal navigation
**Check**: Referrer header detection
**Fix**: Ensure internal links use proper navigation (not full page reloads)

## Best Practices

### Do's ✅
- Always provide manual country selector
- Respect explicit user choices
- Use proper hreflang tags for SEO
- Keep translations consistent
- Test with VPN for different countries
- Monitor detection accuracy

### Don'ts ❌
- Don't force redirects without user control
- Don't show banner immediately (causes layout shift)
- Don't detect on every request (use cookies)
- Don't forget to update GeoLite2 database
- Don't make assumptions about language from country

## FAQ

**Q: Why not use browser language (Accept-Language)?**
**A:** Language doesn't equal country. Someone might prefer English but need Serbian prices.

**Q: What about VPN users?**
**A:** They see the country of their VPN server. Can manually switch via selector.

**Q: Can I add more countries?**
**A:** Yes! Add to `config/locale.config.ts`, create translation file, add flag icon.

**Q: How accurate is detection?**
**A:** ~99.8% for country level, less for city level (which we don't use).

**Q: Does this work with CDN caching?**
**A:** Yes, but exclude root path (/) from cache so redirects work.

**Q: Is this GDPR compliant?**
**A:** Yes - we only detect country (not track users), cookie is functional (not marketing).

## Summary

The localization system provides:
1. **Automatic** country detection (5-15ms)
2. **Smart** redirects based on user location
3. **Persistent** preferences via cookies
4. **Manual** control through country selector
5. **SEO-friendly** implementation with proper tags
6. **Fast** performance using local database
7. **Reliable** fallbacks when detection fails

Result: Users always see content relevant to their country, with local prices and language, while maintaining full control over their preference.