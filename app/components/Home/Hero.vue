<!-- components/HeroKonty.vue -->
<template>
  <section
    class="py-28 sm:py-34 bg-fixed relative isolate bg-[url('/images/hero/bg-light.avif')] dark:bg-[url('/images/hero/bg-dark.avif')] bg-cover bg-no-repeat bg-center"
    :aria-label="t('hero.title')"
  >
    <UContainer class="flex flex-col lg:grid gap-16 sm:gap-y-24 lg:grid-cols-2 lg:items-center">
      <UIAppear direction="right" :distance="64">
        <div>
          <div class="mb-4 font-semibold text-primary flex items-center gap-1.5">
            {{ t('hero.tagline') }}
          </div>

          <h1 class="text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-highlighted">
            {{ t('hero.title') }}
          </h1>

          <p class="text-lg sm:text-xl/8 text-muted text-pretty mt-6">
            {{ t('hero.subtitle') }}
          </p>

          <div class="mt-10">
            <div class="flex flex-wrap gap-x-6 gap-y-3">
              <UButton
                color="primary"
                size="lg"
                :to="localePath('/demo')"
                class="text-base"
                @click="onPrimaryCta"
              >
                {{ t('hero.cta.primary') }}
              </UButton>
            </div>
          </div>
        </div>
      </UIAppear>

      <!-- Right column: product image -->
      <UIAppear direction="left" :distance="64">
        <NuxtImg
          src="/images/hero/hero.avif"
          format="avif"
          alt="Konty POS dashboard prikazuje analitiku prodaje i pregled transakcija"
          width="500"
          height="600"
          loading="eager"
          decoding="async"
          quality="90"
          fit="cover"
          fetchpriority="high"
          role="presentation"
        />
      </UIAppear>
    </UContainer>

    <!-- Wave footer -->
    <div class="wave-shape-bottom">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 170" aria-hidden="true">
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
const localePath = useLocalePath()
const { track } = useTracking()

function onPrimaryCta(): void {
  // GA4 standard event for lead generation
  track('generate_lead', {
    lead_type: 'demo_interest',
    lead_source: 'homepage_hero',
    value: 50
  })
}
</script>

<style scoped>
.wave-shape-bottom {
  fill: var(--ui-bg);
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px; /* hides seam */
  width: 100%;
  line-height: 0;
  pointer-events: none;
}
</style>
