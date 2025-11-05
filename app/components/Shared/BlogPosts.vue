<template>
  <SharedSection
    v-if="posts && posts.length > 0"
    :title="props.title"
    :description="props.description"
    :variant="props.variant"
  >
    <article
      v-if="featuredPost"
      class="group cursor-pointer bg-elevated rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
    >
      <NuxtLink :to="localePath(`/blog/${featuredPost.path?.split('/').pop() || ''}`)" class="block">
        <!-- Hero Image -->
        <div class="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
          <NuxtImg
            v-if="featuredPost.image"
            :src="featuredPost.image"
            :alt="featuredPost.title"
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
            <time :datetime="featuredPost.date">
              {{ formatDate(featuredPost.date) }}
            </time>
            <span>•</span>
            <span>{{ featuredPost.readTime }} {{ t('pages.blog.minRead') }}</span>
          </div>

          <!-- Title -->
          <h3 class="font-bold text-xl mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {{ featuredPost.title }}
          </h3>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
            {{ featuredPost.description }}
          </p>

          <!-- Read More -->
          <span class="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:gap-2 transition-all">
            {{ t('ui.readMore') }}
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </NuxtLink>
    </article>

    <div v-if="regularPosts.length" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="post in regularPosts"
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
  </SharedSection>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/content'
import type { SectionVariantType } from '~/types/components'
import { DEFAULT_LOCALE, LOCALES } from '~/config/locale.config.mjs'

const { t } = useI18n()

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  variant: {
    type: String as PropType<SectionVariantType>,
    default: undefined,
  },
  dark: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: undefined
  },
})

const { locale } = useI18n()
const localePath = useLocalePath()

const { data: posts } = await useAsyncData(
  () => `home-blog-${locale.value}`,
  async () => {
    const collectionName = `content_${locale.value}` as 'content_rs' | 'content_me' | 'content_ba' | 'content_us'
    let query = queryCollection(collectionName)
      .where('path', 'LIKE', '/blog/%')

    if (props.category) {
      query = query.where('category', '=', props.category)
    }

    let items = await query.order('date', 'DESC')
      .limit(3)
      .all()

    // Fallback to default locale if no posts found
    if ((!items || items.length === 0) && locale.value !== DEFAULT_LOCALE.code) {
      const defaultCollection = `content_${DEFAULT_LOCALE.code}` as 'content_rs'
      query = queryCollection(defaultCollection)
        .where('path', 'LIKE', '/blog/%')

      if (props.category) {
        query = query.where('category', '=', props.category)
      }

      items = await query.order('date', 'DESC')
        .limit(3)
        .all()
    }

    return items as BlogPost[]
  },
  { watch: [locale] }
)

// Separate featured and regular posts
const featuredPost = computed(() => {
  return posts.value?.find((p) => p.featured)
})

const regularPosts = computed(() => {
  return posts.value?.filter((p) => !p.featured) || []
})

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
