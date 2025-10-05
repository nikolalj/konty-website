<template>
  <SharedSection
    :variant="props.variant"
    :title="config.title"
    :description="config.description"
  >
    <UIAppear>
      <div class="flex flex-wrap gap-8 items-center justify-center">
        <UPageCard
          v-for="(client, index) in clients.filter(client => !props.product || client.product === props.product)"
          :key="index"
          variant="outline"
          spotlight
          spotlight-color="primary"
          :ui="{
            root: 'group hover:shadow-lg transition-all duration-300 hover:-translate-y-1',
          }"
        >
          <NuxtImg
            :src="client.logo"
            format="avif"
            loading="lazy"
            :alt="client.name"
            role="presentation"
            width="120"
            height="120"
            quality="80"
            fit="cover"
          />
        </UPageCard>
      </div>
    </UIAppear>
  </SharedSection>
</template>

<script setup lang="ts">
import type { SectionVariantType } from '~/types/components'

const props = defineProps({
  variant: {
    type: String as PropType<SectionVariantType>,
    default: undefined,
  },
  product: {
    type: String as PropType<'retail' | 'hospitality' | undefined>,
    default: undefined
  }
})

const { t } = useI18n()

const config = ref({
  title: t('pages.home.clients.title'),
  description: t('pages.home.clients.description')
})

const clients = ref([
  {
    name: 'Adiya Hotel',
    logo: '/images/clients/adiya.avif',
    product: 'hospitality',
  },
  {
    name: 'Baracuda Fish Restaurant',
    logo: '/images/clients/baracuda.avif',
    product: 'hospitality',
  },
  {
    name: 'Fishermans Pub',
    logo: '/images/clients/fishermanspub.avif',
    product: 'hospitality',
  },
  {
    name: 'Hotel Enigma',
    logo: '/images/clients/hotelenigma.avif',
    product: 'hospitality',
  },
  {
    name: 'Pulena Bar',
    logo: '/images/clients/pulenabar.avif',
    product: 'hospitality',
  },
  {
    name: 'Hotel Pelikan',
    logo: '/images/clients/hotelpelikan.avif',
    product: 'hospitality',
  },
  {
    name: 'Sapore di Mare',
    logo: '/images/clients/saporedimare.avif',
    product: 'hospitality',
  },
  {
    name: 'Tasa Restoran',
    logo: '/images/clients/tasa.avif',
    product: 'hospitality',
  },
  {
    name: 'La Paz',
    logo: '/images/clients/lapaz.avif',
    product: 'hospitality',
  },
  {
    name: 'COCO Beach & Restaurant',
    logo: '/images/clients/coco.avif',
    product: 'hospitality',
  },
  {
    name: 'Tri Ribara',
    logo: '/images/clients/triribara.avif',
    product: 'hospitality',
  },
  {
    name: 'Konoba Amanet',
    logo: '/images/clients/konobaamanet.avif',
    product: 'hospitality',
  },
])
</script>
