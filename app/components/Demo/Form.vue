<template>
  <section class="py-16 bg-white">
    <UContainer>
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          {{ t('ui.forms.buttons.requestDemo') }}
        </h2>
        <p class="text-xl text-gray-600">
          {{ t('pages.demo.demo.description') }}
        </p>
      </div>
      <div class="placeholder-content">
        <UCard class="max-w-2xl mx-auto">
          <p class="text-center text-gray-500">{{ t('ui.common.loading.formPlaceholder') }}</p>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
