<template>
  <div>
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
useSeoMeta({
  title: 'Konty - Professional POS System for Restaurants & Retail',
  description: 'Streamline your business operations with Konty\'s comprehensive point-of-sale solution. Perfect for restaurants and retail stores.',
  ogTitle: 'Konty - Professional POS System',
  ogDescription: 'Transform your business with our advanced POS system designed for modern restaurants and retail stores.',
})
</script>
