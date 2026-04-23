<template>
  <section class="bg-white py-8">
    <UContainer>
      <UIAppear>
        <div class="flex items-center justify-center gap-6 overflow-x-auto">
          <NuxtImg
            v-for="client in clients"
            :key="client.name"
            :src="client.logo"
            :alt="client.name"
            class="h-6 w-auto opacity-40 grayscale"
            loading="lazy"
          />
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { clients as allClients } from '~/config/clients'

const { locale } = useI18n()

const clients = computed(() => {
  const localeClients = allClients[locale.value as keyof typeof allClients] || allClients.me
  return localeClients.filter((c: { product: string }) => c.product === 'hospitality').slice(0, 6)
})
</script>
