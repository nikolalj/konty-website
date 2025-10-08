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
      <div class="max-w-5xl mx-auto">
        <!-- Main Categories -->
        <div class="grid md:grid-cols-2 gap-8">
          <button
            v-for="category in mainCategories"
            :key="category.key"
            :class="[
              'p-8 rounded-xl border-2 transition-all text-left hover:shadow-lg',
              selectedCategory === category.key
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-primary-300'
            ]"
            @click="toggleCategory(category.key)"
          >
            <div class="flex flex-col">
              <!-- Icon and Title -->
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center mr-4">
                  <UIcon :name="category.icon" class="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                  {{ t(category.title) }}
                </h3>
              </div>

              <!-- Description -->
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {{ t(category.description) }}
              </p>

              <!-- Top 3-4 Features -->
              <Transition name="slide-fade">
                <div v-if="selectedCategory === category.key" class="space-y-2 mt-2">
                  <div v-for="feature in getTopFeatures(category.key)" :key="feature" class="flex items-start">
                    <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span class="text-sm text-gray-700 dark:text-gray-300">{{ t(feature) }}</span>
                  </div>
                </div>
              </Transition>
            </div>
          </button>
        </div>

        <!-- Schedule CTA -->
        <Transition name="fade">
          <div v-if="selectedCategory" class="mt-8 text-center">
            <UButton
              size="xl"
              color="primary"
              @click="scheduleDemo"
            >
              <UIcon name="i-lucide-calendar" class="mr-2" />
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
    icon: 'i-lucide-utensils',
    title: 'ui.navigation.main.hospitality',
    description: 'ui.navigation.main.hospitalityDesc'
  },
  {
    key: 'retail',
    icon: 'i-lucide-shopping-cart',
    title: 'ui.navigation.main.retail',
    description: 'ui.navigation.main.retailDesc'
  }
]

const topFeatures = {
  hospitality: [
    'pages.demo.categorySelector.features.tableManagement',
    'pages.demo.categorySelector.features.kitchenDisplay',
    'pages.demo.categorySelector.features.splitBills',
    'pages.demo.categorySelector.features.onlineOrdering'
  ],
  retail: [
    'pages.demo.categorySelector.features.barcodeScanning',
    'pages.demo.categorySelector.features.inventoryManagement',
    'pages.demo.categorySelector.features.loyaltyProgram',
    'pages.demo.categorySelector.features.promotions'
  ]
}

const getTopFeatures = (category: string) => {
  return topFeatures[category as keyof typeof topFeatures] || []
}

const toggleCategory = (key: string) => {
  selectedCategory.value = selectedCategory.value === key ? null : key
}

const scheduleDemo = () => {
  // Scroll to demo form in hero
  const element = document.querySelector('#demo-form')
  element?.scrollIntoView({ behavior: 'smooth' })
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>