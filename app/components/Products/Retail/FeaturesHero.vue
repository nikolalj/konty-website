<template>
  <section
    class="relative isolate overflow-hidden pt-34 lg:pt-40 pb-16 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900"
    :aria-label="t('pages.products.retail.features.hero.title')"
  >
    <!-- Wave Background Pattern -->
    <UIWaveBackground />

    <UContainer class="relative z-10">
      <div class="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
        <div>
          <UIAppear direction="right" :distance="32" :delay="100">
            <h1
              class="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold text-highlighted leading-[1.1]"
            >
              {{ t('pages.products.retail.features.hero.title') }}
            </h1>
          </UIAppear>

          <UIAppear direction="right" :distance="32" :delay="200">
            <p class="mb-8 text-lg sm:text-xl text-muted leading-relaxed">
              {{ t('pages.products.retail.features.hero.subtitle') }}
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
                    t('pages.products.retail.features.hero.features').split(
                      ' • '
                    )[0]
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
                    t('pages.products.retail.features.hero.features').split(
                      ' • '
                    )[1]
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
                    t('pages.products.retail.features.hero.features').split(
                      ' • '
                    )[2]
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
                src="/images/features/retail/main.avif"
                format="avif"
                alt="Konty Retail POS features overview"
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
    <UIWaveBottomShape />
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
