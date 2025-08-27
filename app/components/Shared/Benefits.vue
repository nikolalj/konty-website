<template>
  <UContainer class="py-12 sm:py-16">
    <h2 class="text-4xl font-bold text-gray-800">Benefits</h2>
  </UContainer>
</template>

<script setup lang="ts">
interface Props {
  product?: 'kontyRetail' | 'kontyHospitality'
}

defineProps<Props>()
</script>
