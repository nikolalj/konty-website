<template>
  <div class="mt-24">
    <!-- Hero Section -->
    <section class="relative py-16 sm:py-24">
      <UContainer>
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            {{ t('pages.blog.hero.title') }}
          </h1>
          <p class="mt-6 text-lg text-gray-600 dark:text-gray-300">
            {{ t('pages.blog.hero.subtitle') }}
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Featured Post -->
    <section v-if="featuredPost" class="py-8">
      <UContainer>
        <NuxtLink
          :to="localePath(`/blog/${featuredPost.path.split('/').pop()}`)"
          class="group block"
        >
          <div class="grid lg:grid-cols-2 gap-8 items-center">
            <div class="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <NuxtImg
                v-if="featuredPost.image"
                :src="featuredPost.image"
                :alt="featuredPost.title"
                format="avif"
                loading="lazy"
                width="800"
                height="450"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span class="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                  {{ t('pages.blog.featured') || 'Featured' }}
                </span>
                <time :datetime="featuredPost.date">
                  {{ formatDate(featuredPost.date) }}
                </time>
                <span>{{ featuredPost.readTime }} {{ t('pages.blog.minRead') }}</span>
              </div>
              <h2 class="mt-4 text-3xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {{ featuredPost.title }}
              </h2>
              <p class="mt-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                {{ featuredPost.description }}
              </p>
              <div class="mt-6">
                <span class="text-primary-600 dark:text-primary-400 font-medium group-hover:underline">
                  {{ t('pages.blog.readMore') }} →
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </UContainer>
    </section>

    <!-- Blog Posts Grid -->
    <section class="py-16">
      <UContainer>
        <UBlogPosts :posts="regularPosts">
          <UBlogPost
            v-for="(post, index) in regularPosts"
            :key="index"
            :title="post.title"
            :description="post.description"
            :date="post.date"
            :to="localePath(`/blog/${post.path?.split('/').pop() || ''}`)"
            variant="subtle"
            :ui="{
              header: 'transform transition-transform duration-200 group-hover/blog-post:scale-110',
            }"
          >
            <template #header>
              <NuxtImg
                :src="post.image"
                format="avif"
                loading="lazy"
                :alt="post.title"
                role="presentation"
                width="350"
                height="350"
                quality="80"
                fit="cover"
                class="w-full"
              />
            </template>
          </UBlogPost>
        </UBlogPosts>
      </UContainer>
    </section>

    <!-- CTA Section -->
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_LOCALE, LOCALES } from '~/config/locale.config.mjs'
import type { BlogPost } from '~/types/content'

const { t, locale } = useI18n()
const localePath = useLocalePath()

// Fetch blog posts for current locale - reactive to locale changes
const { data: posts } = await useAsyncData(
  () => `blog-${locale.value}`, // Make key reactive to locale
  async () => {
    // Query from locale-specific collection
    const collectionName = `content_${locale.value}` as 'content_rs' | 'content_me' | 'content_ba' | 'content_us'
    const items = await queryCollection(collectionName)
      .where('path', 'LIKE', '/blog/%')
      .order('path', 'DESC')  // Use path for ordering since date is in frontmatter
      .all()

    return items as BlogPost[]
  },
  {
    watch: [locale] // Re-fetch when locale changes
  }
)

// Separate featured and regular posts
const featuredPost = computed(() => {
  return posts.value?.find((p) => p.featured)
})

const regularPosts = computed(() => {
  return posts.value?.filter((p) => !p.featured) || []
})

// Format date based on locale
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const localeIso = LOCALES.find(l => l.code === locale.value)?.iso || DEFAULT_LOCALE.iso
  return date.toLocaleDateString(localeIso, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO
usePageSeo({
  title: t('seo.blog.title'),
  description: t('seo.blog.description')
})

// Schema.org
const schemas = useSchemas()
useSchemaOrg([schemas.blogCollection()])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.blog.hero.title'),
  description: t('pages.blog.hero.subtitle')
})
</script>
