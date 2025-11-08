<template>
  <section
    class="relative isolate overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900"
  >
    <!-- Wave Background Pattern -->
    <UIWaveBackground />

    <UContainer class="relative z-10 pt-34 lg:pt-40 pb-16">
      <div class="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        <!-- Content -->
        <div>
          <UIAppear>
            <h1
              class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
            >
              {{ t('pages.clientStories.hero.title') }}
            </h1>
          </UIAppear>

          <UIAppear direction="up" :delay="100">
            <p class="mt-6 text-lg text-gray-600 dark:text-gray-300">
              {{ t('pages.clientStories.hero.subtitle') }}
            </p>
          </UIAppear>

          <UIAppear direction="up" :delay="200">
            <div class="mt-10 flex flex-wrap gap-4">
              <AppCTAButton variant="primary" :label="t('ui.cta.primary')" />
              <AppCTAButton
                variant="secondary"
                :label="t('pages.clientStories.hero.secondaryCta')"
                to="/contact"
              />
            </div>
          </UIAppear>
        </div>

        <!-- Image/Visual -->
        <UIAppear direction="right" :delay="300">
          <div class="mt-10 lg:mt-0">
            <div
              class="bg-white/50 dark:bg-primary-900/30 p-4 rounded-2xl shadow-xl border-2 border-primary-200 dark:border-primary-800 backdrop-blur-sm"
            >
              <NuxtImg
                src="/images/hero/clientStories.avif"
                :alt="t('pages.clientStories.hero.title')"
                class="w-full h-auto rounded-xl object-cover aspect-[4/3]"
                decoding="async"
                quality="90"
                fit="cover"
                fetchpriority="high"
              />
            </div>
          </div>
        </UIAppear>
      </div>
    </UContainer>

    <!-- Bottom Wave Shape -->
    <UIWaveBottomShape fill="#201533" fill-class="" />
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
