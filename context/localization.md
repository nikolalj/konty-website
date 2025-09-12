# Konty Website Localization Guide

## Overview

The Konty website automatically detects visitors' location and shows them country-specific content with local prices, currency, and language. This is achieved through a Cloudflare Workers edge wrapper that handles locale detection and redirects before requests reach the Nuxt application, ensuring optimal performance and minimal latency.

## Architecture

### Current Implementation (Edge Wrapper + Cloudflare Workers)

The localization system uses a two-layer architecture:

1. **Edge Wrapper** (`server-wrapper.ts`): Runs on Cloudflare Workers at the edge
   - Handles all locale detection and redirect logic
   - Processes requests before they reach Nuxt
   - Sets internal headers for downstream consumption
   - Zero latency overhead for geolocation

2. **Nuxt Application**: Receives pre-processed requests with locale context
   - Server middleware reads locale headers
   - Plugins inject locale into payload
   - Components display localized content

The system leverages Cloudflare's global edge network for instant country detection via the `request.cf.country` property.

### Core Principles

1. **Edge-First Processing** - Detection and redirects happen at Cloudflare edge before Nuxt
2. **Silent Redirects** - No "we redirected you" notifications
3. **Respect User Choice** - Manual selections are permanent via `explicit` flag
4. **Single Source of Truth** - Edge wrapper handles all redirect logic

## How It Works

