<template>
  <!--
    RETAIL HERO – LCP-optimized, accessible, conversion-focused

    TODO (before go-live):
      1) Replace /images/hospitality-hero.webp with your real hero asset (public/images/hero-main.webp).
         - Prefer 2400×1200 (or larger) source. Nuxt Image will resize via the "hero" preset.
      2) Update H1 + subheading to your finalized copy.
      3) Confirm CTA routes (/demo, /pricing) and labels.
      4) If image is informative, add real alt text; otherwise keep alt="" + role="presentation".
  -->
  <section class="relative isolate">
    <!-- LCP image -->
    <!-- <NuxtImg
      src="/images/retail-hero.webp"
      preset="hero"
      :sizes="'100vw'"
      loading="eager"
      fetchpriority="high"
      alt=""
      role="presentation"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
    /> -->

    <!-- Contrast overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"/>

    <UContainer class="relative mx-auto flex min-h-[64vh] items-center py-16 md:min-h-[72vh]">
      <div class="max-w-2xl">
        <!-- TODO: finalize headline (≤ ~70 chars) -->
        <h1 class="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
          {{ t('pages.kontyRetail.hero.title') }}
        </h1>

        <!-- TODO: tighten supporting copy to 1–2 sentences focused on outcomes -->
        <p class="mt-4 text-lg text-white/90 md:text-xl">
          {{ t('pages.kontyRetail.hero.subtitle') }}
        </p>

        <!-- CTAs -->
        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <UButton
            size="lg"
            color="primary"
            to="/demo"
            aria-label="Request a free Konty Retail demo"
            @click="onPrimaryCta"
          >
            {{ t('pages.kontyRetail.hero.cta') }}
          </UButton>
          <UButton
            size="lg"
            variant="outline"
            color="neutral"
            to="/pricing"
            aria-label="See Konty pricing"
            @click="onSecondaryCta"
          >
            {{ t('pages.kontyRetail.hero.viewDemo') }}
          </UButton>
        </div>

        <p class="mt-3 text-sm text-white/80">
          {{ t('pages.kontyRetail.hero.features') }}
        </p>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { track } = useTracking()

const onPrimaryCta = () => {
  track('generate_lead', {
    lead_type: 'demo_interest',
    lead_source: 'retail_hero',
    product: 'konty_retail',
    value: 50
  })
}

const onSecondaryCta = () => {
  track('view_item_list', {
    item_list_name: 'pricing',
    product: 'konty_retail'
  })
}
</script>
