<template>
  <section class="py-12 sm:py-16">
    <UContainer>
      <UIAppear direction="up">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-highlighted">
            {{ t('pages.retail.features.list.title') }}
          </h2>
          <p class="mt-4 text-lg text-muted max-w-3xl mx-auto">
            {{ t('pages.retail.features.list.subtitle') }}
          </p>
        </div>

        <!-- Placeholder grid -->
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 12" :key="i" class="p-6 bg-elevated rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="h-12 w-12 bg-primary-100 dark:bg-primary-900 rounded-lg mb-4" />
            <h3 class="text-xl font-semibold mb-2">Feature {{ i }}</h3>
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
