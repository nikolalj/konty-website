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
              {{ hero.title }}
            </h1>
          </UIAppear>

          <UIAppear direction="up" :delay="100">
            <p class="mt-6 text-lg text-gray-600 dark:text-gray-300">
              {{ hero.subtitle }}
            </p>
          </UIAppear>

          <UIAppear direction="up" :delay="200">
            <div class="mt-10 flex flex-wrap gap-4">
              <AppCTAButton
                variant="primary"
                :label="hero.cta"
                :to="localePath('/demo')"
              />
              <AppCTAButton
                variant="secondary"
                :label="t('pages.pricing.title')"
                :to="localePath('/pricing')"
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
                v-if="overview.image"
                :src="overview.image"
                :alt="hero.title"
                class="w-full h-auto rounded-xl object-cover aspect-[4/3]"
                loading="lazy"
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
const props = defineProps<{
  solution:
    | 'restaurants'
    | 'barsCafes'
    | 'fastFood'
    | 'grocerySupermarkets'
    | 'clothingBoutiques'
    | 'generalStores'
    | 'b2b'
}>()

const { t } = useI18n()
const localePath = useLocalePath()

// Get solution data from translations
const hero = computed(() => ({
  title: t(`pages.solutions.${props.solution}.hero.title`),
  subtitle: t(`pages.solutions.${props.solution}.hero.subtitle`),
  cta: t(`pages.solutions.${props.solution}.hero.cta`)
}))

const overview = computed(() => ({
  title: t(`pages.solutions.${props.solution}.overview.title`),
  description: t(`pages.solutions.${props.solution}.overview.description`),
  image: t(`pages.solutions.${props.solution}.overview.image`)
}))
</script>
