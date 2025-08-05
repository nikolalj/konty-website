<template>
  <section class="py-16 bg-primary text-white">
    <UContainer>
      <div class="text-center">
        <h2 class="text-3xl font-bold mb-4">
          Ready to Transform Your {{ product === 'kontyHospitality' ? 'Restaurant' : 'Business' }}?
        </h2>
        <p class="text-xl mb-8 opacity-90">
          Join thousands of {{ product === 'kontyHospitality' ? 'restaurants' : 'retailers' }} already using Konty
        </p>
        <div class="placeholder-content">
          <UCard class="max-w-md mx-auto">
            <p class="text-gray-500">CTA section content will be displayed here</p>
          </UCard>
        </div>
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