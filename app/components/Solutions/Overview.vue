<template>
  <section
    class="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
  >
    <UContainer class="relative z-10 py-16 sm:py-24 lg:py-32">
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

          <UIAppear direction="up" :delay="150">
            <p
              class="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              {{ hero.features }}
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
              class="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900 dark:to-primary-950"
            >
              <NuxtImg
                v-if="overview.image"
                :src="overview.image"
                :alt="hero.title"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </UIAppear>
      </div>

      <!-- Benefits Section -->
      <div class="mt-16 sm:mt-24">
        <UIAppear>
          <h2
            class="text-center text-3xl font-bold text-gray-900 dark:text-white"
          >
            {{ overview.title }}
          </h2>
          <p
            class="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300"
          >
            {{ overview.description }}
          </p>
        </UIAppear>

        <div class="mt-12 grid gap-8 md:grid-cols-3">
          <UIAppear
            v-for="(benefit, index) in benefits"
            :key="`benefit-${index}`"
            :delay="400 + index * 100"
            direction="up"
          >
            <div class="text-center">
              <div
                class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900"
              >
                <UIcon
                  name="i-lucide-check-circle"
                  class="h-8 w-8 text-primary-600 dark:text-primary-400"
                />
              </div>
              <h3
                class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
              >
                {{ benefit.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ benefit.description }}
              </p>
            </div>
          </UIAppear>
        </div>
      </div>
    </UContainer>
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
    | 'convenienceStores'
    | 'b2b'
}>()

const { t } = useI18n()
const localePath = useLocalePath()

// Get solution data from translations
const hero = computed(() => ({
  title: t(`pages.solutions.${props.solution}.hero.title`),
  subtitle: t(`pages.solutions.${props.solution}.hero.subtitle`),
  features: t(`pages.solutions.${props.solution}.hero.features`),
  cta: t(`pages.solutions.${props.solution}.hero.cta`)
}))

const overview = computed(() => ({
  title: t(`pages.solutions.${props.solution}.overview.title`),
  description: t(`pages.solutions.${props.solution}.overview.description`),
  image: t(`pages.solutions.${props.solution}.overview.image`)
}))

const benefits = computed(() => [
  {
    title: t(`pages.solutions.${props.solution}.benefits.b1.title`),
    description: t(`pages.solutions.${props.solution}.benefits.b1.description`)
  },
  {
    title: t(`pages.solutions.${props.solution}.benefits.b2.title`),
    description: t(`pages.solutions.${props.solution}.benefits.b2.description`)
  },
  {
    title: t(`pages.solutions.${props.solution}.benefits.b3.title`),
    description: t(`pages.solutions.${props.solution}.benefits.b3.description`)
  }
])
</script>
