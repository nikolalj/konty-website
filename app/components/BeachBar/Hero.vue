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
        <div>
          <UIAppear>
            <div class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-sm text-white backdrop-blur-md">
              <span class="h-2 w-2 rounded-full bg-green-400" />
              {{ t('pages.solutions.beachBar.hero.badge') }}
            </div>
          </UIAppear>

          <UIAppear :delay-ms="100">
            <h1 class="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[3.25rem] lg:leading-[1.12] whitespace-pre-line">
              {{ t('pages.solutions.beachBar.hero.title') }}
            </h1>
          </UIAppear>

          <UIAppear :delay-ms="200">
            <p class="mt-6 max-w-xl text-base text-white/90 lg:text-lg lg:leading-relaxed">
              {{ t('pages.solutions.beachBar.hero.subtitle') }}
            </p>
          </UIAppear>

          <UIAppear :delay-ms="300">
            <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <AppCTAButton
                variant="custom"
                :custom-label="t('pages.solutions.beachBar.hero.cta.viber')"
                :custom-to="viberLink"
                custom-icon="i-simple-icons-viber"
                custom-class="justify-center rounded-full bg-[#7360f2] !text-white hover:bg-[#6350e2] !ring-0"
                external
                section="beach-bar-hero"
              />
              <AppCTAButton
                variant="custom"
                :custom-label="t('pages.solutions.beachBar.hero.cta.demo')"
                custom-to="/demo"
                custom-class="justify-center rounded-full border-2 border-white/50 !text-white hover:bg-white/10 !ring-0 bg-transparent"
                no-icon
                section="beach-bar-hero"
              />
            </div>
          </UIAppear>
        </div>

        <!-- Screenshot placeholder -->
        <UIAppear direction="right" :delay-ms="400">
          <div class="relative mt-10 lg:mt-0">
            <div class="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <div class="flex aspect-[4/3] items-center justify-center rounded-xl bg-white/5 text-center text-sm text-white/50">
                <div>
                  <Icon name="i-lucide-layout-dashboard" class="mx-auto mb-2 h-12 w-12 opacity-50" />
                  <p>Beach Floor Plan Screenshot</p>
                </div>
              </div>
            </div>
            <!-- Floating phone mockup -->
            <div class="absolute -bottom-4 -right-4 w-[120px] rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-sm lg:w-[140px]">
              <div class="flex aspect-[9/16] max-h-[180px] items-center justify-center rounded-xl bg-white/5 text-center text-xs text-white/50">
                <div>
                  <Icon name="i-lucide-smartphone" class="mx-auto mb-1 h-6 w-6 opacity-50" />
                  <p>QR Menu</p>
                </div>
              </div>
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
const localePath = useLocalePath()
const { viberLink } = useViberLink()
</script>
