<template>
  <div>
    <!-- Campaign Hero -->
    <section
      class="pt-34 pb-20 relative isolate overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_#8d5494_0%,_#563275_40%,_#1f1633_100%)]"
    >
      <UContainer class="relative z-10">
        <div class="flex flex-col items-center text-center">
          <!-- Badge -->
          <UIAppear direction="up">
            <div class="mb-6 text-sm sm:text-base font-semibold px-3 py-2 bg-gradient-to-r from-[#C83852] via-[#B44092] to-[#6A5FC1] text-white rounded-lg">
              {{ t('pages.offers.3mFree.hero.badge') }}
            </div>
          </UIAppear>

          <!-- Main Headline -->
          <UIAppear direction="up">
            <h1 class="mb-6 text-4xl sm:text-6xl text-balance font-bold text-white">
              {{ t('pages.offers.3mFree.hero.title') }}
            </h1>
          </UIAppear>

          <!-- Subtitle -->
          <UIAppear direction="up">
            <p class="mb-8 text-xl text-balance max-w-3xl text-white/90">
              {{ t('pages.offers.3mFree.hero.subtitle') }}
            </p>
          </UIAppear>

          <!-- CTA -->
          <UIAppear direction="up">
            <UButton
              size="xl"
              variant="solid"
              class="font-semibold dark bg-white hover:bg-secondary"
              icon="i-lucide-arrow-down"
              @click="scrollToForm"
            >
              {{ t('pages.offers.3mFree.hero.cta') }}
            </UButton>
          </UIAppear>
        </div>
      </UContainer>

      <!-- Wave Shape -->
      <div class="absolute left-0 right-0 -bottom-px w-full leading-[0] pointer-events-none">
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

    <!-- How It Works -->
    <section class="py-16">
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">
            {{ t('pages.offers.3mFree.howItWorks.title') }}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="text-center"
          >
            <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-4">
              <span class="text-xl font-bold text-primary">{{ index + 1 }}</span>
            </div>
            <h3 class="text-lg font-semibold mb-2">{{ step.title }}</h3>
            <p class="text-sm text-[var(--ui-text-muted)]">{{ step.description }}</p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Pricing -->
    <LazySharedPricing variant="alt" hydrate-on-visible />

    <!-- Contact Form -->
    <LazySharedContactForm hydrate-on-visible />

    <!-- Terms -->
    <div class="pb-8 text-center">
      <p class="text-xs text-[var(--ui-text-muted)]">
        {{ t('pages.offers.3mFree.terms') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('seo.offers.3mFree.title'),
  description: t('seo.offers.3mFree.description')
})

defineOgImageComponent('Main', {
  title: t('pages.offers.3mFree.hero.title'),
  description: t('pages.offers.3mFree.hero.subtitle'),
  badge: t('pages.offers.3mFree.hero.badge'),
  cta: t('pages.offers.3mFree.hero.cta')
})

const { tDeep } = useUtils()

const steps = computed(() => {
  return tDeep<Array<{ title: string, description: string }>>('pages.offers.3mFree.howItWorks.steps')
})

function scrollToForm() {
  document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
