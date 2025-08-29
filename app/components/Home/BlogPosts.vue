<template>
  <section class="py-16">
    <UIAppear>
      <UContainer>
        <UBlogPosts :posts="posts">
          <UBlogPost
            v-for="(post, index) in posts"
            :key="index"
            :title="post.title"
            :description="post.description"
            :image="post.image"
            :date="post.date"
            :to="post.to"
            variant="subtle"
            target="_blank"
          >
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
            />
          </UBlogPost>
        </UBlogPosts>
      </UContainer>
    </UIAppear>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const posts = ref([
  {
    title: t('blog.post1.title'),
    description: t('blog.post1.description'),
    image: '/images/features/hospitality.png',
    date: '2025-07-08',
    to: '#'
  },
  {
    title: t('blog.post2.title'),
    description: t('blog.post2.description'),
    image: '/images/features/hospitality.png',
    date: '2025-06-12',
    to: '#'
  },
  {
    title: t('blog.post3.title'),
    description: t('blog.post3.description'),
    image: '/images/features/hospitality.png',
    date: '2025-05-20',
    to: '#'
  }
])
</script>
