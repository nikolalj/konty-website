# Konty Website Localization Guide

## Overview

The Konty website automatically detects visitors' location and shows them country-specific content with local prices, currency, and language. This happens via Nuxt server middleware that runs on Cloudflare's edge infrastructure through NuxtHub, ensuring optimal performance.

## Architecture

### Current Implementation (NuxtHub + Cloudflare Edge)

The localization system now runs entirely within Nuxt's server middleware on Cloudflare's edge network:

- **NuxtHub Deployment**: Server code runs directly on Cloudflare edge workers
- **No Separate Edge Functions**: All logic is in Nuxt server middleware (`server/middleware/02.locale-redirect.ts`)
- **Cloudflare Headers**: Uses `cf-ipcountry` header for country detection
- **Context Passing**: Detected locale is passed via `event.context.detectedLocale`

The system no longer uses separate Cloudflare Functions (`functions/_middleware.ts`) - everything runs within the Nuxt application on the edge.

### Core Principles

1. **Edge Processing** - Detection and redirects happen on Cloudflare edge via NuxtHub
2. **Silent Redirects** - No "we redirected you" notifications
3. **Respect User Choice** - Manual selections are permanent via `explicit` flag
4. **Nuxt-Native** - Uses standard Nuxt server middleware, no external functions

## How It Works

```
Server Middleware (Nuxt on Cloudflare Edge)
├─ Detects country from cf-ipcountry header
├─ Maps country to locale
├─ Checks cookie for manual selection
├─ Determines redirect need
├─ Sets event.context.detectedLocale
└─ Redirects if needed (302)
    ↓
Server Plugin (locale-payload.server.ts)
└─ Copies detectedLocale to nuxtApp.payload
    ↓
Application (Vue)
├─ Reads from nuxtApp.payload.detectedLocale
├─ Shows locale suggestion banner
└─ Displays localized content
```

## Supported Countries

| Country | URL | Currency | Language | Flag Icon |
|---------|-----|----------|----------|-----------|
| Serbia 🇷🇸 | konty.com | RSD (Din) | Serbian | i-circle-flags:rs |
| Montenegro 🇲🇪 | konty.com/me | EUR (€) | Montenegrin | i-circle-flags:me |
| Bosnia 🇧🇦 | konty.com/ba | BAM (KM) | Bosnian | i-circle-flags:ba |
| USA 🇺🇸 | konty.com/us | USD ($) | English | i-circle-flags:us |

### Country Mapping

```javascript
'ME' → 'me'  // Montenegro
'RS' → 'rs'  // Serbia (default)
'BA' → 'ba'  // Bosnia
'US' → 'us'  // USA

// Neighboring countries
'HR' → 'ba'  // Croatia → Bosnia
'SI' → 'rs'  // Slovenia → Serbia
'MK' → 'rs'  // Macedonia → Serbia
'AL' → 'me'  // Albania → Montenegro

// English-speaking
'GB', 'CA', 'AU', 'NZ', 'IE' → 'us'
```

## URL Structure

Using `prefix_except_default` strategy:

- **Serbia** (default): `konty.com`, `konty.com/pricing`
- **Other locales**: `konty.com/me`, `konty.com/me/pricing`

### Pages with Automatic Locale Redirect

**All content pages are fully localized** and visitors are automatically redirected to their locale-specific URLs based on their location:

1. `/` - Homepage
2. `/pricing` - Pricing page with local currency
3. `/demo` - Demo request
4. `/konty-retail` - Retail product page
5. `/konty-hospitality` - Hospitality product page
6. `/products` - Products overview
7. `/about` - About page
8. `/terms` - Terms of service
9. `/privacy` - Privacy policy

### Excluded from Redirect (Technical Routes)

These are never redirected as they're not content pages:

- `/api/*` - API routes
- `/_nuxt/*` - Build assets
- `/blog/*` - Blog posts (future)
- Static files (`.css`, `.js`, `.xml`, `.txt`, images)

## Cookie System

```json
{
  "locale": "me",        // Current locale
  "explicit": false      // true = manual selection, false = auto-detected
}
```

- **Name**: `konty-locale`
- **Duration**: 1 year
- **Size**: ~30 bytes

### Cookie Behavior

- `explicit: false` - Always uses fresh detection
- `explicit: true` - Respects manual choice regardless of location

## Implementation Files

### Server Middleware (Primary Logic)
**`server/middleware/02.locale-redirect.ts`** - Main locale detection and redirect handler
- Runs on Cloudflare edge via NuxtHub
- Detects country via `cf-ipcountry` header
- Maps country to locale using `COUNTRY_TO_LOCALE_MAP`
- Checks cookie for explicit choice
- Redirects to locale URLs (302 redirect)
- Sets `event.context.detectedLocale` for downstream use
- Handles all redirect logic and cookie management

### Plugin
**`app/plugins/locale-payload.server.ts`** - Payload injection
```typescript
if (event?.context?.detectedLocale) {
  nuxtApp.payload.detectedLocale = event.context.detectedLocale
}
```

