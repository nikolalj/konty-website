<template>
  <article class="pt-20">
    <!-- Article Header -->
    <header class="pt-16 sm:pt-24 pb-2 sm:pb-4">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <!-- Article Meta -->
          <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <time :datetime="currentPost.date">
              {{ formatDate(currentPost.date) }}
            </time>
            <span>·</span>
            <span>{{ currentPost.readTime }} {{ t('pages.blog.minRead') }}</span>
            <span>·</span>
            <span>{{ t('pages.blog.byAuthor') }} {{ currentPost.author }}</span>
          </div>

          <!-- Title -->
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            {{ currentPost.title }}
          </h1>

          <!-- Description -->
          <p class="mt-6 text-xl text-gray-600 dark:text-gray-300">
            {{ currentPost.description }}
          </p>

          <!-- Hero Image -->
          <div v-if="currentPost.image" class="mt-8 aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <NuxtImg
              :src="currentPost.image"
              :alt="currentPost.title"
              format="avif"
              loading="eager"
              width="1200"
              height="675"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </UContainer>
    </header>

    <!-- Article Content -->
    <section class="pb-16">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <ContentRenderer :value="currentPost" />
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Related Posts -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900/50">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {{ t('pages.blog.related.title') }}
          </h2>
          <div class="grid gap-8 md:grid-cols-2">
            <article v-for="relatedPost in relatedPosts" :key="relatedPost.id" class="group">
              <NuxtLink :to="localePath(`/blog/${relatedPost.path.split('/').pop()}`)" class="block">
                <div class="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
                  <NuxtImg
                    v-if="relatedPost.image"
                    :src="relatedPost.image"
                    :alt="relatedPost.title"
                    format="avif"
                    loading="lazy"
                    width="400"
                    height="225"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div class="space-y-3">
                  <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <time :datetime="relatedPost.date">
                      {{ formatDate(relatedPost.date) }}
                    </time>
                    <span>{{ relatedPost.readTime }} {{ t('pages.blog.minRead') }}</span>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {{ relatedPost.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 line-clamp-2">
                    {{ relatedPost.description }}
                  </p>
                </div>
              </NuxtLink>
            </article>
          </div>
        </div>
      </UContainer>
    </section>
  </article>
</template>

<script setup lang="ts">
import { DEFAULT_LOCALE, LOCALES } from '~/config/locale.config.mjs'
import type { BlogPost } from '~/types/content'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

// Get the slug from the route
const slug = computed(() => {
  const slugArray = route.params.slug
  if (Array.isArray(slugArray)) {
    return slugArray[slugArray.length - 1]
  }
  return slugArray as string
})

// Fetch the current post with fallback to default locale - reactive to locale changes
const { data: post } = await useAsyncData(
  () => `blog-post-${locale.value}-${slug.value}`, // Make key reactive to locale
  async () => {
    // Try to get post from current locale
    const collectionName = `content_${locale.value}` as 'content_rs' | 'content_me' | 'content_ba' | 'content_us'
    let content = await queryCollection(collectionName)
      .path(`/blog/${slug.value}`)
      .first()

    // Fallback to default locale (rs) if not found and current locale is not default
    if (!content && locale.value !== DEFAULT_LOCALE.code) {
      const defaultCollection = `content_${DEFAULT_LOCALE.code}` as 'content_rs'
      content = await queryCollection(defaultCollection)
        .path(`/blog/${slug.value}`)
        .first()
    }

    return content
  },
  {
    watch: [locale, slug]
  }
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found'
  })
}

// Type the post - we know it exists after the check
const currentPost = post.value as BlogPost

// Fetch related posts (same category or recent posts) - reactive to locale changes
const { data: allPosts } = await useAsyncData(
  () => `related-${locale.value}-${slug.value}`, // Make key reactive to locale
  async () => {
    const collectionName = `content_${locale.value}` as 'content_rs' | 'content_me' | 'content_ba' | 'content_us'
    const items = await queryCollection(collectionName)
      .where('path', 'LIKE', '/blog/%')
      .where('path', '<>', `/blog/${slug.value}`)
      .order('path', 'DESC')  // Use path for ordering since date is in frontmatter
      .limit(4)
      .all()

    return items as BlogPost[]
  },
  {
    watch: [locale, slug] // Re-fetch when locale or slug changes
  }
)

// Get 2 related posts (prioritize same category)
const relatedPosts = computed(() => {
  const posts = allPosts.value
  if (!posts) return []

  const sameCategoryPosts = posts.filter((p) => p.category === currentPost.category)
  const otherPosts = posts.filter((p) => p.category !== currentPost.category)
  return [...sameCategoryPosts, ...otherPosts].slice(0, 2)
})

// Format date based on locale
const formatDate = (dateString: string) => {
  const localeIso = LOCALES.find(l => l.code === locale.value)?.iso || DEFAULT_LOCALE.iso
  const date = new Date(dateString)
  return date.toLocaleDateString(localeIso, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO
usePageSeo({
  title: currentPost.title,
  description: currentPost.description
})

// For now, only use Article schema. Review schema commented out until we have verified reviews
const schemas = useSchemas()
useSchemaOrg([schemas.article(currentPost)])
// if (currentPost.category === 'clientStories') {
//   schemas.clientStoryReview(currentPost)  // Disabled - fake ratings
// }

// OG Image
defineOgImageComponent('Main', {
  title: currentPost.title,
  description: currentPost.description
})
</script>
