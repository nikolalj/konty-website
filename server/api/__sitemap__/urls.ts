interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

/**
 * SITEMAP LASTMOD TRACKING
 *
 * ⚠️ IMPORTANT: Update lastmod dates when making significant changes!
 *
 * When to update lastmod:
 * - Content changes (text, images, features)
 * - Pricing updates (CRITICAL - always update)
 * - Legal document changes (privacy, terms)
 * - Major UI/UX changes
 *
 * When NOT to update:
 * - Minor styling tweaks
 * - Code refactoring with no user-visible changes
 * - Typo fixes (unless in critical content)
 *
 * CHECKLIST before committing:
 * 1. Did you modify page content? → Update lastmod
 * 2. Is it a pricing change? → Update /pricing lastmod immediately
 * 3. Legal update? → Update /privacy or /terms lastmod
 *
 * Format: YYYY-MM-DD (ISO 8601)
 */

// Static page configurations with manual lastmod tracking
const staticPages: Array<{
  loc: string
  priority: number
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  lastmod?: string
  note?: string // Internal notes about what triggers updates
}> = [
  {
    loc: '/',
    priority: 1.0,
    changefreq: 'weekly',
    lastmod: '2025-01-27', // UPDATE: When hero, main features, or key messaging changes
    note: 'Homepage - hero, features, CTAs'
  },
  {
    loc: '/products',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2025-01-20', // UPDATE: When product descriptions or features change
    note: 'Product overview page'
  },
  {
    loc: '/konty-retail',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2025-01-20', // UPDATE: When retail features or content changes
    note: 'Retail product page'
  },
  {
    loc: '/konty-hospitality',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2025-01-20', // UPDATE: When hospitality features or content changes
    note: 'Hospitality product page'
  },
  {
    loc: '/pricing',
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: '2025-01-25', // ⚠️ CRITICAL: Always update when prices change!
    note: 'PRICING - Must update on any price/plan changes'
  },
  {
    loc: '/demo',
    priority: 0.8,
    changefreq: 'monthly',
    // No lastmod - demo page rarely changes significantly
    note: 'Demo request form'
  },
  {
    loc: '/about',
    priority: 0.6,
    changefreq: 'yearly',
    // No lastmod - about page is relatively static
    note: 'Company info, team, mission'
  },
  {
    loc: '/privacy',
    priority: 0.4,
    changefreq: 'yearly',
    lastmod: '2024-11-15', // ⚠️ LEGAL: Update when privacy policy changes
    note: 'Privacy policy - legal requirement to track'
  },
  {
    loc: '/terms',
    priority: 0.4,
    changefreq: 'yearly',
    lastmod: '2024-11-15', // ⚠️ LEGAL: Update when terms change
    note: 'Terms of service - legal requirement to track'
  }
]

export default defineEventHandler(async (): Promise<SitemapUrl[]> => {
  try {
    // Convert static pages to sitemap URLs
    const urls: SitemapUrl[] = staticPages.map(page => {
      const url: SitemapUrl = {
        loc: page.loc,
        priority: page.priority,
        changefreq: page.changefreq
      }

      // Only include lastmod if we have an accurate date
      if (page.lastmod) {
        url.lastmod = page.lastmod
      }

      return url
    })

    // TODO: When blog/dynamic content is added, fetch and append here:
    // const blogPosts = await fetchBlogPosts()
    // blogPosts.forEach(post => {
    //   urls.push({
    //     loc: `/blog/${post.slug}`,
    //     lastmod: post.updatedAt,
    //     changefreq: 'weekly',
    //     priority: 0.7
    //   })
    // })

    return urls

  } catch (error) {
    // Log error but don't break sitemap generation
    console.error('[Sitemap] Error generating dynamic URLs:', error)
    return []
  }
})
