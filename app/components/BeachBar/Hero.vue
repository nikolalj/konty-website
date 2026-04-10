<template>
  <section class="relative isolate overflow-hidden">
    <!-- Sunset gradient background -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#f7a44c] via-[#e05a4e] via-[45%] to-[#0c4a6e]" />

    <!-- Sun glow effects -->
    <div class="absolute -right-8 -top-8 h-[200px] w-[200px] rounded-full bg-[#fde68a]/35 blur-[60px]" />
    <div class="absolute right-[6%] top-[8%] h-[60px] w-[60px] rounded-full bg-[#fef3c7]/50 blur-[40px]" />

    <!-- Content -->
    <UContainer class="relative z-10 pt-34 lg:pt-40 pb-16 lg:pb-20">
      <div class="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
        <!-- Copy -->
        <div class="text-center lg:text-left">
          <UIAppear>
            <div class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-sm text-white backdrop-blur-md">
              <span class="h-2 w-2 rounded-full bg-green-400" />
              {{ t('pages.solutions.beachBar.hero.badge') }}
            </div>
          </UIAppear>

          <UIAppear :delay-ms="100">
            <h1 class="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl whitespace-pre-line">
              {{ t('pages.solutions.beachBar.hero.title') }}
            </h1>
          </UIAppear>

          <UIAppear :delay-ms="200">
            <p class="mt-6 text-lg text-white/90 lg:leading-relaxed mx-auto max-w-xl lg:mx-0">
              {{ t('pages.solutions.beachBar.hero.subtitle') }}
            </p>
          </UIAppear>

          <UIAppear :delay-ms="300">
            <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start sm:gap-4">
              <AppCTAButton variant="beach-primary" custom-class="justify-center" section="beach-bar-hero" />
              <AppCTAButton variant="beach-secondary" custom-class="justify-center" section="beach-bar-hero" no-icon />
            </div>
          </UIAppear>
        </div>

        <!-- Beach floor plan screenshot -->
        <UIAppear direction="right" :delay-ms="400">
          <div class="relative mt-10 lg:mt-0">
            <div class="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
              <NuxtImg
                src="/images/solutions/beach-bar/floor-plan.png"
                alt="Konty POS beach floor plan"
                class="w-full rounded-xl"
                loading="lazy"
              />
            </div>
            <!-- Floating QR menu phone mockup -->
            <div class="absolute -bottom-6 -right-4 w-[130px] rounded-2xl border border-white/15 bg-white/10 p-1.5 backdrop-blur-sm shadow-xl lg:w-[150px]">
              <BeachBarQrMenuMockup />
            </div>
          </div>
        </UIAppear>
      </div>
    </UContainer>

    <!-- Wave SVG transition -->
    <div class="absolute -bottom-px left-0 right-0 h-20 lg:h-24">
      <svg viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute bottom-0 h-full w-full" preserveAspectRatio="none">
        <path d="M0 36C160 18 320 50 520 32C720 14 920 48 1100 30C1280 12 1380 40 1440 28V96H0V36Z" fill="#b9dfff" fill-opacity="0.3" />
        <path d="M0 48C200 28 400 58 600 40C800 22 1000 54 1200 38C1320 30 1400 46 1440 36V96H0V48Z" fill="#7cc5ff" fill-opacity="0.25" />
        <path d="M0 60C240 42 440 68 680 50C920 32 1100 62 1280 48C1380 40 1420 52 1440 44V96H0V60Z" fill="white" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
