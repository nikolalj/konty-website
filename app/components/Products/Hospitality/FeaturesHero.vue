<template>
  <section
    class="relative isolate overflow-hidden pt-34 lg:pt-40 pb-16 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900"
    :aria-label="t('pages.products.hospitality.features.hero.title')"
  >
    <!-- Wave Background Pattern -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-30"
    >
      <svg
        class="absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <path
          fill="currentColor"
          class="text-primary-400 dark:text-primary-800"
          d="M0,192L48,208C96,224,192,256,288,250.7C384,245,480,203,576,192C672,181,768,203,864,224C960,245,1056,267,1152,250.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
        <path
          fill="currentColor"
          class="text-primary-300 dark:text-primary-700"
          d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>
    </div>

    <UContainer class="relative z-10">
      <div class="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
        <div>
          <UIAppear direction="right" :distance="32" :delay="100">
            <h1
              class="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold text-highlighted leading-[1.1]"
            >
              {{ t('pages.products.hospitality.features.hero.title') }}
            </h1>
          </UIAppear>

          <UIAppear direction="right" :distance="32" :delay="200">
            <p class="mb-8 text-lg sm:text-xl text-muted leading-relaxed">
              {{ t('pages.products.hospitality.features.hero.subtitle') }}
            </p>
          </UIAppear>

          <UIAppear direction="right" :distance="32" :delay="300">
            <div class="mb-8 space-y-3">
              <div class="flex items-start gap-3">
                <div
                  class="mt-1 w-6 h-6 rounded-md bg-primary-600 dark:bg-primary-700 flex items-center justify-center flex-shrink-0"
                >
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-white" />
                </div>
                <span
                  class="text-base font-medium text-gray-700 dark:text-gray-300"
                >
                  {{
                    t(
                      'pages.products.hospitality.features.hero.features'
                    ).split(' • ')[0]
                  }}
                </span>
              </div>
              <div class="flex items-start gap-3">
                <div
                  class="mt-1 w-6 h-6 rounded-md bg-primary-600 dark:bg-primary-700 flex items-center justify-center flex-shrink-0"
                >
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-white" />
                </div>
                <span
                  class="text-base font-medium text-gray-700 dark:text-gray-300"
                >
                  {{
                    t(
                      'pages.products.hospitality.features.hero.features'
                    ).split(' • ')[1]
                  }}
                </span>
              </div>
              <div class="flex items-start gap-3">
                <div
                  class="mt-1 w-6 h-6 rounded-md bg-primary-600 dark:bg-primary-700 flex items-center justify-center flex-shrink-0"
                >
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-white" />
                </div>
                <span
                  class="text-base font-medium text-gray-700 dark:text-gray-300"
                >
                  {{
                    t(
                      'pages.products.hospitality.features.hero.features'
                    ).split(' • ')[2]
                  }}
                </span>
              </div>
            </div>
          </UIAppear>

          <!-- CTA Buttons -->
          <UIAppear direction="right" :distance="32" :delay="400">
            <div class="flex flex-wrap gap-4">
              <AppCTAButton variant="primary" section="hero" size="xl" />
              <AppCTAButton variant="secondary" section="hero" size="xl" />
            </div>
          </UIAppear>
        </div>

        <UIAppear direction="left" :distance="32" :delay="200">
          <div class="relative">
            <div
              class="bg-white/50 dark:bg-primary-900/30 p-4 rounded-2xl shadow-2xl border border-primary-200 dark:border-primary-800 backdrop-blur-sm"
            >
              <NuxtImg
                src="/images/features/hospitality/main.avif"
                format="avif"
                alt="Konty Hospitality POS features overview"
                sizes="100vw sm:600px md:700px lg:700px xl:800px"
                width="800"
                height="800"
                loading="eager"
                decoding="async"
                quality="90"
                fit="inside"
                fetchpriority="high"
                role="presentation"
                class="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </UIAppear>
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
const { t } = useI18n()
</script>
