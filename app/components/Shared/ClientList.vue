<template>
  <section class="py-12 sm:py-16">
    <UContainer>
      <SharedSectionHeading
        :title="config.title"
        :description="config.description"
      />

      <!-- Client Logos Grid -->
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
            <img src="https://martex-nuxtjs.vercel.app/assets/images/png_icons/tool-9.png" alt="Tailwind CSS" class="w-20 h20" />
          </div>
        </UPageCard>
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

const config = ref({
  title: 'Trusted by industry leaders',
  description: 'Join thousands of companies that build amazing experiences with our platform'
})

const clients = ref([
  {
    name: 'Microsoft',
    icon: 'i-simple-icons-microsoft',
    colorClass: 'text-[#00A1F1]',
    product: 'kontyRetail',
    to: '#'
  },
  {
    name: 'Google',
    icon: 'i-simple-icons-google',
    colorClass: 'text-[#4285F4]',
    product: 'kontyRetail',
    to: '#'
  },
  {
    name: 'Apple',
    icon: 'i-simple-icons-apple',
    colorClass: 'text-default',
    product: 'kontyHospitality',
    to: '#'
  },
  {
    name: 'Amazon',
    icon: 'i-simple-icons-amazon',
    colorClass: 'text-[#FF9900]',
    product: 'kontyHospitality',
    to: '#'
  },
  {
    name: 'Meta',
    icon: 'i-simple-icons-meta',
    colorClass: 'text-[#1877F2]',
    product: 'kontyHospitality',
    to: '#'
  },
  {
    name: 'Netflix',
    icon: 'i-simple-icons-netflix',
    colorClass: 'text-[#E50914]',
    product: 'kontyHospitality',
    to: '#'
  }
])
</script>

<style scoped>
/* Additional custom styles if needed */
.grid {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
