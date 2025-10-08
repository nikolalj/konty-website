<template>
  <section
    class="pt-34 pb-16 relative isolate overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_#8d5494_0%,_#563275_40%,_#1f1633_100%)]"
    :aria-label="t('pages.products.hospitality.hero.title')"
  >
    <UContainer class="relative z-10 mb-0 sm:mb-14">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left Column: Content -->
        <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
          <!-- Tagline -->
          <UIAppear direction="up">
            <div class="mb-6 text-sm sm:text-base font-semibold px-3 py-2 bg-gradient-to-r from-[#C83852] via-[#B44092] to-[#6A5FC1] bg-[length:100%_100%] transition-all duration-300 text-white rounded-lg">
              {{ t('pages.products.hospitality.hero.tagline') }}
            </div>
          </UIAppear>

          <!-- Main Headline -->
          <UIAppear direction="up">
            <h1 class="mb-6 text-4xl sm:text-6xl text-balance font-bold text-white">
              {{ t('pages.products.hospitality.hero.title') }}
            </h1>
          </UIAppear>

          <!-- Subtitle -->
          <UIAppear direction="up">
            <p class="mb-8 text-xl text-balance text-white">
              {{ t('pages.products.hospitality.hero.subtitle') }}
            </p>
          </UIAppear>

          <!-- CTA Buttons -->
          <UIAppear direction="up">
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <AppCTAButton variant="primary" section="hero" class="dark bg-white" size="xl" />
              <AppCTAButton variant="secondary" section="hero" class="dark" size="xl" />
            </div>
          </UIAppear>
        </div>

        <!-- Right Column: Hero Image -->
        <UIAppear direction="right" class="w-full flex justify-center lg:justify-end">
          <NuxtImg
            src="/images/hero/hero2.png"
            format="avif"
            alt="Konty POS for hospitality - restaurant management dashboard"
            sizes="100vw xs:600px sm:768px md:1024px lg:600px"
            width="600"
            height="400"
            loading="eager"
            decoding="async"
            quality="90"
            fit="cover"
            fetchpriority="high"
            role="presentation"
            class="h-auto w-full max-w-lg lg:max-w-full"
          />
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
