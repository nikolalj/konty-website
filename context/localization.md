# Konty Website Localization Guide

## Overview

The Konty website automatically detects where visitors are from and shows them content in their country's version - with local prices, currency, and language. This happens seamlessly without requiring users to manually select their country.

## Core Principles

1. **Silent redirects** - No "we redirected you" notifications (following Amazon/Apple pattern)
2. **Respect user choice** - Manual selections are permanent (explicit flag)
3. **Always fresh detection** - Non-explicit users get current location pricing (Option B)
4. **Selective localization** - Only conversion-critical pages get localized URLs

## How It Works - Simple Flow

```
Visitor arrives → Check if explicit choice → If not, detect country → Redirect to detected locale → Set cookie
```

### Real Examples:

**Scenario 1: First-time visitor from Montenegro**
1. User types `konty.com` in browser
2. System detects they're in Montenegro (ME) via IP
3. Silently redirects to `konty.com/me`
4. Shows prices in EUR, content in Montenegrin dialect
5. Saves preference in cookie (not explicit)

**Scenario 2: Returning visitor**
1. Same user visits `konty.com` next week
2. System reads cookie: "This user was in ME, not explicit"
3. Detects current location again (fresh detection)
4. If still in ME → redirects to `konty.com/me`
5. If now in RS → stays on `konty.com` (always fresh for non-explicit)

**Scenario 3: User manually switches country**
1. Montenegrin user clicks country selector (flag icon)
2. Chooses "Serbia" from dropdown
3. Site switches to Serbian version at `konty.com`
4. Saves as **explicit choice** - system will never suggest changes

**Scenario 4: Locale mismatch**
1. Serbian user visits `konty.com/me/pricing` (Montenegro version)
2. System detects they're in Serbia
3. Shows suggestion banner: "You seem to be in Serbia"
4. User can switch or stay (both are permanent choices)
5. X button = dismiss for session only (4 hours)

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
- **Cached**: 60-minute cache with 1000 entry limit

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
- **Size**: ~30 bytes
- **No `wasRedirected`**: Following industry best practice (no redirect notifications)

### 3. URL Structure

Using `prefix_except_default` strategy:

- **Serbia** (default): `konty.com`, `konty.com/pricing`, `konty.com/demo`
- **Montenegro**: `konty.com/me`, `konty.com/me/pricing`, `konty.com/me/demo`
- **Bosnia**: `konty.com/ba`, `konty.com/ba/pricing`, `konty.com/ba/demo`
- **USA**: `konty.com/us`, `konty.com/us/pricing`, `konty.com/us/demo`

Serbia doesn't need prefix because it's the primary market.

### 4. Selective Page Localization

Only these pages get locale-specific URLs:
- `/` - Homepage (different CTAs, testimonials)
- `/pricing` - Local prices and currency
- `/demo` - Contact info and business hours
- `/konty-retail` - Product features with local examples
- `/konty-hospitality` - Product features with local examples

Universal content stays at root:
- `/blog/*` - Blog posts (no redirect)
- `/about` - Company info (no redirect)
- `/terms`, `/privacy` - Legal pages (no redirect)

## Features

### 1. Automatic Detection & Silent Redirect

**How it works (Option B):**
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
                │              ┌──────▼──────┐
                │              │  Explicit?  │
                │              └──────┬──────┘
                │                     │
                │          ┌──────────┴──────────┐
                │          │                     │
                │       Yes│                  No │
                │          │                     │
         ┌──────▼──────┐   │              ┌──────▼──────┐
         │   Detect    │   │              │   Detect    │
         │   country   │   │              │   country   │
         └──────┬──────┘   │              │   (fresh)   │
                │          │              └──────┬──────┘
         ┌──────▼──────┐   │              ┌──────▼──────┐
         │  Save in    │   │              │  Update     │
         │   cookie    │   │              │   cookie    │
         └──────┬──────┘   │              └──────┬──────┘
                │          │                     │
         ┌──────▼──────┐   ▼              ┌──────▼──────┐
         │  Redirect   │ Use saved        │  Redirect   │
         │  to locale  │  locale          │  to locale  │
         └─────────────┘                  └─────────────┘
