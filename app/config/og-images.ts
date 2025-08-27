/**
 * OpenGraph Image Configuration
 * 
 * Best practice for static SaaS sites:
 * - Pre-designed images for each key page
 * - Optimized through Nuxt Image presets
 * - Consistent branding across all shares
 */

interface OgImageConfig {
  path: string        // Image source path
  width?: number      // Override default width
  height?: number     // Override default height
  alt: string        // Alt text for accessibility
}

/**
 * Page-specific OG images
 * Images should be placed in public/og/ directory
 * Recommended: Create branded templates in Figma/Canva at 1200x630px
 */
export const pageOgImages: Record<string, OgImageConfig> = {
  '/': {
    path: '/og/homepage.jpg',
    alt: 'Konty POS - Moderan sistem za upravljanje prodajom'
  },
  '/products': {
    path: '/og/products.jpg',
    alt: 'Konty proizvodi - Rešenja za maloprodaju i ugostiteljstvo'
  },
  '/konty-retail': {
    path: '/og/retail.jpg',
    alt: 'Konty Retail - POS sistem za maloprodaju'
  },
  '/konty-hospitality': {
    path: '/og/hospitality.jpg',
    alt: 'Konty Hospitality - POS sistem za restorane i kafiće'
  },
  '/pricing': {
    path: '/og/pricing.jpg',
    alt: 'Konty cene - Fleksibilni paketi za svaki biznis'
  },
  '/demo': {
    path: '/og/demo.jpg',
    alt: 'Isprobajte Konty POS - Besplatna demo verzija'
  },
  '/about': {
    path: '/og/about.jpg',
    alt: 'O nama - Konty tim i misija'
  },
  '/privacy': {
    path: '/og/legal.jpg', // Shared for legal pages
    alt: 'Konty - Pravne informacije'
  },
  '/terms': {
    path: '/og/legal.jpg', // Shared for legal pages
    alt: 'Konty - Uslovi korišćenja'
  }
}

// Default fallback
export const defaultOgImage: OgImageConfig = {
  path: '/og/default.jpg',
  alt: 'Konty POS - Moderan sistem za upravljanje prodajom'
}

/**
 * Get OG image configuration for a route
 */
export function getOgImageConfig(routePath: string): OgImageConfig {
  // Remove locale prefix and query params
  const cleanPath = routePath
    .replace(/^\/(me|ba|us|rs)/, '')
    .split('?')[0] || '/'
  
  return pageOgImages[cleanPath] || defaultOgImage
}