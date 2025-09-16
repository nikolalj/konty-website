/**
 * Sitemap URL handler with lastmod tracking
 *
 * IMPORTANT: Update lastmod dates when content changes!
 */
export default defineSitemapEventHandler(() => {
  const contentUpdates = {
    // Main pages
    '/': '2025-09-15',
    '/pricing': '2025-09-15',
    '/demo': '2025-09-15',
    '/contact': '2025-09-15',

    // Products section
    '/products': '2025-09-15',
    '/products/retail': '2025-09-15',
    '/products/retail/features': '2025-09-15',
    '/products/hospitality': '2025-09-15',
    '/products/hospitality/features': '2025-09-15',
    '/products/download': '2025-09-15',
    '/products/faqdocs': '2025-09-15',

    // Solutions section
    '/solutions': '2025-09-15',
    '/solutions/restaurants': '2025-09-15',
    '/solutions/bars-cafes': '2025-09-15',
    '/solutions/fast-food': '2025-09-15',
    '/solutions/grocery-supermarkets': '2025-09-15',
    '/solutions/clothing-boutiques': '2025-09-15',
    '/solutions/convenience-stores': '2025-09-15',
    '/solutions/b2b': '2025-09-15',

    // Company pages
    '/client-stories': '2025-09-15',
    '/partners': '2025-09-15',

    // Blog (dynamic - handled by blog.ts)
    '/blog': '2025-09-15',

    // Legal
    '/privacy': '2025-09-15',
    '/terms': '2025-09-15',
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
