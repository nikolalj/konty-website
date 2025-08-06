<template>
  <div class="h-96 bg-pink-200 flex items-center justify-center">
    <h1 class="text-4xl font-bold text-gray-800">Testimonials</h1>
  </div>
</template>

<script setup lang="ts">
interface Props {
  product?: 'kontyRetail' | 'kontyHospitality'
}

defineProps<Props>()
</script>