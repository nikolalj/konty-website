/**
 * Sitemap URL handler with lastmod tracking
 *
 * IMPORTANT: Update lastmod dates when content changes!
 */
export default defineSitemapEventHandler(() => {
  const contentUpdates = {
    '/': '2025-09-15',
    '/products': '2025-09-15',
    '/konty-retail': '2025-09-15',
    '/konty-hospitality': '2025-09-15',
    '/pricing': '2025-09-15',
    '/privacy': '2025-09-15',
    '/terms': '2025-09-15',
    '/demo': '2025-09-15',
    '/about': '2025-09-15',
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
