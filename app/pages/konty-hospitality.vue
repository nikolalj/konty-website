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

useCustomSeoMeta({
  title: t('seo.kontyHospitality.title'),
  description: t('seo.kontyHospitality.description'),
  type: 'website'
})
</script>
