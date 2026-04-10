<template>
  <section class="bg-white py-16 lg:py-24">
    <UContainer>
      <!-- Pricing Header -->
      <UIAppear>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
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
            <div class="mt-3 text-3xl">{{ plan.icon }}</div>
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
          <UButton
            :to="viberLink"
            external
            size="lg"
            class="rounded-full bg-[#7360f2] font-semibold text-white hover:bg-[#6350e2]"
          >
            <Icon name="i-simple-icons-viber" class="h-5 w-5" />
            {{ t('pages.solutions.beachBar.hero.cta.viber') }}
          </UButton>
        </div>
      </UIAppear>

      <!-- FAQ -->
      <UIAppear :delay-ms="100">
        <div class="mx-auto mt-20 max-w-3xl">
          <h2 class="mb-8 text-center text-2xl font-extrabold text-gray-900">
            {{ t('pages.solutions.beachBar.faq.title') }}
          </h2>
          <div class="space-y-3">
            <div
              v-for="(item, index) in faqItems"
              :key="index"
              class="rounded-xl border transition-colors"
              :class="openFaq.includes(index) ? 'border-primary-200 bg-primary-50/50' : 'border-gray-200 hover:border-gray-300'"
            >
              <button
                :id="`beach-faq-trigger-${index}`"
                :aria-expanded="openFaq.includes(index)"
                :aria-controls="`beach-faq-panel-${index}`"
                class="flex w-full items-center justify-between gap-4 p-5 text-left"
                @click="toggleFaq(index)"
              >
                <span class="text-base font-semibold text-gray-900">{{ item.question }}</span>
                <Icon
                  name="i-lucide-chevron-down"
                  class="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200"
                  :class="openFaq.includes(index) ? 'rotate-180' : ''"
                />
              </button>
              <div
                :id="`beach-faq-panel-${index}`"
                role="region"
                :aria-labelledby="`beach-faq-trigger-${index}`"
                class="grid transition-all duration-200"
                :style="{ gridTemplateRows: openFaq.includes(index) ? '1fr' : '0fr' }"
              >
                <div class="overflow-hidden">
                  <p class="px-5 pb-5 text-sm leading-relaxed text-gray-600">
                    {{ item.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { viberLink } = useViberLink()

const plans = [
  { key: 'beach', icon: '🏖️', badgeClass: 'bg-blue-100 text-blue-800', priceClass: 'bg-blue-50', priceTextClass: 'text-gray-900' },
  { key: 'qr', icon: '📱', badgeClass: 'bg-primary-600 text-white', priceClass: 'bg-purple-50', priceTextClass: 'text-gray-900' },
  { key: 'booking', icon: '🌐', badgeClass: 'bg-green-100 text-green-800', priceClass: 'bg-green-50', priceTextClass: 'text-green-700' }
]

const faqItems = computed(() => {
  const items = []
  let i = 1
  while (i <= 10) {
    const q = t(`pages.solutions.beachBar.faq.q${i}`, '')
    const a = t(`pages.solutions.beachBar.faq.a${i}`, '')
    if (!q || !a) break
    items.push({ question: q, answer: a })
    i++
  }
  return items
})

const openFaq = ref<number[]>([])
const toggleFaq = (index: number) => {
  const pos = openFaq.value.indexOf(index)
  if (pos > -1) openFaq.value.splice(pos, 1)
  else openFaq.value.push(index)
}
</script>
