<template>
  <SharedSection
    :title="config.title"
    :description="config.description"
  >
    <UIAppear>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
        <UPageCard
          v-for="(client, index) in clients.filter(client => !props.product || client.product === props.product)"
          :key="index"
          :title="client.name"
          :to="client.to"
          description="Nuxt UI v3 integrates with latest."
          target="_blank"
          variant="outline"
          spotlight
          spotlight-color="primary"
          :ui="{
            root: 'group hover:shadow-lg transition-all duration-300 hover:-translate-y-1',
          }"
          class="w-full bg-elevated hover:bg-muted cursor-pointer"
        >
          <div class="flex justify-center">
            <NuxtImg
              :src="client.logo"
              format="avif"
              loading="lazy"
              :alt="client.name"
              role="presentation"
              width="80"
              height="80"
              quality="70"
              fit="cover"
            />
          </div>
        </UPageCard>
      </div>
    </UIAppear>
  </SharedSection>
</template>

<script setup lang="ts">
const props = defineProps({
  product: {
    type: String as PropType<'retail' | 'hospitality' | undefined>,
    default: undefined
  },
})

const { t } = useI18n()

const config = ref({
  title: t('pages.home.clients.title'),
  description: t('pages.home.clients.description')
})

const clients = ref([
  {
    name: 'Microsoft',
    logo: '/images/clients/client1.png',
    icon: 'i-simple-icons-microsoft',
    colorClass: 'text-[#00A1F1]',
    product: 'retail',
    to: '#'
  },
  {
    name: 'Google',
    logo: '/images/clients/client1.png',
    icon: 'i-simple-icons-google',
    colorClass: 'text-[#4285F4]',
    product: 'retail',
    to: '#'
  },
  {
    name: 'Apple',
    logo: '/images/clients/client1.png',
    icon: 'i-simple-icons-apple',
    colorClass: 'text-default',
    product: 'hospitality',
    to: '#'
  },
  {
    name: 'Amazon',
    logo: '/images/clients/client1.png',
    icon: 'i-simple-icons-amazon',
    colorClass: 'text-[#FF9900]',
    product: 'hospitality',
    to: '#'
  },
  {
    name: 'Meta',
    logo: '/images/clients/client1.png',
    icon: 'i-simple-icons-meta',
    colorClass: 'text-[#1877F2]',
    product: 'hospitality',
    to: '#'
  },
  {
    name: 'Netflix',
    logo: '/images/clients/client1.png',
    icon: 'i-simple-icons-netflix',
    colorClass: 'text-[#E50914]',
    product: 'hospitality',
    to: '#'
  }
])
</script>
