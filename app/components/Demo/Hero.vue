<template>
  <section
    class="pt-34 pb-20 relative isolate overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_#8d5494_0%,_#563275_40%,_#1f1633_100%)]"
    :aria-label="t('pages.demo.hero.title')"
  >
    <UContainer class="relative z-10">
      <div class="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
        <!-- Left Column - Text Content with Benefits -->
        <div class="text-white">
          <UIAppear direction="up">
            <h1 class="text-4xl lg:text-5xl font-bold mb-6">
              {{ t('pages.demo.hero.title') }}
            </h1>
          </UIAppear>

          <UIAppear direction="up">
            <p class="text-xl mb-8">
              {{ t('pages.demo.hero.subtitle') }}
            </p>
          </UIAppear>

          <!-- Key Benefits -->
          <UIAppear direction="up">
            <div class="space-y-4 mb-8">
              <div v-for="(benefit, index) in benefits" :key="index" class="flex items-start gap-3">
                <div class="flex-shrink-0">
                  <div class="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center">
                    <UIcon name="i-lucide-check" class="w-4 h-4 text-primary" />
                  </div>
                </div>
                <p>{{ t(benefit) }}</p>
              </div>
            </div>
          </UIAppear>
        </div>

        <!-- Right Column - Booking Form -->
        <UIAppear direction="left">
          <div id="demo-form" class="bg-white rounded-2xl shadow-2xl p-8 lg:mt-0">
            <h3 class="text-2xl font-bold mb-2">
              {{ t('pages.demo.hero.formTitle') }}
            </h3>
            <p class="mb-6 text-sm">
              {{ t('pages.demo.hero.formDescription') }}
            </p>

            <!-- Demo Contact Form -->
            <SharedContactForm variant="demo" />
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
        class="fill-[var(--ui-bg-alt)]"
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

const benefits = [
  'pages.demo.hero.benefits.benefit1',
  'pages.demo.hero.benefits.benefit2',
  'pages.demo.hero.benefits.benefit3',
  'pages.demo.hero.benefits.benefit4'
]
</script>
