<template>
  <div class="mt-24">
    <!-- Hero sekcija sa zakazivanjem termina -->
    <DemoHero />

    <!-- Proces demonstracije - šta možete očekivati -->
    <DemoProcess />

    <!-- Interaktivni vodič za odabir kategorije -->
    <DemoCategorySelector />

    <!-- Opis demo sastanka -->
    <DemoMeetingDetails />

    <!-- Kontakt forma -->
    <SharedContactForm />
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
