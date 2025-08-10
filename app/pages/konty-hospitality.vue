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
useCustomSeoMeta({
  title: 'Restaurant POS System - Konty Hospitality',
  description: 'Streamline your restaurant operations with Konty Hospitality POS. Order management, inventory tracking, and customer analytics.',
  type: 'website'
})
</script>
