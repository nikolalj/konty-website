# Konty Website - Technical Documentation

## Overview
This document provides a comprehensive technical overview of the Konty POS website implementation. It serves as a reference for developers working on the project, ensuring consistent understanding of the architecture, patterns, and conventions used.

## Tech Stack

### Core Framework
- **Nuxt 4** - Vue 3 meta-framework with SSR/SSG capabilities
- **Vue 3** - Composition API with `<script setup>` syntax
- **TypeScript** - Strict mode enabled for type safety
- **Nitro 2.12.4** - Universal deployment engine

### UI & Styling
- **@nuxt/ui-pro 3.3.2** - Premium component library
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Design System** - CSS variables with modern color mixing
- **Plus Jakarta Sans** - Self-hosted variable font

### Build & Development
- **Vite** - Fast build tool with HMR
- **pnpm** - Efficient package manager
- **ESLint** - Code linting with Nuxt config
- **Terser** - JavaScript minification
- **CSSnano** - CSS optimization

### Performance & SEO
- **@nuxt/image** - Automatic image optimization (AVIF/WebP)
- **@nuxtjs/seo** - Meta tags, sitemap, robots.txt
- **Web Vitals** - Performance monitoring
- **Google Analytics** - User tracking (via nuxt-gtag)

### Internationalization
- **@nuxtjs/i18n** - Country-based localization (ME, RS, BA, US)
- **Server-side detection** - IP-based country detection with redirects
- **Cookie persistence** - Saves user's locale preference

## Project Structure

```
konty-website/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css          # Global styles & theme
│   ├── components/
│   │   ├── App/                  # Layout components (Header, Footer)
│   │   ├── Home/                 # Homepage-specific components
│   │   ├── KontyHospitality/     # Hospitality product components
│   │   ├── KontyRetail/          # Retail product components
│   │   ├── Shared/               # Reusable business components
│   │   ├── Schema/               # SEO structured data
│   │   └── UI/                   # Custom UI primitives
│   ├── composables/
│   │   ├── useCookieConsent.ts   # Cookie consent logic
│   │   ├── useCountryDetection.ts # Country detection & locale switching
│   │   ├── useFeaturedImage.ts   # Image handling
│   │   └── useSeoMeta.ts         # SEO meta helper
│   ├── locales/                  # Translation files
│   │   ├── me.json               # Montenegro translations
│   │   ├── rs.json               # Serbia translations
│   │   ├── ba.json               # Bosnia translations
│   │   └── us.json               # US English translations
│   ├── layouts/
│   │   └── default.vue           # Main layout wrapper
│   ├── pages/                    # File-based routing
│   │   ├── index.vue             # Homepage
│   │   ├── konty-hospitality.vue # Hospitality product page
│   │   ├── konty-retail.vue      # Retail product page
│   │   ├── pricing.vue           # Pricing page
│   │   ├── demo.vue              # Demo request page
│   │   └── about.vue             # About page
│   ├── plugins/
│   │   ├── analytics.client.ts   # Google Analytics setup
│   │   ├── csp.server.ts         # Content Security Policy
│   │   └── web-vitals.client.ts  # Performance monitoring
│   ├── utils/
│   │   └── appearObserver.ts     # IntersectionObserver pooling
│   └── app.config.ts             # App configuration
├── server/                        # Server-side code
│   ├── api/
│   │   └── detect-country.ts    # API endpoint for country detection
│   └── middleware/
│       └── locale-detection.ts  # Server middleware for locale redirects
├── public/                        # Static assets
│   ├── fonts/                    # Self-hosted fonts
│   └── images/                   # Static images
├── nuxt.config.ts                # Nuxt configuration
├── i18n.config.ts                # i18n configuration
├── package.json                  # Dependencies & scripts
└── tsconfig.json                 # TypeScript config
```

## Key Architectural Patterns

### 1. Component Organization

