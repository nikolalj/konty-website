<template>
  <section class="bg-gray-50 py-16 lg:py-24">
    <UContainer>
      <!-- Header -->
      <UIAppear>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {{ t('pages.solutions.beachBar.solution.title') }}
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            {{ t('pages.solutions.beachBar.solution.subtitle') }}
          </p>
        </div>
      </UIAppear>

      <!-- Tiers -->
      <div class="mt-16 space-y-20">
        <!-- Tier 1: Beach Management — copy left, screenshot right -->
        <UIAppear>
          <div class="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <span class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
                {{ t('pages.solutions.beachBar.solution.tiers.beach.badge') }}
              </span>
              <h3 class="mt-4 text-2xl font-bold text-gray-900">
                {{ t('pages.solutions.beachBar.solution.tiers.beach.title') }}
              </h3>
              <p class="mt-3 text-base leading-relaxed text-gray-600">
                {{ t('pages.solutions.beachBar.solution.tiers.beach.description') }}
              </p>
              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="feature in tArray('pages.solutions.beachBar.solution.tiers.beach.features')"
                  :key="feature"
                  class="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
            <div class="mt-8 lg:mt-0">
              <div class="flex aspect-[16/10] items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500">
                <div class="text-center">
                  <Icon name="i-lucide-layout-dashboard" class="mx-auto mb-2 h-10 w-10 opacity-40" />
                  <p>Beach Floor Plan Screenshot</p>
                </div>
              </div>
            </div>
          </div>
        </UIAppear>

        <!-- Tier 2: QR Ordering — screenshot left, copy right -->
        <UIAppear>
          <div class="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div class="order-2 lg:order-1">
              <div class="mx-auto flex aspect-[9/16] max-h-[360px] max-w-[200px] items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500">
                <div class="text-center">
                  <Icon name="i-lucide-smartphone" class="mx-auto mb-2 h-10 w-10 opacity-40" />
                  <p>QR Menu Screenshot</p>
                </div>
              </div>
            </div>
            <div class="order-1 mb-8 lg:order-2 lg:mb-0">
              <span class="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                {{ t('pages.solutions.beachBar.solution.tiers.qr.badge') }}
              </span>
              <h3 class="mt-4 text-2xl font-bold text-gray-900">
                {{ t('pages.solutions.beachBar.solution.tiers.qr.title') }}
              </h3>
              <p class="mt-3 text-base leading-relaxed text-gray-600">
                {{ t('pages.solutions.beachBar.solution.tiers.qr.description') }}
              </p>
              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="feature in tArray('pages.solutions.beachBar.solution.tiers.qr.features')"
                  :key="feature"
                  class="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </UIAppear>

        <!-- Tier 3: Online Booking — copy left, screenshot right -->
        <UIAppear>
          <div class="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <span class="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-800">
                {{ t('pages.solutions.beachBar.solution.tiers.booking.badge') }}
              </span>
              <h3 class="mt-4 text-2xl font-bold text-gray-900">
                {{ t('pages.solutions.beachBar.solution.tiers.booking.title') }}
              </h3>
              <p class="mt-3 text-base leading-relaxed text-gray-600">
                {{ t('pages.solutions.beachBar.solution.tiers.booking.description') }}
              </p>
              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="feature in tArray('pages.solutions.beachBar.solution.tiers.booking.features')"
                  :key="feature"
                  class="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700"
                >
                  {{ feature }}
                </span>
              </div>
              <!-- Checklist -->
              <div class="mt-6 space-y-3">
                <div v-for="item in ['map', 'email', 'pricing', 'language']" :key="item" class="flex items-start gap-3">
                  <div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-green-100">
                    <Icon name="i-lucide-check" class="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">{{ t(`pages.solutions.beachBar.solution.tiers.booking.checklist.${item}.title`) }}</div>
                    <div class="text-sm text-gray-500">{{ t(`pages.solutions.beachBar.solution.tiers.booking.checklist.${item}.description`) }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative mt-8 lg:mt-0">
              <div class="flex aspect-[16/10] items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500 shadow-lg">
                <div class="text-center">
                  <Icon name="i-lucide-globe" class="mx-auto mb-2 h-10 w-10 opacity-40" />
                  <p>plazni.bar Screenshot</p>
                </div>
              </div>
              <!-- Floating zero-cost badge -->
              <div class="absolute -bottom-3 right-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-md">
                <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                  <Icon name="i-lucide-circle-check" class="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div class="text-sm font-bold text-green-700">0 EUR</div>
                  <div class="text-xs text-gray-500">{{ t('pages.solutions.beachBar.pricing.plans.booking.priceNote') }}</div>
                </div>
              </div>
            </div>
          </div>
        </UIAppear>
      </div>

      <!-- How It Works Timeline -->
      <UIAppear>
        <div class="mt-20 border-t border-gray-200 pt-16">
          <div class="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
            <!-- Connector line (desktop only) -->
            <div class="absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 via-purple-200 to-pink-200 lg:block" />

            <div v-for="(step, i) in steps" :key="step.key" class="relative text-center">
              <div
                class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-white shadow-md"
                :class="step.bgClass"
              >
                <Icon :name="step.icon" class="h-7 w-7" :class="step.iconClass" />
              </div>
              <div class="mb-1 text-[11px] font-bold uppercase tracking-widest" :class="step.labelClass">
                {{ i + 1 }}
              </div>
              <h4 class="text-sm font-bold text-gray-900">
                {{ t(`pages.solutions.beachBar.solution.howItWorks.${step.key}.title`) }}
              </h4>
              <p class="mt-1 text-xs text-gray-500">
                {{ t(`pages.solutions.beachBar.solution.howItWorks.${step.key}.description`) }}
              </p>
            </div>
          </div>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { tArray } = useUtils()

const steps = [
  { key: 'step1', icon: 'i-lucide-settings', bgClass: 'bg-gradient-to-br from-blue-100 to-blue-200', labelClass: 'text-blue-500', iconClass: 'text-blue-600' },
  { key: 'step2', icon: 'i-lucide-qr-code', bgClass: 'bg-gradient-to-br from-indigo-100 to-indigo-200', labelClass: 'text-indigo-500', iconClass: 'text-indigo-600' },
  { key: 'step3', icon: 'i-lucide-sun', bgClass: 'bg-gradient-to-br from-purple-100 to-purple-200', labelClass: 'text-purple-500', iconClass: 'text-purple-600' },
  { key: 'step4', icon: 'i-lucide-trending-up', bgClass: 'bg-gradient-to-br from-pink-100 to-pink-200', labelClass: 'text-pink-500', iconClass: 'text-pink-600' }
]
</script>