```
Edge Wrapper (server-wrapper.ts on Cloudflare Workers)
├─ Detects country from request.cf.country
├─ Maps country to locale via COUNTRY_TO_LOCALE_MAP
├─ Checks cookie for manual selection (explicit flag)
├─ Determines redirect need
├─ Redirects if needed (302) with cookie
└─ Sets internal headers:
    ├─ X-Detected-Locale (geolocation result)
    └─ X-Current-Locale (URL-based locale)
    ↓
Server Middleware (02.locale-context.ts)
├─ Reads X-Detected-Locale header
├─ Reads X-Current-Locale header
└─ Sets event.context for downstream use
    ↓
Server Plugin (locale-payload.server.ts)
└─ Copies detectedLocale to nuxtApp.payload
    ↓
Server Plugin (site-config.ts)
└─ Uses X-Current-Locale to load locale-specific company data
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

### Edge Wrapper (Primary Logic)
**`server-wrapper.ts`** - Main locale detection and redirect handler
- Runs on Cloudflare Workers at the edge
- Detects country via `request.cf.country`
- Maps country to locale using `COUNTRY_TO_LOCALE_MAP`
- Checks cookie for explicit choice
- Redirects to locale URLs (302 redirect) with cookie
- Sets internal headers for Nuxt:
  - `X-Detected-Locale`: Geolocation result
  - `X-Current-Locale`: Current URL locale
- Bypasses redirects for:
  - Non-GET/HEAD requests
  - API routes (`/api/*`)
  - Static files (`.xml`, `.txt`, `.json`, etc.)
  - Paths with existing locale prefix

### Server Middleware
**`server/middleware/02.locale-context.ts`** - Context setter
- Reads headers set by edge wrapper
- Sets `event.context.detectedLocale`
- Sets `event.context.currentLocale`
- Provides fallback to DEFAULT_LOCALE

### Plugins

**`app/plugins/locale-payload.server.ts`** - Payload injection
```typescript
if (event?.context?.detectedLocale) {
  nuxtApp.payload.detectedLocale = event.context.detectedLocale
}
```

**`server/plugins/site-config.ts`** - Dynamic locale data
```typescript
const currentLocaleHeader = event.node.req.headers['x-current-locale']
const locale = (currentLocaleHeader || DEFAULT_LOCALE.code)
// Loads locale-specific company data for SEO/schema
```

### Configuration
**`config/locale.config.mjs`** - Central configuration (ES module for edge compatibility)
- `DEFAULT_LOCALE`: { code: 'rs', ... }
- `VALID_LOCALES`: ['me', 'rs', 'ba', 'us']
- `LOCALE_STRATEGY`: 'prefix_except_default'
- `COUNTRY_TO_LOCALE_MAP`: Country to locale mappings
- Shared between edge wrapper and Nuxt application

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

## Edge Wrapper Algorithm

### Simplified Flow
```
START (server-wrapper.ts)
├─ Detect country from request.cf.country
├─ Map to locale or use DEFAULT_LOCALE
│
├─ Check if should skip redirect:
│   ├─ Non-GET/HEAD requests → skip
│   ├─ shouldSkipPath() checks:
│   │   ├─ /api/* → skip
│   │   ├─ /_* → skip  
│   │   ├─ Static files (.xml, .txt, .json) → skip
│   │   └─ Files with extensions → skip
│   └─ Has locale prefix (/me/, /rs/, etc) → skip
│
├─ If not skipping redirect:
│   ├─ Parse cookie (only when needed)
│   ├─ Determine target locale:
│   │   ├─ If cookie.explicit && valid → use cookie.locale
│   │   └─ Else → use detected locale
│   │
│   └─ If target != DEFAULT_LOCALE:
│       ├─ Build redirect URL with locale prefix
│       ├─ Preserve query parameters
│       ├─ Set/update cookie if needed
│       └─ Return 302 redirect
│
└─ No redirect needed:
    ├─ Set X-Detected-Locale header
    ├─ Set X-Current-Locale header
    └─ Pass modified request to Nuxt
```

### Detailed Redirect Logic
```
                    ┌─────────────┐
                    │ User visits │
                    │ konty.com/* │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   Detect    │  ← Via request.cf.country
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
               │Set headers: │
               │X-Detected-  │     ← Geolocation result
               │X-Current-   │     ← URL-based locale
               └──────┬──────┘
                      │
               ┌──────▼──────┐
               │   Return    │
               │   response  │
               └─────────────┘
```

**Key Implementation Details**:
1. Detection happens at edge via `request.cf.country`
2. Cookie with `explicit: true` overrides geolocation
3. DEFAULT_LOCALE (Serbia) uses root path without prefix
4. Internal headers (X-Detected-Locale, X-Current-Locale) pass context to Nuxt
5. Headers are internal only - not exposed in client responses
6. Cookie parsing only happens when redirect logic needs it (performance)

## Deployment

### Current: Cloudflare Workers + Pages

The application uses a two-tier deployment:

1. **Edge Wrapper** (`server-wrapper.ts`):
   - Deployed as Cloudflare Worker via `wrangler.toml`
   - Handles all requests at the edge
   - Access to `request.cf` object for geolocation
   - Minimal latency overhead (~1ms)

2. **Nuxt Application**:
   - Built with `nitro` preset: `cloudflare-module`
   - Deployed to Cloudflare Pages/Workers
   - Receives pre-processed requests from edge wrapper

### Key Requirements

- **Cloudflare-specific**: Relies on `request.cf.country` for geolocation
- **Edge wrapper**: Must intercept requests before Nuxt
- **Cookie access**: Platform must support reading/writing cookies
- **Header passing**: Internal headers must flow from edge to Nuxt

## Testing

```bash
# Test geolocation redirect (uses your actual IP location)
curl -I https://konty.com
# Shows: location: https://konty.com/[your-locale]/

# Test with explicit cookie preference
curl -I -H 'Cookie: konty-locale={"locale":"us","explicit":true}' https://konty.com
# Shows: location: https://konty.com/us/

# Test that locale paths don't redirect
curl -I https://konty.com/me/
# Shows: HTTP/2 200 (or 301 to staging domain)

# Test API bypass
curl -I https://konty.com/api/ping
# Shows: HTTP/2 404 (no redirect)

# Test static file bypass  
curl -I https://konty.com/robots.txt
# Shows: HTTP/2 200 (no redirect)

# Local testing with country simulation
curl -I http://localhost:8787/  # Uses wrangler --cf country=XX

# Note: Internal headers (X-Detected-Locale, X-Current-Locale) 
# are NOT visible in external responses - they're internal only
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
**Check**: Edge wrapper logs for `request.cf.country`
**Fix**: Verify Cloudflare proxy is enabled and domain is orange-clouded

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
- Always detect locale at edge wrapper
- Respect explicit user choices permanently
- Use silent redirects
- Keep edge logic simple and fast
- Pass locale context via internal headers
- Test with VPNs from different countries
- Parse cookies only when needed (performance)

### Don'ts ❌
- Don't duplicate redirect logic in Nuxt
- Don't show redirect notifications
- Don't ignore explicit choices
- Don't redirect API or static files
- Don't expose internal headers to clients
- Don't forget to validate cookie locales

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

1. **Edge-first** detection via Cloudflare Workers (~1ms overhead)
2. **Silent** redirects without notifications
3. **Manual** control via country selector with permanent preference
4. **Smart banner** with session-based dismissal
5. **Visual indicators** (pulsing dot for mismatch)
6. **Cloudflare-optimized** architecture using `request.cf`
7. **Clean separation** - edge handles redirects, Nuxt handles content
8. **Type-safe** implementation with TypeScript
9. **Performance optimized** - cookie parsing only when needed
10. **Internal headers** for secure context passing

Result: Users see content for their location automatically with ~1ms latency, have full control to switch if desired, and experience optimal performance through edge-first architecture.