### Configuration
**`config/locale.config.ts`** - Central configuration
- `DEFAULT_LOCALE`: 'rs'
- `VALID_LOCALES`: ['me', 'rs', 'ba', 'us']
- `STRATEGY`: 'prefix_except_default'
- `COUNTRY_TO_LOCALE_MAP`: Country mappings

### Types
**`app/types/locale.d.ts`** - TypeScript definitions
- `ValidLocale`: 'me' | 'rs' | 'ba' | 'us'
- `LocaleCookie`: { locale, explicit }
- `LocaleConfig`: Extended locale object

### Components

#### CountrySelector.vue
Located in header, provides manual country switching:

**Features:**
- Flag icon button showing current locale
- Pulsing dot indicator when detected ≠ current
- Dropdown with all locales
- "Recommended" badge for detected locale
- Checkmark for current selection
- Sets `explicit: true` on selection

**Behavior:**
- Reads `detectedLocale` from `nuxtApp.payload`
- Sorts recommended locale to top
- Updates cookie and navigates on selection
- Shows globe icon as fallback

#### LocaleSuggestionBanner.vue
Shows when detected locale doesn't match current:

**Display Logic:**
```javascript
shouldShow =
  suggestedLocale exists &&
  !cookie.explicit &&
  !recently dismissed
```

**Features:**
- Slide-in animation from top
- Three buttons: X (dismiss), Stay Here, Switch
- Auto-hides on scroll (>100px)
- Session storage dismissal (4 hours)

**Actions:**
- **X button**: Temporary dismissal (session)
- **Stay Here**: Sets `explicit: true` for current
- **Switch**: Sets `explicit: true` for suggested

## User Journeys

### New Visitor from Montenegro

```
1. Visits konty.com
2. CF detects country: ME
3. Redirects to konty.com/me
4. Cookie: {locale: "me", explicit: false}
5. Sees EUR prices, flag shows 🇲🇪
```

### Manual Country Switch

```
1. Clicks flag selector in header
2. Sees dropdown with checkmark on current
3. Chooses "Serbia"
4. Cookie: {locale: "rs", explicit: true}
5. Redirected to konty.com
6. Always sees Serbian version
7. No more suggestions
```

### Traveling User (Non-Explicit)

```
1. Serbian user visits from Montenegro
2. Fresh detection: ME
3. Redirects to konty.com/me
4. Flag shows 🇲🇪, no pulsing dot
5. Returns to Serbia → redirects back to konty.com
```

### Cross-Locale Browsing

```
1. Serbian user directly visits konty.com/me/pricing
2. Detection runs, finds RS
3. Flag shows 🇲🇪 with pulsing dot
4. Banner appears after page load
5. Can switch (explicit), stay (explicit), or dismiss (4h)
```

### Banner Dismissal Logic

```
Dismiss (X) clicked:
├─ Saves to sessionStorage:
│   - timestamp
│   - current locale
│   - suggested locale
├─ Hidden for 4 hours
└─ Only for this exact suggestion

Stay/Switch clicked:
├─ Sets explicit: true
├─ Updates locale
└─ Never shows banner again
```

## Performance

| Operation | Time | Method |
|-----------|------|--------|
| Country detection | 0ms | Edge function with cf-ipcountry |
| Locale mapping | <1ms | In-memory map |
| Cookie parse | <1ms | Edge function |
| Redirect decision | <1ms | Edge logic |
| Total overhead | ~1ms | All at edge |

## Server Middleware Algorithm

### Simplified Flow
```
START
├─ Quick Exits (return)
│   ├─ Non-GET/HEAD requests
│   ├─ Excluded patterns (/api/, /_nuxt/, /blog, etc)
│   └─ Static files (.css, .js, .xml, etc)
│
├─ Already on Locale URL? (/me/*, /ba/*, /us/*)
│   ├─ Detect locale from cf-ipcountry
│   ├─ Set event.context.detectedLocale
│   └─ Return (no redirect)
│
├─ Page in PAGES_TO_REDIRECT list?
│   ├─ No → Return (no redirect)
│   └─ Yes → Continue
│
└─ Redirect Logic
    ├─ Detect locale from cf-ipcountry
    ├─ Read cookie (konty-locale)
    ├─ If cookie.explicit → use cookie.locale
    ├─ Else → use detected locale
    ├─ Set/update cookie if needed
    ├─ If target = DEFAULT_LOCALE (rs) → no redirect
    └─ Else → 302 redirect to /locale/path
```

