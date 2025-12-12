/**
 * Sitemap URL handler with lastmod tracking
 *
 * IMPORTANT: Update lastmod dates when content changes!
 */
export default defineSitemapEventHandler(() => {
  const contentUpdates = {
    // Main pages
    '/': '2025-12-12',
    '/pricing': '2025-12-12',
    '/demo': '2025-12-12',
    '/contact': '2025-12-12',

    // Products section
    '/products': '2025-12-12',
    '/products/retail': '2025-12-12',
    '/products/retail/features': '2025-12-12',
    '/products/hospitality': '2025-12-12',
    '/products/hospitality/features': '2025-12-12',
    '/products/download': '2025-12-12',
    '/products/faqdocs': '2025-12-12',

    // Solutions section
    '/solutions': '2025-12-12',
    '/solutions/restaurants': '2025-12-12',
    '/solutions/bars-cafes': '2025-12-12',
    '/solutions/fast-food': '2025-12-12',
    '/solutions/grocery-supermarkets': '2025-12-12',
    '/solutions/clothing-boutiques': '2025-12-12',
    '/solutions/general-stores': '2025-12-12',
    '/solutions/b2b': '2025-12-12',

    // Company pages
    '/client-stories': '2025-12-12',
    '/partners': '2025-12-12',

    // Blog (dynamic - handled by blog.ts)
    '/blog': '2025-12-12',

    // Legal
    '/privacy': '2025-12-12',
    '/terms': '2025-12-12',
    '/data-processing': '2025-12-12',
  }

  // Return URLs with lastmod dates
  return Object.entries(contentUpdates).map(([loc, lastmod]) => ({
    loc,
    // Enable i18n transformation to generate all locale variants
    _i18nTransform: true,
    // Only include lastmod if we have a date
    ...(lastmod && { lastmod })
  }))
})
