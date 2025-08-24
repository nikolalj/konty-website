<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-y-full sm:translate-y-0 sm:translate-x-full opacity-0"
    enter-to-class="translate-y-0 translate-x-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-y-0 translate-x-0 opacity-100"
    leave-to-class="translate-y-full sm:translate-y-0 sm:translate-x-full opacity-0"
  >
    <div
      v-if="shouldShow"
      class="fixed bottom-4 sm:bottom-auto sm:top-20 right-0 sm:right-4 left-0 sm:left-auto z-50 mx-4 sm:mx-0 sm:w-96"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Header with gradient -->
        <div class="bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-white">
              <UIcon name="i-lucide:globe-2" class="size-4" />
              <span class="text-sm font-medium">{{ $t('common.languageSuggestion', 'Language Suggestion') }}</span>
            </div>
            <UButton
              size="xs"
              color="neutral"
              variant="ghost"
              square
              :aria-label="$t('common.dismiss', 'Dismiss')"
              @click="handleDismiss"
            >
              <UIcon name="i-lucide:x" class="size-3.5" />
            </UButton>
          </div>
        </div>

        <!-- Content -->
        <div class="p-4">
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {{ message }}
          </p>

          <!-- Action buttons -->
          <div class="flex gap-2">
            <UButton
              size="sm"
              color="primary"
              variant="solid"
              class="flex-1"
              :disabled="isSwitching"
              @click="handleAccept"
            >
              <UIcon v-if="suggestedLocaleConfig?.flag" :name="suggestedLocaleConfig.flag" class="size-4 mr-1.5" />
              {{ acceptLabel }}
            </UButton>

            <UButton
              size="sm"
              color="neutral"
              variant="outline"
              class="flex-1"
              @click="handleDismiss"
            >
              {{ $t('common.stayHere', 'Stay here') }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { t } = useI18n()
const {
  shouldShowSuggestion,
  suggestedLocale,
  suggestedLocaleConfig,
  acceptSuggestion,
  dismissSuggestion,
  isSwitching
} = useCountryDetection()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

// Internal state for visibility animation
const isVisible = ref(false)
const hasBeenDismissedThisSession = ref(false)

// Check if we should show the banner
const shouldShow = computed(() => {
  // Don't show if dismissed this session
  if (hasBeenDismissedThisSession.value) return false

  // Don't show on error pages or auth pages
  if (route.path.includes('error') || route.path.includes('auth')) return false

  // Use the composable's logic and visibility state
  return shouldShowSuggestion.value && isVisible.value
})

// Single consistent message for all pages
const message = computed(() => {
  return t('banner.message')
})

// Accept button label
const acceptLabel = computed(() => {
  const suggested = suggestedLocaleConfig.value
  if (!suggested) return t('common.switch', 'Switch')

  return t('banner.switchTo', { country: suggested.name })
})

// Handle accepting the suggestion
const handleAccept = async () => {
  const targetLocale = suggestedLocale.value
  if (!targetLocale) return

  try {
    // Use the composable's accept method
    await acceptSuggestion()

    // Navigate to the localized version of current page
    const newPath = switchLocalePath(targetLocale)
    if (newPath && newPath !== route.fullPath) {
      await navigateTo(newPath)
    }

    // Hide banner
    isVisible.value = false
  } catch (error) {
    console.error('[LocaleBanner] Failed to switch locale:', error)
  }
}

// Handle dismissing the banner
const handleDismiss = () => {
  // Use composable's dismiss (marks current locale as explicit choice)
  dismissSuggestion()

  // Hide for this session
  hasBeenDismissedThisSession.value = true
  isVisible.value = false
}

// Show banner after a delay to avoid layout shift and let page load
onMounted(() => {
  // Only show after hydration and initial page load
  setTimeout(() => {
    isVisible.value = true
  }, 2000) // 2 second delay for smooth experience
})

// Hide when navigating (will recheck on new page)
watch(() => route.path, () => {
  isVisible.value = false
  // Reset after navigation completes
  setTimeout(() => {
    if (!hasBeenDismissedThisSession.value) {
      isVisible.value = true
    }
  }, 1500)
})
</script>

<style scoped>
/* Ensure banner appears above other content but below modals */
@media (max-width: 639px) {
  /* Mobile: slide up from bottom */
  .fixed {
    max-width: calc(100vw - 2rem);
  }
}
</style>