### Detailed Redirect Logic (for localized pages)
```
                    ┌─────────────┐
                    │ User visits │
                    │ konty.com/* │ (localized page)
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   Detect    │  ← ALWAYS happens first
                    │   country   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ Read cookie │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │Determine    │
                    │target locale│
                    └──────┬──────┘
                           │
                ┌──────────┴──────────┐
                │                     │
        cookie?.│                     │ !cookie?.explicit
        explicit│                     │ or no cookie
                │                     │
         ┌──────▼──────┐       ┌──────▼──────┐
         │Use cookie   │       │Use detected │
         │locale       │       │locale       │
         └──────┬──────┘       └──────┬──────┘
                │                     │
                └──────┬──────────────┘
                       │
                ┌──────▼───────┐
                │Target locale │
                │= DEFAULT?    │
                │(Serbia)      │
                └──────┬───────┘
                       │
        ┌──────────────┼──────────────┐
        │                             │
     Yes│                          No │
        │                             │
 ┌──────▼──────┐              ┌──────▼──────┐
 │NO REDIRECT  │              │REDIRECT to  │
 │Stay on      │              │/locale/path │
 │konty.com    │              └───────┬─────┘
 └──────┬──────┘                      │
        │                             │
        ├─────────────┬───────────────┘
        │             │
        │      ┌──────▼──────┐
        │      │Update cookie│
        │      │if needed    │
        │      └──────┬──────┘
        │             │
        └─────────────┤
                      │
               ┌──────▼──────┐
               │Set header:  │
               │x-detected-  │     ← ALWAYS detected value
               │locale       │
               └──────┬──────┘
                      │
               ┌──────▼──────┐
               │   Return    │
               │   response  │
               └─────────────┘
```

**Key Implementation Details**:
1. Detection ALWAYS happens first
2. Cookie determines redirect target, not detection
3. DEFAULT_LOCALE (Serbia) never redirects, stays at root
4. x-detected-locale header ALWAYS gets fresh detected value
5. Cookie updates preserve explicit flag if it exists

## Deployment

### Current: NuxtHub + Cloudflare

The application is deployed via NuxtHub which automatically:
1. Deploys server middleware to Cloudflare Workers
2. Provides access to `cf-ipcountry` header for geolocation
3. Runs all server code on the edge network
4. No additional configuration needed

### Key Requirements

- **Cloudflare-specific**: The current implementation relies on Cloudflare's `cf-ipcountry` header
- **Edge deployment**: Server middleware must run on edge for optimal performance
- **Cookie access**: Platform must support reading/writing cookies

## Testing

```bash
# Test with specific locale cookie
curl -H 'Cookie: konty-locale={"locale":"me","explicit":false}' https://konty.com

# Test country detection (Cloudflare)
curl -H 'CF-IPCountry: ME' https://konty.com

# Check headers in response
curl -I https://konty.com/pricing
# Should see: x-detected-locale: rs

# Test manual selection persistence
# 1. Visit site, get auto-detected
# 2. Switch country via selector
# 3. Clear browser cache (not cookies)
# 4. Should stay on selected country
```

## Translation Files

Located in `app/locales/`:
- `rs.json` - Serbian (311+ keys)
- `me.json` - Montenegrin (311+ keys)
- `ba.json` - Bosnian (311+ keys)
- `us.json` - English (311+ keys)

## Troubleshooting

### Detection Not Working

**Symptom**: Everyone sees default (Serbia)
**Check**: Edge function logs for cf-ipcountry header
**Fix**: Verify Cloudflare proxy is enabled

### Wrong Country Detected

**Cause**: VPN/proxy shows different location
**Solution**: User can manually switch via selector (permanent)

### Banner Not Showing

**Check**:
1. Cookie for `explicit: true`
2. SessionStorage for dismissal
3. Detected locale vs current

**Solution**: Clear cookies/storage or wait 4 hours

### Pulsing Dot Not Showing

**Check**: `nuxtApp.payload.detectedLocale`
**Cause**: Detection matches current locale
**Expected**: Working correctly

### Country Selector Not Working

**Check**: Browser console for errors
**Common**: Cookie not setting properly
**Fix**: Check cookie domain/path settings

## Best Practices

### Do's ✅
- Always detect locale at edge
- Respect explicit user choices permanently
- Use silent redirects
- Keep edge logic simple
- Pass detected locale to all pages
- Test with VPNs from different countries

### Don'ts ❌
- Don't duplicate logic between edge and server
- Don't show redirect notifications
- Don't ignore explicit choices
- Don't redirect universal content pages
- Don't process locales in server middleware
- Don't forget to set x-detected-locale header

## Configuration Reference

### nuxt.config.ts
```typescript
i18n: {
  defaultLocale: 'rs',
  strategy: 'prefix_except_default',
  detectBrowserLanguage: false,  // We use IP detection
  locales: [
    {
      code: 'rs',
      iso: 'sr-RS',
      name: 'Srbija',
      file: 'rs.json',
      flag: 'i-circle-flags:rs',
      currency: 'RSD',
      currencySymbol: 'Din'
    },
    // ... other locales
  ]
}
```

## Summary

The localization system provides:

1. **Automatic** detection at edge (0ms overhead)
2. **Silent** redirects without notifications
3. **Manual** control via country selector
4. **Smart banner** with session-based dismissal
5. **Visual indicators** (pulsing dot for mismatch)
6. **Provider-agnostic** architecture
7. **Minimal** server-side logic (just header reading)
8. **Type-safe** implementation with TypeScript

Result: Users see content for their location automatically, with full control to switch if desired, all with optimal performance and great UX.
