<template>
  <div>
    <schema-organization />
    <home-hero />
    <shared-client-list product="kontyRetail" />
    <home-features />
    <shared-statistics product="kontyRetail" />
    <shared-testimonials product="kontyRetail" />
    <shared-get-started product="kontyRetail" />
    <shared-pricing product="kontyRetail" />
    <shared-contact-form />
    <home-blog-posts />
  </div>
</template>

<script setup lang="ts">
useCustomSeoMeta({
  title: 'Konty - Profesionalni POS Sistem za Restorane i Prodavnice',
  description: 'Unapredite poslovanje sa Konty kompletnim POS rešenjem. Savršeno za restorane, kafice i maloprodajne objekte.',
  type: 'website'
})
</script>
