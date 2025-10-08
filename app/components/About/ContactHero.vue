<template>
  <section class="relative isolate py-16 sm:py-24 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
    <UContainer>
      <UIAppear direction="up" :distance="32">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-highlighted">
            {{ t('pages.contact.hero.title') }}
          </h1>

          <p class="mt-6 text-lg sm:text-xl text-muted">
            {{ t('pages.contact.hero.subtitle') }}
          </p>
        </div>
      </UIAppear>

      <UIAppear direction="up" :delay="150">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <!-- Address -->
          <UPageCard class="text-center hover:shadow-xl transition-all duration-300">
            <div class="flex flex-col items-center p-6">
              <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <Icon name="i-lucide-map-pin" class="w-6 h-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-3">{{ t('pages.contact.address.title') }}</h3>
              <p class="text-sm text-muted">{{ t('pages.contact.address.line1') }}</p>
              <p class="text-sm text-muted">{{ t('pages.contact.address.line2') }}</p>
            </div>
          </UPageCard>

          <!-- Phone -->
          <UPageCard class="text-center hover:shadow-xl transition-all duration-300">
            <div class="flex flex-col items-center p-6">
              <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <Icon name="i-lucide-phone" class="w-6 h-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-3">{{ t('pages.contact.phone.title') }}</h3>
              <a
                :href="`tel:${t('pages.contact.phone.number').replace(/\s/g, '')}`"
                class="text-sm text-primary hover:underline"
              >
                {{ t('pages.contact.phone.number') }}
              </a>
            </div>
          </UPageCard>

          <!-- Email -->
          <UPageCard class="text-center hover:shadow-xl transition-all duration-300">
            <div class="flex flex-col items-center p-6">
              <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <Icon name="i-lucide-mail" class="w-6 h-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-3">{{ t('pages.contact.email.title') }}</h3>
              <a
                :href="`mailto:${t('pages.contact.email.address')}@konty.com`"
                class="text-sm text-primary hover:underline"
              >
                {{ t('pages.contact.email.address') }}@konty.com
              </a>
            </div>
          </UPageCard>

          <!-- Working Hours -->
          <UPageCard class="text-center hover:shadow-xl transition-all duration-300">
            <div class="flex flex-col items-center p-6">
              <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <Icon name="i-lucide-clock" class="w-6 h-6 text-primary" />
              </div>
              <h3 class="font-semibold text-lg mb-3">{{ t('pages.contact.hours.title') }}</h3>
              <p class="text-sm text-muted">{{ t('pages.contact.hours.weekdays') }}</p>
              <p class="text-sm text-muted">{{ t('pages.contact.hours.weekend') }}</p>
            </div>
          </UPageCard>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
