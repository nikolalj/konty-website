<template>
  <div>
    <SchemaOrganization />
    <HomeHero />
    <SharedClientList />
    <HomeFeatures />
    <SharedTestimonials />
    <SharedStatistics />
    <SharedGetStarted />
    <SharedPricing />
    <SharedContactForm />
    <HomeBlogPosts />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useCustomSeoMeta({
  title: t('seo.home.title'),
  description: t('seo.home.description'),
  type: 'website'
})
</script>
