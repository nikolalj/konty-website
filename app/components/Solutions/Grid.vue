<template>
  <section id="solutions-grid" class="py-16 sm:py-24">
    <UContainer>
      <!-- Hospitality Section -->
      <div class="mb-16">
        <UIAppear>
          <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ t('pages.solutions.categories.hospitality.title') }}
            </h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {{ t('pages.solutions.categories.hospitality.description') }}
            </p>
          </div>
        </UIAppear>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <SolutionsCard
            v-for="solution in hospitalitySolutions"
            :key="solution.id"
            :solution="solution"
          />
        </div>
      </div>

      <!-- Retail Section -->
      <div>
        <UIAppear>
          <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ t('pages.solutions.categories.retail.title') }}
            </h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {{ t('pages.solutions.categories.retail.description') }}
            </p>
          </div>
        </UIAppear>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <SolutionsCard
            v-for="solution in retailSolutions"
            :key="solution.id"
            :solution="solution"
          />
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const solutionsList = [
  {
    "id": "restaurants",
    "category": "hospitality",
    "icon": "🍽️",
    "href": "/solutions/restaurants"
  },
  {
    "id": "barsCafes",
    "category": "hospitality",
    "icon": "☕",
    "href": "/solutions/bars-cafes"
  },
  {
    "id": "fastFood",
    "category": "hospitality",
    "icon": "🍔",
    "href": "/solutions/fast-food"
  },
  {
    "id": "grocerySupermarkets",
    "category": "retail",
    "icon": "🛒",
    "href": "/solutions/grocery-supermarkets"
  },
  {
    "id": "clothingBoutiques",
    "category": "retail",
    "icon": "👔",
    "href": "/solutions/clothing-boutiques"
  },
  {
    "id": "convenienceStores",
    "category": "retail",
    "icon": "🏪",
    "href": "/solutions/convenience-stores"
  },
  {
    "id": "b2b",
    "category": "retail",
    "icon": "📊",
    "href": "/solutions/b2b"
  }
]

const hospitalitySolutions = solutionsList.filter(s => s.category === 'hospitality').map(s => ({
  ...s,
  title: t(`ui.navigation.categories.${s.id}`),
  description: t(`pages.solutions.${s.id}.overview.description`),
  href: localePath(s.href)
}))

const retailSolutions = solutionsList.filter(s => s.category === 'retail').map(s => ({
  ...s,
  title: t(`ui.navigation.categories.${s.id}`),
  description: t(`pages.solutions.${s.id}.overview.description`),
  href: localePath(s.href)
}))
</script>
