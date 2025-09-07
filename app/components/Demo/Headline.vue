<template>
  <section class="py-20 bg-gradient-to-br from-green-50 to-blue-50">
    <UContainer>
      <div class="text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          {{ t('pages.demo.demo.seeInAction') }}
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          {{ t('pages.demo.demo.revolutionize') }}
        </p>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
