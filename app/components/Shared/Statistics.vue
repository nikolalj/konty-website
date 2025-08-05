<template>
  <section class="py-16 bg-white">
    <UContainer>
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          {{ product === 'kontyHospitality' ? 'Restaurant' : 'Retail' }} Success Stories
        </h2>
        <p class="text-xl text-gray-600">
          Real results from businesses like yours
        </p>
      </div>
      <div class="placeholder-content">
        <UCard class="text-center">
          <p class="text-gray-500">Statistics and metrics will be displayed here</p>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface Props {
  product?: 'kontyRetail' | 'kontyHospitality'
}

defineProps<Props>()
</script>