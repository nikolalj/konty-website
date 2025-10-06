<template>
  <section class="py-16 bg-gray-50 dark:bg-gray-800">
    <UContainer>
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('pages.demo.categorySelector.title') }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {{ t('pages.demo.categorySelector.subtitle') }}
        </p>
      </div>

      <!-- Industry Selector -->
      <div class="max-w-4xl mx-auto">
        <!-- Main Categories -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <button
            v-for="category in mainCategories"
            :key="category.key"
            :class="[
              'p-6 rounded-xl border-2 transition-all text-left',
              selectedCategory === category.key
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-primary-300'
            ]"
            @click="selectedCategory = category.key"
          >
            <div class="flex items-start">
              <UIcon :name="category.icon" class="w-8 h-8 text-primary-500 mr-4 flex-shrink-0" />
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {{ t(category.title) }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {{ t(category.description) }}
                </p>
                <!-- Example business types -->
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="example in category.examples"
                    :key="example"
                    class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                  >
                    {{ t(example) }}
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>

        <!-- Personalized Demo Features -->
        <Transition name="slide-fade">
          <div v-if="selectedCategory" class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {{ t('pages.demo.categorySelector.personalizedFor', {
                business: t(selectedCategory === 'hospitality' ? 'ui.navigation.main.hospitality' : 'ui.navigation.main.retail')
              }) }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              {{ t('pages.demo.categorySelector.demoFeatures') }}
            </p>
            <div class="grid md:grid-cols-2 gap-4 mb-8">
              <div v-for="feature in getDemoFeatures(selectedCategory)" :key="feature" class="flex items-center">
                <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span class="text-gray-700 dark:text-gray-300">{{ t(feature) }}</span>
              </div>
            </div>
            <UButton
              size="xl"
              color="primary"
              @click="scheduleDemo"
            >
              {{ t('pages.demo.categorySelector.scheduleButton') }}
            </UButton>
          </div>
        </Transition>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const selectedCategory = ref<string | null>(null)

const mainCategories = [
  {
    key: 'hospitality',
    icon: 'i-lucide-store',
    title: 'ui.navigation.main.hospitality',
    description: 'ui.navigation.main.hospitalityDesc',
    examples: [
      'pages.demo.categorySelector.examples.restaurants',
      'pages.demo.categorySelector.examples.barsCafes',
      'pages.demo.categorySelector.examples.fastFood'
    ]
  },
  {
    key: 'retail',
    icon: 'i-lucide-shopping-cart',
    title: 'ui.navigation.main.retail',
    description: 'ui.navigation.main.retailDesc',
    examples: [
      'pages.demo.categorySelector.examples.grocery',
      'pages.demo.categorySelector.examples.clothing',
      'pages.demo.categorySelector.examples.convenience'
    ]
  }
]

const demoFeatures = {
  hospitality: [
    'pages.demo.categorySelector.features.tableManagement',
    'pages.demo.categorySelector.features.kitchenDisplay',
    'pages.demo.categorySelector.features.reservations',
    'pages.demo.categorySelector.features.splitBills',
    'pages.demo.categorySelector.features.onlineOrdering',
    'pages.demo.categorySelector.features.inventoryTracking'
  ],
  retail: [
    'pages.demo.categorySelector.features.barcodeScanning',
    'pages.demo.categorySelector.features.inventoryManagement',
    'pages.demo.categorySelector.features.loyaltyProgram',
    'pages.demo.categorySelector.features.promotions',
    'pages.demo.categorySelector.features.multiLocation',
    'pages.demo.categorySelector.features.analytics'
  ]
}

const getDemoFeatures = (category: string) => {
  return demoFeatures[category as keyof typeof demoFeatures] || []
}

const scheduleDemo = () => {
  // Scroll to contact form with selected category pre-filled
  const element = document.querySelector('#contact-form')
  element?.scrollIntoView({ behavior: 'smooth' })
  // You could also pass the selected category to the form
  // eventBus.emit('demo-category-selected', { category: selectedCategory.value })
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>