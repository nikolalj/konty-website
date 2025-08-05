<template>
  <div>
    <about-headline />
    <shared-client-list product="kontyRetail" />
    <about-contact-info />
    <div id="contact">
      <shared-contact-form />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About Us - Konty POS Solutions',
  description: 'Learn about Konty\'s mission to revolutionize point-of-sale systems for restaurants and retail businesses worldwide.',
  ogTitle: 'About Konty - POS Innovation Leaders',
  ogDescription: 'Discover our story and commitment to providing cutting-edge POS solutions for modern businesses.',
})
</script>