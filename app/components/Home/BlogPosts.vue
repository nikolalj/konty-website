<template>
  <section v-if="posts && posts.length > 0" class="py-16">
    <UIAppear>
      <UContainer>
        <UBlogPosts :posts="posts">
          <UBlogPost
            v-for="(post, index) in posts"
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
    </UIAppear>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/content'
import { DEFAULT_LOCALE } from '~/config/locale.config.mjs'

const { locale } = useI18n()
const localePath = useLocalePath()

const { data: posts } = await useAsyncData(
  () => `home-blog-${locale.value}`,
  async () => {
    const collectionName = `content_${locale.value}` as 'content_rs' | 'content_me' | 'content_ba' | 'content_us'
    let items = await queryCollection(collectionName)
      .where('path', 'LIKE', '/blog/%')
      .order('date', 'DESC')
      .limit(3)
      .all()

    // Fallback to default locale if no posts found
    if ((!items || items.length === 0) && locale.value !== DEFAULT_LOCALE.code) {
      const defaultCollection = `content_${DEFAULT_LOCALE.code}` as 'content_rs'
      items = await queryCollection(defaultCollection)
        .where('path', 'LIKE', '/blog/%')
        .order('date', 'DESC')
        .limit(3)
        .all()
    }

    return items as BlogPost[]
  },
  { watch: [locale] }
)
</script>
