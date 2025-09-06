<template>
  <div>
    <konty-hospitality-hero />
    <shared-client-list product="kontyHospitality" />
    <shared-benefits product="kontyHospitality" />
    <konty-hospitality-features />
    <shared-pricing product="kontyHospitality" />
    <shared-get-started product="kontyHospitality" />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.kontyHospitality.title'),
  description: t('seo.kontyHospitality.description')
})

// OG Image generation for Hospitality product
defineOgImageComponent('Product', {
  product: 'Konty Hospitality',
  title: t('hospitalityPage.hero.title'),
  features: [
    t('features.hospitality.tableManagement.title'),
    t('features.hospitality.kitchenDisplay.title'),
    t('features.hospitality.staffManagement.title')
  ],
  cta: t('hero.cta.primary'),
  icon: '🍽️'
})

// Use centralized schema
useSchemaOrg([schemas.kontyHospitality()])
</script>