Components follow an atomic design pattern:
- **UI Components** (`UI/`) - Primitive, reusable UI elements
- **Shared Components** (`Shared/`) - Business logic components used across pages
- **Page Components** (`Home/`, `KontyHospitality/`, etc.) - Page-specific components

Example component structure:
```vue
<template>
  <section class="py-12 sm:py-16">
    <UContainer>
      <!-- Component content -->
    </UContainer>
  </section>
</template>

<script setup lang="ts">
// Always use Composition API with script setup
const config = ref({
  title: 'Component Title',
  description: 'Component description'
})

// Props with TypeScript
const props = defineProps<{
  product?: 'kontyRetail' | 'kontyHospitality'
}>()
</script>
```

### 2. Animation System

Custom appear-on-scroll animations using IntersectionObserver:
```vue
<!-- Using UIAppear component -->
<UIAppear direction="right" :distance="32">
  <div>Animated content</div>
</UIAppear>

<!-- Available directions: up, down, left, right, none -->
<!-- Respects prefers-reduced-motion -->
```

### 3. SEO Implementation

Centralized SEO handling via composable:
```typescript
// In any page component
useCustomSeoMeta({
  title: 'Page Title',
  description: 'Page description',
  type: 'website'
})
```

### 4. Image Optimization

Using Nuxt Image with presets:
```vue
<NuxtImg
  src="/path/to/image.jpg"
  preset="hero"        <!-- Uses predefined optimization settings -->
  loading="lazy"
  alt="Description"
/>
```

Available presets (defined in nuxt.config.ts):
- `hero` - 1200x600, quality 90
- `card` - 600x400, quality 85
- `thumbnail` - 300x200, quality 75
- `avatar` - 100x100, quality 90

## Configuration Files

### nuxt.config.ts
Main configuration with:
- Module setup
- Build optimizations
- Route rules & redirects
- Security headers
- Image optimization presets
- i18n configuration

### app.config.ts
Runtime app configuration:
- UI theme colors
- Component defaults

## Performance Optimizations

### Build-Time
- **Code Splitting** - Automatic vendor chunks
- **Tree Shaking** - Removes unused code
- **CSS Optimization** - CSSnano in production
- **Image Processing** - AVIF/WebP generation

### Runtime
- **Lazy Loading** - Components and images
- **Link Prefetching** - On visibility and hover
- **ISR** - Incremental Static Regeneration for pages
- **Payload Extraction** - Faster hydration

### Caching Strategy
```javascript
// Static assets - 1 year cache
'/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } }

// ISR pages
'/': { isr: 3600 },        // Regenerate every hour
'/pricing': { isr: 86400 }  // Regenerate daily
```

## Development Workflow

### Available Scripts
```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm typecheck  # Run TypeScript checks
pnpm lint       # Run ESLint
pnpm lint:fix   # Fix ESLint issues
```

### Environment Variables
```bash
# .env file
NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
NUXT_PUBLIC_SITE_URL=https://konty.com
```

## Localization System

### Overview
The website uses **country-based localization** (not language-based) targeting specific markets: Montenegro (ME), Serbia (RS), Bosnia (BA), and USA (US).

### How It Works

#### 1. Server-Side Detection (Initial Visit)
```typescript
// server/middleware/locale-detection.ts
1. User visits konty.com
2. Server checks for saved cookie
3. If no cookie, detects country via IP (api.country.is, ipapi.co)
4. Maps country to locale (ME→me, RS→rs, BA→ba, US→us)
5. Redirects to localized URL (/me, /rs, etc.)
6. Sets cookie for future visits
```

#### 2. Country to Locale Mapping
```typescript
const COUNTRY_TO_LOCALE_MAP = {
  'ME': 'me', // Montenegro
  'RS': 'rs', // Serbia  
  'BA': 'ba', // Bosnia
  'US': 'us', // United States
  // Neighboring countries fallback
  'HR': 'ba', // Croatia → Bosnia
  'SI': 'rs', // Slovenia → Serbia
  // English-speaking fallback
  'GB': 'us', // UK → US English
}
```

