<template>
  <section
    class="relative isolate overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800"
  >
    <!-- Wave Background Pattern -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-20"
    >
      <svg
        class="absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <path
          fill="currentColor"
          class="text-primary-200 dark:text-primary-900"
          d="M0,192L48,208C96,224,192,256,288,250.7C384,245,480,203,576,192C672,181,768,203,864,224C960,245,1056,267,1152,250.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
        <path
          fill="currentColor"
          class="text-primary-100 dark:text-primary-800/50"
          d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>
    </div>

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
            <div class="mt-6 flex flex-wrap gap-3">
              <div
                v-for="(feature, index) in hero.features.split(' • ')"
                :key="`feature-${index}`"
                class="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <UIcon
                  name="i-lucide-check"
                  class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 flex-shrink-0"
                />
                <span
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {{ feature.trim() }}
                </span>
              </div>
            </div>
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

    <!-- Bottom Wave Shape -->
    <div
      class="absolute left-0 right-0 -bottom-px w-full leading-[0] pointer-events-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 170"
        aria-hidden="true"
        class="fill-[var(--ui-bg)]"
      >
        <path
          fill-opacity="1"
          d="M0,160L120,160C240,160,480,160,720,138.7C960,117,1200,75,1320,53.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        />
      </svg>
    </div>
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
