<template>
  <div>
    <!-- Hero sekcija sa zakazivanjem termina -->
    <demo-hero />

    <!-- Proces demonstracije - šta možete očekivati -->
    <demo-process />

    <!-- Interaktivni vodič za odabir kategorije -->
    <demo-category-selector />

    <!-- Opis demo sastanka -->
    <demo-meeting-details />

    <!-- Kontakt forma -->
    <shared-contact-form />
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
  cta: t('ui.forms.buttons.requestDemo')
})
</script>