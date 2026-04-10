<template>
  <section class="bg-gray-50 py-16 lg:py-24">
    <UContainer>
      <div class="mx-auto max-w-[720px]">
        <!-- Logo transition -->
        <UIAppear>
          <div class="mb-8 flex items-center justify-center gap-6">
            <div class="rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
              <NuxtImg
                src="/images/solutions/beach-bar/aria-logo.svg"
                alt="Aria POS"
                class="h-8 w-auto"
              />
            </div>
            <Icon name="i-lucide-arrow-right" class="h-7 w-7 text-primary-600" />
            <div class="rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
              <NuxtImg
                src="/images/branding/logo-dark.svg"
                alt="Konty POS"
                class="h-8 w-auto"
              />
            </div>
          </div>
        </UIAppear>

        <!-- Copy -->
        <UIAppear :delay-ms="100">
          <div class="text-center">
            <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {{ t('pages.solutions.beachBar.aria.title') }}
            </h2>
            <p class="mt-4 text-base leading-relaxed text-gray-600">
              {{ t('pages.solutions.beachBar.aria.description') }}
            </p>
          </div>
        </UIAppear>

        <!-- Migration cards -->
        <UIAppear :delay-ms="200">
          <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div v-for="card in cardKeys" :key="card" class="rounded-xl border border-gray-200 bg-white p-5 text-center">
              <span class="text-2xl">{{ cardIcons[card] }}</span>
              <div class="mt-2 text-sm font-semibold text-gray-900">
                {{ t(`pages.solutions.beachBar.aria.cards.${card}.title`) }}
              </div>
              <div class="mt-1 text-xs text-gray-500">
                {{ t(`pages.solutions.beachBar.aria.cards.${card}.description`) }}
              </div>
            </div>
          </div>
        </UIAppear>

        <!-- CTA -->
        <UIAppear :delay-ms="300">
          <div class="mt-8 text-center">
            <UButton
              :to="viberLink"
              external
              size="lg"
              class="rounded-full bg-primary-600 font-semibold text-white hover:bg-primary-700"
            >
              {{ t('pages.solutions.beachBar.aria.cta') }}
            </UButton>
          </div>
        </UIAppear>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { viberLink } = useViberLink()

const cardKeys = ['api', 'transition', 'features'] as const
const cardIcons: Record<string, string> = {
  api: '🔄',
  transition: '⚡',
  features: '🏖️'
}
</script>
