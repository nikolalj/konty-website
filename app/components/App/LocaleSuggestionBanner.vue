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
const { t, locale } = useI18n()
const {
  shouldShowSuggestion,
  suggestedLocale,
  suggestedLocaleConfig,
  acceptSuggestion,
  dismissSuggestion,
  isSwitching,
  currentLocale
} = useCountryDetection()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

// Check if this is a redirect notification
const wasRedirected = computed(() => {
  const cookie = useCookie('konty-locale')
  if (!cookie.value) return false
  try {
    const parsed = JSON.parse(cookie.value as string)
    return parsed.wasRedirected === true
  } catch {
    return false
  }
})

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

// Context-aware message
const message = computed(() => {
  if (wasRedirected.value) {
    // After redirect: "We've directed you to the [Country] version based on your location"
    return t('banner.redirected', { 
      country: currentLocale.value?.name || locale.value.toUpperCase() 
    })
  }
  // Suggestion: "It looks like you're in [Country]. Would you like to switch?"
  return t('banner.suggestion', { 
    country: suggestedLocaleConfig.value?.name || 'this region' 
  })
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

// Simple timer for delayed visibility
let timer: NodeJS.Timeout | undefined

onMounted(() => {
  timer = setTimeout(() => {
    isVisible.value = true
    
    // Clear the wasRedirected flag after showing banner
    if (wasRedirected.value) {
      const cookie = useCookie('konty-locale')
      if (cookie.value) {
        try {
          const parsed = JSON.parse(cookie.value as string)
          delete parsed.wasRedirected
          cookie.value = JSON.stringify(parsed)
        } catch {
          // Silently ignore cookie parsing errors
        }
      }
    }
  }, 2000)
})

// Reset on navigation
watch(() => route.path, () => {
  clearTimeout(timer)
  isVisible.value = false
  
  if (!hasBeenDismissedThisSession.value) {
    timer = setTimeout(() => {
      isVisible.value = true
    }, 1500)
  }
})

// Cleanup
onUnmounted(() => clearTimeout(timer))
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
