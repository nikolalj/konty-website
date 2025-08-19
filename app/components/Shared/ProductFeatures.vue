<template>
  <UContainer class="py-12 sm:py-16">
    <h1 class="text-4xl font-bold text-gray-800">ProductFeatures</h1>
  </UContainer>
</template>

<script setup lang="ts">
interface Props {
  product?: 'kontyRetail' | 'kontyHospitality'
}

defineProps<Props>()
</script>
