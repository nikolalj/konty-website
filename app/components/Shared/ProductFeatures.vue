<template>
  <UContainer class="py-12 sm:py-16">
    <h2 class="text-4xl font-bold text-gray-800">ProductFeatures</h2>
  </UContainer>
</template>

<script setup lang="ts">
defineProps({
  product: {
    type: String as PropType<'retail' | 'hospitality' | undefined>,
    default: undefined
  },
})
</script>
