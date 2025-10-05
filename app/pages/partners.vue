<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <PartnersHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazyPartnersList hydrate-on-visible />

    <!-- Interactive components - hydrate on visibility for better UX -->
     <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.partners.title'),
  description: t('seo.partners.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.partners.hero.title'),
  description: t('pages.partners.hero.subtitle'),
  cta: t('pages.partners.cta')
})

// Use centralized schema
useSchemaOrg([schemas.partners()])
</script>
