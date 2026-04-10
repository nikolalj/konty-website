<template>
  <section class="bg-white py-16 lg:py-24">
    <UContainer>
      <!-- Pricing Header -->
      <UIAppear>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {{ t('pages.solutions.beachBar.pricing.title') }}
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            {{ t('pages.solutions.beachBar.pricing.subtitle') }}
          </p>
        </div>
      </UIAppear>

      <!-- Pricing Cards -->
      <UIAppear :delay-ms="100">
        <div class="mx-auto mt-12 grid max-w-[960px] gap-5 sm:grid-cols-3">
          <div
            v-for="plan in plans"
            :key="plan.key"
            class="relative rounded-2xl border-2 p-7 text-center"
            :class="plan.key === 'qr' ? 'border-primary-600 shadow-lg shadow-primary-100' : 'border-gray-200'"
          >
            <span
              class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
              :class="plan.badgeClass"
            >
              {{ t(`pages.solutions.beachBar.pricing.plans.${plan.key}.badge`) }}
            </span>
            <div class="mt-3 flex h-12 w-12 mx-auto items-center justify-center rounded-xl" :class="plan.iconBgClass">
              <Icon :name="plan.icon" class="h-6 w-6" :class="plan.iconClass" />
            </div>
            <h3 class="mt-2 text-lg font-bold text-gray-900">
              {{ t(`pages.solutions.beachBar.pricing.plans.${plan.key}.title`) }}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ t(`pages.solutions.beachBar.pricing.plans.${plan.key}.description`) }}
            </p>
            <div class="mt-4 rounded-xl p-3" :class="plan.priceClass">
              <div class="text-xl font-extrabold" :class="plan.priceTextClass">
                {{ t(`pages.solutions.beachBar.pricing.plans.${plan.key}.price`) }}
              </div>
              <div class="text-xs text-gray-500">
                {{ t(`pages.solutions.beachBar.pricing.plans.${plan.key}.priceNote`) }}
              </div>
            </div>
            <div class="mt-3 text-xs text-gray-400">
              {{ t(`pages.solutions.beachBar.pricing.plans.${plan.key}.footnote`) }}
            </div>
          </div>
        </div>
      </UIAppear>

      <!-- Viber CTA -->
      <UIAppear :delay-ms="200">
        <div class="mt-10 text-center">
          <p class="mb-4 text-base text-gray-500">
            {{ t('pages.solutions.beachBar.pricing.cta.prompt') }}
          </p>
          <AppCTAButton variant="beach-primary" section="beach-bar-pricing" />
        </div>
      </UIAppear>

    </UContainer>

    <!-- FAQ — uses the shared site-wide FAQ component, full width -->
    <div class="mt-16 lg:mt-24">
      <SharedFAQ category="beach-bar" variant="alt" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const plans = [
  { key: 'beach', icon: 'i-lucide-tree-palm', badgeClass: 'bg-blue-100 text-blue-800', priceClass: 'bg-blue-50', priceTextClass: 'text-gray-900', iconBgClass: 'bg-blue-100', iconClass: 'text-blue-600' },
  { key: 'qr', icon: 'i-lucide-qr-code', badgeClass: 'bg-primary-600 text-white', priceClass: 'bg-purple-50', priceTextClass: 'text-gray-900', iconBgClass: 'bg-primary-100', iconClass: 'text-primary-600' },
  { key: 'booking', icon: 'i-lucide-globe', badgeClass: 'bg-green-100 text-green-800', priceClass: 'bg-green-50', priceTextClass: 'text-green-700', iconBgClass: 'bg-green-100', iconClass: 'text-green-600' }
]
</script>
