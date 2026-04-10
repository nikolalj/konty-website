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
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
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
              <Icon :name="cardIcons[card] ?? ''" class="h-6 w-6 text-primary-600" />
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
            <AppCTAButton variant="beach-primary" :custom-label="t('pages.solutions.beachBar.aria.cta')" section="beach-bar-aria" />
          </div>
        </UIAppear>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const cardKeys = ['api', 'transition', 'features'] as const
const cardIcons: Record<string, string> = {
  api: 'i-lucide-refresh-cw',
  transition: 'i-lucide-zap',
  features: 'i-lucide-tree-palm'
}
</script>
