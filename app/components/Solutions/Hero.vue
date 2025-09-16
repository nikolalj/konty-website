<template>
  <section class="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
    <UContainer class="relative z-10 py-16 sm:py-24 lg:py-32">
      <div class="text-center">
        <UIAppear>
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            {{ t('pages.solutions.hero.title') }}
          </h1>
        </UIAppear>

        <UIAppear direction="up" :delay="100">
          <p class="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {{ t('pages.solutions.hero.subtitle') }}
          </p>
        </UIAppear>

        <UIAppear direction="up" :delay="200">
          <div class="mt-10 flex items-center justify-center gap-4">
            <UButton
              size="xl"
              color="primary"
              :label="t('pages.solutions.hero.cta')"
              @click="scrollToSolutions"
            />
          </div>
        </UIAppear>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const scrollToSolutions = () => {
  const element = document.getElementById('solutions-grid')
  element?.scrollIntoView({ behavior: 'smooth' })
}
</script>