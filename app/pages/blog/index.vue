<template>
  <div class="mt-24">
    <!-- Hero Section -->
    <section class="relative py-16 sm:pt-24 sm:pb-16">
      <UContainer>
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl text-pretty tracking-tight font-bold text-highlighted">
            {{ t('pages.blog.hero.title') }}
          </h1>
          <p class="text-xl font-semibold text-primary mt-4">
            {{ t('pages.blog.hero.subtitle') }}
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Featured Post -->
    <LazySharedBlogPosts hydrate-on-idle />

    <!-- CTA Section -->
    <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

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
