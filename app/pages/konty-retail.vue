<template>
  <div>
    <SchemaSoftwareApplication product="kontyRetail" />
    <SchemaReviews product="kontyRetail" />
    <konty-retail-hero />
    <shared-client-list product="kontyRetail" />
    <shared-benefits product="kontyRetail" />
    <konty-retail-features />
    <shared-pricing product="kontyRetail" />
    <shared-get-started product="kontyRetail" />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useCustomSeoMeta({
  title: t('seo.kontyRetail.title'),
  description: t('seo.kontyRetail.description'),
  type: 'website'
})
</script>
