<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <AboutPartnersHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazyAboutPartnersList hydrate-on-visible />

    <!-- Interactive components - hydrate on visibility for better UX -->
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.about.partners.title'),
  description: t('seo.about.partners.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.about.partners.hero.title'),
  description: t('pages.about.partners.hero.subtitle'),
  cta: t('pages.about.partners.cta')
})

// Use centralized schema
useSchemaOrg([schemas.partners()])
</script>