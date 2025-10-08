<template>
  <section class="relative isolate py-28 sm:py-34 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
    <UContainer class="flex flex-col items-center text-center">
      <UIAppear direction="up" :distance="32">
        <div class="max-w-3xl">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-highlighted">
            {{ t('pages.partners.hero.title') }}
          </h1>

          <p class="mt-6 text-lg sm:text-xl text-muted">
            {{ t('pages.partners.hero.subtitle') }}
          </p>

          <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              size="lg"
              color="primary"
              @click="scrollToForm"
            >
              {{ t('pages.partners.cta') }}
            </UButton>
            <UButton
              size="lg"
              variant="outline"
              :to="'/demo'"
            >
              {{ t('ui.cta.primary') }}
            </UButton>
          </div>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const scrollToForm = () => {
  const form = document.querySelector('#contact-form')
  form?.scrollIntoView({ behavior: 'smooth' })
}
</script>
