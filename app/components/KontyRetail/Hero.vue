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
    <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>

    <UContainer class="relative mx-auto flex min-h-[64vh] items-center py-16 md:min-h-[72vh]">
      <div class="max-w-2xl">
        <!-- TODO: finalize headline (≤ ~70 chars) -->
        <h1 class="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
          Konty Retail POS — Faster Checkout, Smarter Inventory
        </h1>

        <!-- TODO: tighten supporting copy to 1–2 sentences focused on outcomes -->
        <p class="mt-4 text-lg text-white/90 md:text-xl">
          Scan, sell, and restock with confidence. Real-time inventory and clean reports that keep margins healthy.
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
            Request Demo
          </UButton>
          <UButton
            size="lg"
            variant="outline"
            color="neutral"
            to="/pricing"
            aria-label="See Konty pricing"
            @click="onSecondaryCta"
          >
            See Pricing
          </UButton>
        </div>

        <p class="mt-3 text-sm text-white/80">
          Barcode ready • Multi-store support • Works with existing hardware
        </p>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { $track } = useNuxtApp()
const onPrimaryCta = () => {
  $track?.ctaClick('Request Demo', 'Retail Hero')
  $track?.conversion?.('Retail Hero CTA')
}
const onSecondaryCta = () => {
  $track?.ctaClick('See Pricing', 'Retail Hero')
}
</script>
