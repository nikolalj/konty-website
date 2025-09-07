<template>
  <section class="py-12 sm:py-16">
    <UContainer>
      <SharedSectionHeading
        :title="config.title"
        :description="config.description"
      />

      <!-- Simplified Client Logos Grid - Less DOM nesting -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
        <a
          v-for="(client, index) in filteredClients"
          :key="index"
          :href="client.to"
          :title="client.name"
          target="_blank"
          rel="noopener"
          class="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-full flex justify-center items-center"
        >
          <img
            :src="client.logo"
            :alt="client.name"
            loading="lazy"
            width="80"
            height="80"
            class="opacity-60 group-hover:opacity-100 transition-opacity"
          >
        </a>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  product: {
    type: String as PropType<'kontyRetail' | 'kontyHospitality' | undefined>,
    default: undefined
  },
})

const { t } = useI18n()

const config = ref({
  title: t('pages.home.clients.title'),
  description: t('pages.home.clients.description')
})

// Computed property for filtered clients
const filteredClients = computed(() => {
  return clients.value.filter(client => !props.product || client.product === props.product)
})

const clients = ref([
  {
    name: 'Microsoft',
    logo: '/images/clients/client1.png',
    icon: 'i-simple-icons-microsoft',
    colorClass: 'text-[#00A1F1]',
    product: 'kontyRetail',
    to: '#'
  },
  {
    name: 'Google',
    logo: '/images/clients/client1.png',
    icon: 'i-simple-icons-google',
    colorClass: 'text-[#4285F4]',
    product: 'kontyRetail',
    to: '#'
  },
  {
    name: 'Apple',
    logo: '/images/clients/client1.png',
    icon: 'i-simple-icons-apple',
    colorClass: 'text-default',
    product: 'kontyHospitality',
    to: '#'
  },
  {
    name: 'Amazon',
    logo: '/images/clients/client1.png',
    icon: 'i-simple-icons-amazon',
    colorClass: 'text-[#FF9900]',
    product: 'kontyHospitality',
    to: '#'
  },
  {
    name: 'Meta',
    logo: '/images/clients/client1.png',
    icon: 'i-simple-icons-meta',
    colorClass: 'text-[#1877F2]',
    product: 'kontyHospitality',
    to: '#'
  },
  {
    name: 'Netflix',
    logo: '/images/clients/client1.png',
    icon: 'i-simple-icons-netflix',
    colorClass: 'text-[#E50914]',
    product: 'kontyHospitality',
    to: '#'
  }
])
</script>

