import { z, defineContentConfig, defineCollection } from '@nuxt/content'

// Common schema for blog posts
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  author: z.string(),
  readTime: z.string(),
  image: z.string().optional(),
  category: z.string(),
  featured: z.boolean().default(false)
})

export default defineContentConfig({
  collections: {
    // Serbian (default locale)
    content_rs: defineCollection({
      type: 'page',
      source: {
        include: 'rs/**',
        prefix: ''
      },
      schema: blogSchema
    }),

    // Montenegro
    content_me: defineCollection({
      type: 'page',
      source: {
        include: 'me/**',
        prefix: ''
      },
      schema: blogSchema
    }),

    // Bosnia and Herzegovina
    content_ba: defineCollection({
      type: 'page',
      source: {
        include: 'ba/**',
        prefix: ''
      },
      schema: blogSchema
    }),

    // United States (English)
    content_us: defineCollection({
      type: 'page',
      source: {
        include: 'us/**',
        prefix: ''
      },
      schema: blogSchema
    })
  }
})
