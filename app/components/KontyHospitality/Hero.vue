<template>
  <!--
    HOSPITALITY HERO – LCP-optimized, accessible, conversion-focused

    TODO (before go-live):
      1) Put real asset at /public/images/hospitality-hero.webp (≥ 2400×1200 recommended).
      2) Update H1 + subheading to your finalized copy.
      3) Confirm CTA routes (/demo, /pricing).
      4) Provide real alt text if the image is informative.
  -->
  <section class="relative isolate">
    <!-- LCP image -->
    <NuxtImg
      src="/images/hospitality-hero.webp"
      preset="hero"
      :sizes="'100vw'"
      loading="eager"
      fetchpriority="high"
      alt=""
      role="presentation"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
    />

    <!-- Contrast overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/40"></div>

    <UContainer class="relative mx-auto flex min-h-[64vh] items-center py-16 md:min-h-[72vh]">
      <div class="max-w-2xl">
        <!-- TODO: finalize headline -->
        <h1 class="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
          Konty Hospitality POS — Faster Tables, Happier Guests
        </h1>

        <!-- TODO: refine benefits -->
        <p class="mt-4 text-lg text-white/90 md:text-xl">
          Seat, fire, and split bills in seconds. Floor plan, kitchen tickets, and analytics built for busy teams.
        </p>

        <!-- CTAs -->
        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <UButton
            size="lg"
            color="primary"
            to="/demo"
            aria-label="Request a free Konty Hospitality demo"
            @click="onPrimaryCta"
          >
            Request Demo
          </UButton>
          <UButton
            size="lg"
            variant="outline"
            color="neutral"
            to="/pricing"
            aria-label="View Konty pricing"
            @click="onSecondaryCta"
          >
            View Pricing
          </UButton>
        </div>

        <p class="mt-3 text-sm text-white/80">
          Kitchen display ready • Table & menu management • Delivery integrations
        </p>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { $track } = useNuxtApp()
const onPrimaryCta = () => {
  $track?.ctaClick('Request Demo', 'Hospitality Hero')
  $track?.conversion?.('Hospitality Hero CTA')
}
const onSecondaryCta = () => {
  $track?.ctaClick('View Pricing', 'Hospitality Hero')
}
</script>