#### 3. URL Structure
- Default locale (RS): `/pricing`, `/demo`
- Other locales: `/me/pricing`, `/us/demo`
- Strategy: `prefix_except_default`

#### 4. Manual Switching
- User clicks flag icon in header (CountrySelector component)
- Updates cookie and navigates to new locale
- Persists for 1 year

### Key Files

- **`server/middleware/locale-detection.ts`** - Server-side redirect logic
- **`server/api/detect-country.ts`** - IP geolocation API endpoint
- **`app/composables/useCountryDetection.ts`** - Client-side locale management
- **`app/components/App/CountrySelector.vue`** - Country switcher UI
- **`app/locales/*.json`** - Translation files
- **`i18n.config.ts`** - i18n configuration

### Important Notes

1. **No browser language detection** - Uses IP-based country detection only
2. **Server-side first** - Prevents flash of wrong content
3. **Cookie persistence** - Saves preference for 1 year
4. **Fallback** - Default to Serbia (RS) if detection fails

## Common Tasks

### Adding a New Page
1. Create file in `app/pages/` (e.g., `features.vue`)
2. Add SEO meta using `useCustomSeoMeta`
3. Update navigation in `App/Header.vue`
4. Add to sitemap in `nuxt.config.ts`

### Creating a Component
1. Choose appropriate directory (`UI/`, `Shared/`, or page-specific)
2. Use `<script setup>` syntax
3. Add TypeScript types for props
4. Follow existing naming conventions

### Adding Translations
1. Add translation keys to all locale files (`app/locales/*.json`)
2. Use in templates: `{{ $t('key.nested.value') }}`
3. Use in script: `const { t } = useI18n(); t('key.nested.value')`
4. For dynamic locale paths: `const localePath = useLocalePath(); localePath('/pricing')`

### Adding Analytics Events
```typescript
const { $track } = useNuxtApp()

// Track conversions
$track?.conversion?.('Signup')

// Track CTA clicks
$track?.ctaClick?.('Start Trial', 'Hero')

// Track form submissions
$track?.contactForm?.()
```

## Styling Conventions

### CSS Variables
The theme uses CSS custom properties:
```css
/* Light mode */
--ui-primary: #1F6FE2;
--ui-bg: #ffffff;

/* Dark mode automatically switches */
:root.dark {
  --ui-primary: #52a2ff;
  --ui-bg: #151A28;
}
```

### Tailwind Classes
- Use spacing utilities: `py-12 sm:py-16`
- Responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Dark mode: `dark:bg-gray-800`

## Security Considerations

### Headers
Security headers are set in `nitro.routeRules`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: Restrictive

### CSP
Content Security Policy implemented via `plugins/csp.server.ts`

## Deployment

The site is configured for edge deployment with:
- Nitro universal engine
- Static asset optimization
- Prerendered pages
- ISR support

### Build Output
```bash
.output/
├── public/        # Static assets
├── server/        # Nitro server
└── nitro.json     # Deployment config
```

## Known Issues & TODOs

### Critical
- [ ] Demo form is not functional (placeholder only)
- [ ] Contact form doesn't submit to backend
- [ ] No error handling for failed operations

### Important
- [ ] Replace external image URLs with local assets
- [ ] Implement proper form validation
- [ ] Add loading states for async operations
- [ ] Complete i18n translations

### Nice to Have
- [ ] Add test coverage
- [ ] Implement CMS integration
- [ ] Add PWA features
- [ ] Enhance accessibility

## Best Practices

1. **Always use TypeScript** - Maintain type safety
2. **Optimize images** - Use NuxtImg with appropriate presets
3. **Follow component patterns** - Maintain consistency
4. **Test on mobile** - Mobile-first approach
5. **Monitor performance** - Check Web Vitals regularly
6. **Update dependencies** - Keep packages current
7. **Document changes** - Update this file when adding major features

## Resources

- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [Nuxt UI Pro](https://ui.nuxt.com)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

*Last updated: 2025-08-21*
*Maintained by: Konty Development Team*
