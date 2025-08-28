/**
 * SEO Configuration
 * Centralized configuration for all SEO-related settings
 */

export const SEO_CONFIG = {
  siteName: 'Konty',
  defaultAuthor: 'Konty Team',
  twitterCard: 'summary_large_image' as const,
  
  // OG image mappings - these should be actual images, not SVGs
  // TODO: Generate proper OG images (1200x630 JPG/PNG)
  ogImages: {
    '/': '/og-images/home.png',
    '/pricing': '/og-images/pricing.png',
    '/products': '/og-images/products.png',
    '/konty-retail': '/og-images/retail.png',
    '/konty-hospitality': '/og-images/hospitality.png',
    '/demo': '/og-images/demo.png',
    '/about': '/og-images/about.png',
    // Fallback image
    default: '/og-images/default.svg'
  }
} as const