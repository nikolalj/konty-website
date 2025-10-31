<template>
  <SharedSection
    :variant="props.variant"
    :title="config.title"
    :description="config.description"
  >
    <UIAppear>
      <div class="flex flex-wrap gap-8 items-center justify-center">
        <UPageCard
          v-for="(client, index) in clientList.filter(
            (client) => !props.product || client.product === props.product
          )"
          :key="index"
          variant="outline"
          spotlight
          spotlight-color="primary"
          :ui="{
            root: 'group hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
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
import { clients } from '~/config/clients'

const { locale } = useI18n()

const props = defineProps({
  variant: {
    type: String as PropType<SectionVariantType>,
    default: undefined
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

const clientList = ref(clients[locale.value])
</script>
