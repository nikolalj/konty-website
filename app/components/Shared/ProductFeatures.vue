<template>
  <div class="h-96 bg-amber-100 flex items-center justify-center">
    <h1 class="text-4xl font-bold text-gray-800">ProductFeatures</h1>
  </div>
</template>

<script setup lang="ts">
interface Props {
  product?: 'kontyRetail' | 'kontyHospitality'
}

defineProps<Props>()
</script>