```

### 2. Locale Suggestion Banner

When users browse a different country's version, we suggest their detected locale:

**Example**: Montenegro user visits `konty.com/pricing` (Serbian version)
- Banner appears after 2 seconds: "You seem to be in Montenegro"
- Options: "Switch to Montenegro" (primary button) or "Stay here" (ghost button)
- X button: Dismisses for current session (4 hours)
- If they switch or stay: Marks as explicit choice (permanent)

**Smart behavior:**
- Only shows when locale mismatch detected
- Never shows if user made explicit choice
- Session-based dismissal (survives page refresh, expires after 4 hours)
- Mobile-friendly (slides from bottom on phones)
- Hidden on error and auth pages

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
- Pulsing dot indicator when different locale detected
- All manual selections are permanent (explicit = true)

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
5. [0ms] Silent redirect to konty.com/me
6. Sees Montenegrin content with EUR prices
7. No notification about redirect (best practice)
```

### Journey 2: Cross-Locale Browsing with Suggestion

```
1. Montenegrin user wants to compare prices
2. Manually types konty.com/pricing (Serbian version)
3. Sees Serbian prices in RSD
4. After 2 seconds, banner suggests: "You seem to be in Montenegro"
5. Can switch to ME version or stay on RS
6. Either choice is permanent (explicit: true)
```

### Journey 3: Temporary Banner Dismissal

```
1. US investor in Serbia visits konty.com
2. Gets redirected to Serbian version
3. Manually visits konty.com/us for English
4. Banner suggests Serbian version
5. Clicks X to dismiss
6. Banner hidden for 4 hours (session storage)
7. Next day: Banner may appear again (not permanent)
```

### Journey 4: Travel Detection (Option B)

```
1. Serbian user (non-explicit cookie) travels to Montenegro
2. Visits konty.com - system detects Montenegro
3. Gets redirected to konty.com/me (fresh detection)
4. Sees Montenegro prices in EUR (accurate for current location)
5. Cookie updates: {locale: "me", explicit: false}
6. When returns to Serbia, will see Serbian prices again
```

### Journey 5: Permanent Locale Switch

```
1. User in Montenegro clicks country selector
2. Manually chooses "Serbia" from dropdown
3. Redirects to konty.com
4. Cookie updates: {locale: "rs", explicit: true}
5. Will ALWAYS see Serbian version regardless of location
6. Won't see suggestions anymore - explicit choice respected
```

## Performance Metrics

| Operation | Time | Method |
|-----------|------|--------|
| First visit detection | 5-15ms | MaxMind database |
| Return visit | 0ms | Cookie |
| API fallback | 100-500ms | api.country.is |
| Locale switch | ~200ms | Client navigation |
| Banner appearance | 2000ms | Delayed to prevent shift |
| Cache TTL | 60 minutes | In-memory Map |
| Max cache size | 1000 entries | FIFO eviction |

## File Structure

```
konty-website/
├── config/
│   └── locale.config.ts              # Central locale configuration
├── server/
│   ├── data/
│   │   └── GeoLite2-Country.mmdb    # 9.2MB country database
│   ├── middleware/
│   │   └── 02.locale-redirect.ts    # Locale detection and redirect
│   └── utils/
│       └── country-detection.ts     # Detection logic with MaxMind
├── app/
│   ├── components/
│   │   ├── App/
│   │   │   ├── CountrySelector.vue  # Flag dropdown
│   │   │   └── LocaleSuggestionBanner.vue # Mismatch suggestion
│   ├── plugins/
│   │   └── locale-payload.server.ts # Server-side locale injection
│   └── locales/
│       ├── rs.json    # Serbian translations (311 keys)
│       ├── me.json    # Montenegrin translations (311 keys)
│       ├── ba.json    # Bosnian translations (311 keys)
│       └── us.json    # English translations (311 keys)
├── i18n.config.ts                    # i18n configuration
└── nuxt.config.ts                    # Nuxt with i18n module config
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
# Should show: ~9.2MB file
```

