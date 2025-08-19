<!-- components/HeroKonty.vue -->
<template>
  <section
    class="relative isolate bg-[url('https://martex-nuxtjs.vercel.app/_nuxt/hero-5.f5bed091.jpg')] dark:bg-[url('https://martex-nuxtjs.vercel.app/_nuxt/hero-5-dark.2157cbf7.jpg')] bg-cover bg-no-repeat bg-center"
    :aria-label="config.title"
  >
    <UContainer class="flex flex-col lg:grid py-32 sm:py-40 lg:py-44 gap-16 sm:gap-y-24 lg:grid-cols-2 lg:items-center">
      <UIAppear direction="left" :distance="64">
        <div>
          <div class="mb-4 font-semibold text-primary flex items-center gap-1.5">
            {{ config.tagline }}
          </div>

          <h1 class="text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-highlighted">
            {{ config.title }}
          </h1>

          <p class="text-lg sm:text-xl/8 text-muted text-pretty mt-6">
            {{ config.description }}
          </p>

          <div class="mt-10">
            <div class="flex flex-wrap gap-x-6 gap-y-3">
              <UButton
                color="primary"
                size="lg"
                to="#"
                class="text-base"
                @click="onPrimaryCta"
              >
                <UIcon name="i-lucide:square-play" class="mr-2 size-6" />
                {{ config.cta }}
              </UButton>
            </div>
          </div>
        </div>
      </UIAppear>

      <!-- Right column: product image -->
      <UIAppear direction="right" :distance="64">
        <NuxtImg
          src="https://martex-nuxtjs.vercel.app/_nuxt/hero-25-img.92cadc81.png"
          preset="hero"
          alt="App screenshot"
          width="1052"
          height="592"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          role="presentation"
        />
      </UIAppear>
    </UContainer>

    <!-- Wave footer -->
    <div class="wave-shape-bottom">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 170" aria-hidden="true">
        <path
          class="fill-white dark:fill-gray-900"
          fill-opacity="1"
          d="M0,160L120,160C240,160,480,160,720,138.7C960,117,1200,75,1320,53.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $track } = useNuxtApp() as {
  $track?: {
    ctaClick?: (label: string, area?: string) => void
    conversion?: (name: string) => void
  }
}

function onPrimaryCta(): void {
  $track?.ctaClick?.('Besplatan demo', 'Hero')
  $track?.conversion?.('Hero CTA')
}

const config = ref({
  title: 'Konty - POS na koji možete da računate',
  description: 'Kompletno rešenje za ugostiteljstvo i maloprodaju na jednom mjestu.',
  tagline: 'Aria i Allegra su sada',
  cta: 'Besplatan demo'
})
</script>

<style scoped>
.wave-shape-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px; /* hides seam */
  width: 100%;
  line-height: 0;
  pointer-events: none;
}
</style>
