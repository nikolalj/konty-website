/**
 * Blog Sitemap Handler
 *
 * Fetches blog posts from Nuxt Content and generates sitemap entries.
 * Only includes blog posts for locales where they actually exist.
 */

import { LOCALES } from '~/config/locale.config.mjs'
import type { BlogPost, ContentCollectionType } from '~/types/content'
import { queryCollection } from '@nuxt/content/server'

export default defineSitemapEventHandler(async (event) => {
  try {
    // Track which locales each blog post exists in
    const postsBySlug = new Map<string, { slug: string, date: string, locales: string[] }>()

    // Fetch blog posts from each locale collection
    for (const locale of LOCALES) {
      const collectionName = `content_${locale.code}` as ContentCollectionType

      try {
        const posts = await queryCollection(event, collectionName)
          .where('path', 'LIKE', '/blog/%')
          .all()

        // Track each post and which locales it exists in
        for (const post of posts) {
          const slug = post.path?.split('/').pop()
          if (slug) {
            const existing = postsBySlug.get(slug)
            if (existing) {
              // Add this locale to existing post's locales
              existing.locales.push(locale.code)
            } else {
              // New post - initialize with this locale
              const typedPost = post as unknown as BlogPost
              const date = (typedPost.date || new Date().toISOString().split('T')[0]) as string
              postsBySlug.set(slug, {
                slug,
                date,
                locales: [locale.code]
              })
            }
          }
        }
      } catch {
        // Collection might not exist for some locales, continue
        console.log(`[Sitemap] No blog content for locale ${locale.code}`)
      }
    }

    // Generate sitemap entries - one per locale where the post exists
    const entries: Array<{
      loc: string
      lastmod: string
      changefreq: 'weekly'
      priority: 0.7
    }> = []

    for (const post of postsBySlug.values()) {
      for (const localeCode of post.locales) {
        // Find the locale config to get the proper URL prefix
        const locale = LOCALES.find(l => l.code === localeCode)
        const prefix = locale?.code === 'rs' ? '' : `/${locale?.code}`

        entries.push({
          loc: `${prefix}/blog/${post.slug}`,
          lastmod: post.date,
          changefreq: 'weekly',
          priority: 0.7
        })
      }
    }

    return entries

  } catch (error) {
    console.error('[Sitemap] Error fetching blog posts:', error)
    return []
  }
})