### 2. Automated Updates (Recommended)

Add to your deployment pipeline or cron:

```bash
# Update database weekly
0 3 * * 1 cd /path/to/konty-website && npm run update-geolite2
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

**Symptoms**: Everyone gets default locale (Serbia)
**Check**:
1. Database file exists: `ls server/data/*.mmdb`
2. Database loaded: Look for `[MaxMind] Database loaded` in logs
3. IP detection working: Check server logs for IP address

**Fix**: Re-download database with valid license key

### Problem: Wrong country detected

**Symptoms**: VPN users, corporate networks get wrong locale
**Cause**: IP geolocation sees VPN/proxy location, not real location
**Solution**: Users can manually switch via country selector (permanent)

### Problem: Banner showing too often

**Symptoms**: Banner appears repeatedly despite dismissal
**Check**: SessionStorage in browser DevTools
**Fix**: Ensure sessionStorage is working (not in private/incognito mode)

### Problem: Travel detection not working

**Symptoms**: User travels to different country, still sees old locale
**Current Issue**: Middleware uses old cookie locale instead of new detection
**Workaround**: User must manually switch via country selector

## Best Practices

### Do's ✅
- Always provide manual country selector
- Respect explicit user choices permanently
- Use silent redirects (no notifications)
- Keep translations consistent across locales
- Test with VPN for different countries
- Monitor detection accuracy with analytics
- Update GeoLite2 database regularly

### Don'ts ❌
- Don't notify users about redirects
- Don't force redirects without user control
- Don't show banner immediately (causes layout shift)
- Don't detect on every request (use cookies)
- Don't ignore explicit user choices
- Don't make assumptions about language from country

## FAQ

**Q: Why no "we redirected you" notification?**
**A:** Industry best practice. Amazon, Apple, Booking.com all redirect silently. Users expect localized content.

**Q: Why not use browser language (Accept-Language)?**
**A:** Language doesn't equal country. Someone might prefer English but need Serbian prices.

**Q: What about VPN users?**
**A:** They see the country of their VPN server. Can manually switch via selector (permanent).

**Q: Why only some pages get localized URLs?**
**A:** Reduces complexity. Blog posts and company info are universal. Only prices and CTAs need localization.

**Q: How accurate is detection?**
**A:** ~99.8% for country level with MaxMind. Falls back to API if database unavailable.

**Q: Does this work with CDN caching?**
**A:** Yes, but exclude locale-redirect paths from cache so detection works.

**Q: Is this GDPR compliant?**
**A:** Yes - we only detect country (not track users), cookie is functional (not marketing).

## Implementation Notes

### Banner Dismissal Logic
- **X button**: Temporary dismissal (4 hours via sessionStorage)
- **"Stay here" button**: Permanent choice (explicit = true)
- **"Switch" button**: Permanent choice to suggested locale
- Button hierarchy: Switch (primary) > Stay (ghost) > X (icon only)

### Cookie vs Explicit Choice (Option B Implementation)
- **Non-explicit cookie**: Always gets fresh detection on each visit
- **Explicit cookie**: User manually chose, respects their choice regardless of location
- Manual country selector always sets explicit = true
- Travel scenario: Non-explicit users see prices for current location

## Summary

The localization system (Option B) provides:
1. **Automatic** country detection (5-15ms with MaxMind)
2. **Silent** redirects without notifications
3. **Fresh detection** for non-explicit users (always current prices)
4. **Explicit choices** respected permanently
5. **Manual** control through country selector
6. **SEO-friendly** implementation with proper tags
7. **Fast** performance using local database
8. **B2B-optimized** - accurate pricing for current location

Result: Users always see prices and content for their current location (unless they explicitly choose otherwise), ensuring accurate pricing for B2B customers who may travel or operate in multiple countries.