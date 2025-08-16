<template>
  <!--
    INSTUCTIONS

    HERO SECTION – LCP-optimized, accessible, conversion-focused

    ✅ What you MUST provide to make this live:
      1) Replace /images/hero-main.webp with your real hero asset (public/images/hero-main.webp).
         - Prefer 2400×1200 (or larger) source. Nuxt Image will resize via the "hero" preset.
      2) Update H1 + paragraph copy (keep it concise; 1–2 lines).
      3) Confirm CTA routes (/demo, /pricing) and labels.
      4) If the image is informative (not purely decorative), provide a real alt text.

    ⚙️ Why this setup:
      - <NuxtImg loading="eager" fetchpriority="high">: tells the browser "this is the LCP image".
      - preset="hero": uses your nuxt.config image preset (width/height/quality) for zero CLS.
      - sizes="100vw": lets the browser pick the best responsive width.
      - Decorative image uses alt="" + role="presentation" so SRs jump to H1 immediately.
  -->
  <section class="relative isolate">
    <!-- Full-bleed background image (LCP target) -->
    <!-- <NuxtImg
      src="/images/hero-main.webp"
      preset="hero"
      :sizes="'100vw'"
      loading="eager"
      fetchpriority="high"
      alt=""
      role="presentation"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
    /> -->

    <!-- Contrast overlay to ensure WCAG-compliant text contrast over the photo -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>

    <!-- Content container: vertically centers hero content and constrains line-length -->
    <UContainer class="relative mx-auto flex min-h-[64vh] items-center py-16 md:min-h-[72vh]">
      <div class="max-w-2xl">
        <!--
          TODO: Replace H1 with final localized headline.
          - Keep it under ~60–70 chars.
          - Only one H1 per page; other sections should use h2/h3.
        -->
        <h1 class="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          Run Your Retail & Hospitality POS on Konty
        </h1>

        <!--
          TODO: Replace with subheading that supports the H1.
          - 1–2 short sentences. Focus on outcomes (speed, accuracy, insights).
        -->
        <p class="mt-4 text-lg md:text-xl">
          Faster checkout. Real-time inventory. Clear insights. Everything your team needs to sell smarter.
        </p>

        <!-- Primary actions: put the money CTAs here -->
        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <!--
            TODO: Confirm route (/demo). Keep label action-oriented.
            - Add @click tracking if you want to record funnel events.
          -->
          <UButton
            size="lg"
            color="primary"
            to="/demo"
            aria-label="Request a free Konty demo"
            @click="onPrimaryCta"
          >
            Request Free Demo
          </UButton>

          <!--
            Secondary action: pricing or features.
            TODO: Confirm route (/pricing) and label.
          -->
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

        <!-- Trust microcopy: reduces friction and boosts CTR on CTAs -->
        <p class="mt-3 text-sm">
          No credit card • Live onboarding • Works with existing hardware
        </p>

        <!--
          OPTIONAL: key logos row here (client logos). If you add logos:
          - Use NuxtImg for each logo (lazy load, width/height set).
          - Keep height small (e.g., h-6/h-8) and ensure alt text names the brand.
        -->
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
/**
 * Analytics tracking (optional but recommended):
 * Hook into your $track plugin to measure CTA performance and iterate copy/design.
 * If you don't use analytics yet, this is safe to keep (no-ops when $track is missing).
 */
const { $track } = useNuxtApp()

const onPrimaryCta = () => {
  $track?.ctaClick('Request Demo', 'Hero')
  $track?.conversion?.('Hero CTA')
}

const onSecondaryCta = () => {
  $track?.ctaClick('View Pricing', 'Hero')
}
</script>

<style scoped>
/*
  Optional hero-specific styles can go here.
  Keep layout in Tailwind for consistency with the rest of the project.
*/
</style>
