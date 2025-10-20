<template>
  <div>
    <!-- Hero with booking form above the fold -->
    <DemoHero />

    <!-- What to expect from the demo -->
    <DemoExpectations />

    <!-- Social proof - Implementation speed testimonials -->
    <!-- <DemoTestimonials /> -->
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.demo.title'),
  description: t('seo.demo.description')
})

// Schema.org
useSchemaOrg([schemas.demoWebApplication()])

// OG Image generation for Demo page
defineOgImageComponent('Main', {
  title: t('pages.demo.hero.title'),
  description: t('pages.demo.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('ui.cta.primary')
})
</script>
