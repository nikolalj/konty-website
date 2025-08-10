<template>
  <div>
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
useCustomSeoMeta({
  title: 'Retail POS System - Konty Retail',
  description: 'Optimize your retail business with Konty Retail POS. Inventory management, sales analytics, and customer loyalty programs.',
  type: 'website'
})
</script>
