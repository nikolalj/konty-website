<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- Status Code -->
      <div class="mb-8">
        <h1 class="text-7xl font-bold text-gray-900 dark:text-gray-100">
          {{ error?.statusCode || 404 }}
        </h1>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">
          {{ errorMessage }}
        </p>
      </div>

      <!-- Quick actions -->
      <div class="space-y-3">
        <UButton
          :to="localePath('/')"
          size="lg"
          variant="solid"
          block
        >
          {{ t('error.goHome') }}
        </UButton>

        <UButton
          :to="localePath('/pricing')"
          size="lg"
          variant="outline"
          block
        >
          {{ t('error.viewPricing') }}
        </UButton>

        <UButton
          :to="localePath('/demo')"
          size="lg"
          variant="ghost"
          block
        >
          {{ t('error.bookDemo') }}
        </UButton>
      </div>

      <!-- Help text -->
      <p class="mt-8 text-sm text-gray-500 dark:text-gray-400">
        {{ t('error.helpText') }}
        <a href="mailto:support@konty.com" class="text-primary-500 hover:underline">
          support@konty.com
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const error = useError()
const { t } = useI18n()
const localePath = useLocalePath()

// Determine error message
const errorMessage = computed(() => {
  if (error.value?.statusCode === 404) {
    return t('error.404')
  }
  if (error.value?.statusCode === 500) {
    return t('error.500')
  }
  if (error.value?.statusCode === 403) {
    return t('error.403')
  }
  return t('error.generic')
})

// SEO Meta for error pages - using useHead directly for reliability
// Error pages should always be noindex to avoid search engines indexing them
useHead({
  title: () => `${error.value?.statusCode || 'Error'} - Konty`,
  meta: () => [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: errorMessage.value }
  ]
})

// Track error in analytics
onMounted(() => {
  const { track } = useTracking()
  track('exception', {
    description: `${error.value?.statusCode || 404} error`,
    fatal: false,
    error_code: error.value?.statusCode || 404
  })
})
</script>
