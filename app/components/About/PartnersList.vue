<template>
  <section class="py-12 sm:py-16">
    <UContainer>
      <UIAppear direction="up">
        <!-- Filter -->
        <div class="max-w-md mx-auto mb-12">
          <UInput
            v-model="cityFilter"
            size="lg"
            :placeholder="t('pages.partners.filterPlaceholder')"
            icon="i-lucide-search"
          />
        </div>

        <!-- Partners grid -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div
            v-for="partner in filteredPartners"
            :key="partner.id"
            class="p-6 bg-elevated rounded-lg border border-gray-200 dark:border-gray-700 text-center"
          >
            <div class="h-20 w-20 bg-primary-100 dark:bg-primary-900 rounded-full mx-auto mb-4" />
            <h3 class="font-semibold">{{ partner.name }}</h3>
            <p class="text-sm text-muted">{{ partner.city }}</p>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredPartners.length === 0" class="text-center py-12">
          <Icon name="i-lucide-search-x" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-muted">{{ t('pages.partners.noResults') }}</p>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const cityFilter = ref('')

// Placeholder data
const partners = ref([
  { id: 1, name: 'Partner 1', city: 'Podgorica' },
  { id: 2, name: 'Partner 2', city: 'Belgrade' },
  { id: 3, name: 'Partner 3', city: 'Sarajevo' },
  { id: 4, name: 'Partner 4', city: 'Zagreb' },
  { id: 5, name: 'Partner 5', city: 'Podgorica' },
  { id: 6, name: 'Partner 6', city: 'Novi Sad' },
  { id: 7, name: 'Partner 7', city: 'Split' },
  { id: 8, name: 'Partner 8', city: 'Ljubljana' },
])

const filteredPartners = computed(() => {
  if (!cityFilter.value) return partners.value

  return partners.value.filter(partner =>
    partner.city.toLowerCase().includes(cityFilter.value.toLowerCase())
  )
})
</script>
