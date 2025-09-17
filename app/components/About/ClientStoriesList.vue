<template>
  <section class="py-12 sm:py-16">
    <UContainer>
      <UIAppear direction="up">
        <!-- Loading State -->
        <div v-if="!posts" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 3" :key="i" class="animate-pulse">
            <div class="bg-gray-200 dark:bg-gray-700 rounded-lg h-64" />
          </div>
        </div>

        <!-- Client Stories Grid -->
        <div v-else-if="posts.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="post in posts"
            :key="post.id"
            class="group cursor-pointer bg-elevated rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <NuxtLink :to="localePath(`/blog/${post.path?.split('/').pop() || ''}`)" class="block">
              <!-- Hero Image -->
              <div class="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                <NuxtImg
                  v-if="post.image"
                  :src="post.image"
                  :alt="post.title"
                  format="avif"
                  loading="lazy"
                  width="400"
                  height="225"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <!-- Content -->
              <div class="p-6">
                <!-- Meta -->
                <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <time :datetime="post.date">
                    {{ formatDate(post.date) }}
                  </time>
                  <span>•</span>
                  <span>{{ post.readTime }} {{ t('pages.blog.minRead') }}</span>
                </div>

                <!-- Title -->
                <h3 class="font-bold text-xl mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {{ post.title }}
                </h3>

                <!-- Description -->
                <p class="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                  {{ post.description }}
                </p>

                <!-- Read More -->
                <span class="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:gap-2 transition-all">
                  {{ t('ui.readMore') }}
                  <span class="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </NuxtLink>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <Icon name="i-lucide:file-text" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ t('pages.clientStories.empty.title') || 'No stories yet' }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ t('pages.clientStories.empty.description') || 'Check back soon for client success stories.' }}
          </p>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/content'
import { DEFAULT_LOCALE, LOCALES } from '~/config/locale.config.mjs'

const { t, locale } = useI18n()
const localePath = useLocalePath()

// Fetch client stories (blog posts with category: clientStories)
const { data: posts } = await useAsyncData(
  () => `client-stories-${locale.value}`,
  async () => {
    // Query from locale-specific collection
    const collectionName = `content_${locale.value}` as 'content_rs' | 'content_me' | 'content_ba' | 'content_us'
    let items = await queryCollection(collectionName)
      .where('path', 'LIKE', '/blog/%')
      .where('category', '=', 'clientStories')
      .order('date', 'DESC')
      .all()

    // Fallback to default locale if no stories found
    if ((!items || items.length === 0) && locale.value !== DEFAULT_LOCALE.code) {
      const defaultCollection = `content_${DEFAULT_LOCALE.code}` as 'content_rs'
      items = await queryCollection(defaultCollection)
        .where('path', 'LIKE', '/blog/%')
        .where('category', '=', 'clientStories')
        .order('date', 'DESC')
        .all()
    }

    return items as BlogPost[]
  },
  {
    watch: [locale] // Re-fetch when locale changes
  }
)

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
</script>