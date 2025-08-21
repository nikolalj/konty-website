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
          />
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
    image: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1600&auto=format&fit=crop',
    date: '2025-07-08',
    to: '#'
  },
  {
    title: t('blog.post2.title'),
    description: t('blog.post2.description'),
    image: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?q=80&w=1600&auto=format&fit=crop',
    date: '2025-06-12',
    to: '#'
  },
  {
    title: t('blog.post3.title'),
    description: t('blog.post3.description'),
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1600&auto=format&fit=crop',
    date: '2025-05-20',
    to: '#'
  }
])
</script>
