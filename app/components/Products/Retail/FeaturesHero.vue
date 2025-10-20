<template>
  <section class="relative isolate py-28 sm:py-34 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
    <UContainer class="flex flex-col items-center text-center">
      <UIAppear direction="up" :distance="32">
        <div class="max-w-3xl">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-highlighted">
            {{ t('pages.products.retail.features.hero.title') }}
          </h1>

          <p class="mt-6 text-lg sm:text-xl text-muted">
            {{ t('pages.products.retail.features.hero.subtitle') }}
          </p>

          <div class="mt-10 flex flex-wrap gap-4 justify-center">
            <AppCTAButton variant="primary" section="hero" size="xl" />
            <AppCTAButton variant="secondary" section="hero" size="xl" />
          </div>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
