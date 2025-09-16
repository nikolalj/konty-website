/**
 * Blog Sitemap Handler
 *
 * Fetches blog posts from Nuxt Content and generates sitemap entries.
 * Supports multi-locale content with automatic URL generation.
 */

import { LOCALES } from '~/config/locale.config.mjs'
import type { BlogPost } from '~/types/content'
import { queryCollection } from '@nuxt/content/server'

export default defineSitemapEventHandler(async (event) => {
  try {
    // Collect all unique blog posts across locales
    const allPosts = new Map<string, { slug: string, date: string }>()

    // Fetch blog posts from each locale collection
    for (const locale of LOCALES) {
      const collectionName = `content_${locale.code}` as 'content_rs' | 'content_me' | 'content_ba' | 'content_us'

      try {
        const posts = await queryCollection(event, collectionName)
          .where('path', 'LIKE', '/blog/%')
          .all()

        // Add posts to map (using slug as key to avoid duplicates)
        for (const post of posts) {
          const slug = post.path?.split('/').pop()
          if (slug && !allPosts.has(slug)) {
            const typedPost = post as unknown as BlogPost
            const date = (typedPost.date || new Date().toISOString().split('T')[0]) as string
            allPosts.set(slug, {
              slug,
              date
            })
          }
        }
      } catch {
        // Collection might not exist for some locales, continue
        console.log(`[Sitemap] No blog content for locale ${locale.code}`)
      }
    }

    // Convert to sitemap entries
    return Array.from(allPosts.values()).map(post => ({
      loc: `/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: 'weekly' as const,
      priority: 0.7,
      // Enable i18n transformation for multi-locale blogs
      _i18nTransform: true
    }))

  } catch (error) {
    console.error('[Sitemap] Error fetching blog posts:', error)
    return []
  }
})
