<template>
  <section class="relative isolate py-28 sm:py-34 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
    <UContainer class="flex flex-col items-center text-center">
      <UIAppear direction="up" :distance="32">
        <div class="max-w-3xl">
          <div class="mb-4 font-semibold text-primary">
            {{ t('pages.clientStories.badge') }}
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-highlighted">
            {{ t('pages.clientStories.hero.title') }}
          </h1>

          <p class="mt-6 text-lg sm:text-xl text-muted">
            {{ t('pages.clientStories.hero.subtitle') }}
          </p>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
