<template>
  <section class="py-16 bg-gray-50">
    <UContainer>
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Trusted by Leading {{ product === 'kontyHospitality' ? 'Restaurants' : 'Retailers' }}
        </h2>
        <p class="text-xl text-gray-600">
          Join thousands of businesses using Konty to streamline their operations
        </p>
      </div>
      <div class="placeholder-content">
        <UCard class="text-center">
          <p class="text-gray-500">Client logos will be displayed here</p>
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