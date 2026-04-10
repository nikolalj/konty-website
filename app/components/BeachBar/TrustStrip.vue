<template>
  <section class="bg-white py-8">
    <UContainer>
      <UIAppear>
        <div class="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <!-- Stats -->
          <div class="flex items-center gap-6 text-sm text-gray-500">
            <span>
              <strong class="text-lg font-extrabold text-primary-600">{{ t('pages.solutions.beachBar.trustStrip.years') }}</strong>
              {{ t('pages.solutions.beachBar.trustStrip.yearsLabel') }}
            </span>
            <span class="text-gray-300">&middot;</span>
            <span>
              <strong class="text-lg font-extrabold text-primary-600">{{ t('pages.solutions.beachBar.trustStrip.users') }}</strong>
              {{ t('pages.solutions.beachBar.trustStrip.usersLabel') }}
            </span>
            <span class="text-gray-300">&middot;</span>
            <span>
              <strong class="text-lg font-extrabold text-primary-600">{{ t('pages.solutions.beachBar.trustStrip.countries') }}</strong>
              {{ t('pages.solutions.beachBar.trustStrip.countriesLabel') }}
            </span>
          </div>

          <!-- Client logos -->
          <div class="flex items-center gap-6 overflow-x-auto">
            <NuxtImg
              v-for="client in clients"
              :key="client.name"
              :src="client.logo"
              :alt="client.name"
              class="h-6 w-auto opacity-40 grayscale"
              loading="lazy"
            />
          </div>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { clients as allClients } from '~/config/clients'

const { t, locale } = useI18n()

const clients = computed(() => {
  const localeClients = allClients[locale.value as keyof typeof allClients] || allClients.me
  return localeClients.filter((c: { product: string }) => c.product === 'hospitality').slice(0, 6)
})
</script>
