<template>
  <section
    class="pt-34 relative isolate overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_#8d5494_0%,_#563275_40%,_#1f1633_100%)]"
    :aria-label="t('pages.home.hero.title')"
  >
    <UContainer class="pb-12 sm:pb-24 relative z-10">
      <div class="flex flex-col items-center text-center">
        <!-- Tagline -->
        <UIAppear direction="up">
          <div class="mb-6 text-sm sm:text-base font-semibold px-3 py-2 bg-gradient-to-r from-[#C83852] via-[#B44092] to-[#6A5FC1] bg-[length:100%_100%] transition-all duration-300 text-white rounded-lg">
            {{ t('pages.home.hero.tagline') }}
          </div>
        </UIAppear>

        <!-- Main Headline with Animation -->
        <UIAppear direction="up">
          <h1 class="mb-6 text-4xl sm:text-6xl text-balance font-bold text-white">
            {{ t('pages.home.hero.title') }}
          </h1>
        </UIAppear>

        <!-- Subtitle -->
        <UIAppear direction="up">
          <p class="mb-8 text-xl text-balance max-w-3xl text-white">
            {{ t('pages.home.hero.subtitle') }}
          </p>
        </UIAppear>

        <!-- CTA Buttons -->
        <UIAppear direction="up">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <AppCTAButton variant="primary" section="hero" class="dark bg-white" size="xl" />
            <AppCTAButton variant="secondary" section="hero" class="dark" size="xl" />
          </div>
        </UIAppear>

        <!-- Product Selection Cards -->
        <UIAppear direction="down" class="mb-16 mt-12 w-full max-w-6xl">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Hospitality Card -->
            <NuxtLink
              to="/products/hospitality"
              class="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 transition-all duration-300 hover:bg-white/15 hover:border-white/30"
            >
              <div class="relative block overflow-hidden aspect-[5/3] rounded-xl">
                <NuxtImg
                  src="/images/features/hospitality.avif"
                  format="avif"
                  loading="lazy"
                  alt="Hospitality products"
                  quality="80"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div class="absolute inset-0 flex flex-col items-center justify-end pb-6 px-6">
                  <h2 class="text-white text-xl font-bold text-center mb-1">
                    {{ t('ui.navigation.products.forHospitality') }}
                  </h2>
                  <p class="text-white/90 text-sm text-center">
                    {{ t('ui.learnMore') }}
                  </p>
                </div>
              </div>
            </NuxtLink>

            <!-- Retail Card -->
            <NuxtLink
              to="/products/retail"
              class="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 transition-all duration-300 hover:bg-white/15 hover:border-white/30"
            >
              <div class="relative block overflow-hidden aspect-[5/3] rounded-xl">
                <NuxtImg
                  src="/images/features/retail.avif"
                  format="avif"
                  loading="lazy"
                  alt="Retail products"
                  quality="80"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div class="absolute inset-0 flex flex-col items-center justify-end pb-6 px-6">
                  <h2 class="text-white text-xl font-bold text-center mb-1">
                    {{ t('ui.navigation.products.forRetail') }}
                  </h2>
                  <p class="text-white/90 text-sm text-center">
                    {{ t('ui.learnMore') }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </div>
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
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
