<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-y-[-100%] opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-[-100%] opacity-0"
  >
    <div
      v-if="shouldShow"
      class="fixed top-0 left-0 right-0 z-100 bg-primary/95 backdrop-blur-sm text-white shadow-lg"
    >
      <UContainer>
        <div class="flex items-center justify-between py-3 gap-4">
          <!-- Message -->
          <div class="flex items-center gap-3 flex-1">
            <UIcon name="i-lucide:globe" class="size-5 flex-shrink-0" />
            <p class="text-sm sm:text-base">
              {{ message }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <!-- Accept suggestion -->
            <UButton
              size="sm"
              color="neutral"
              variant="solid"
              :label="acceptLabel"
              :disabled="isSwitching"
              @click="handleAccept"
            />

            <!-- Dismiss -->
            <UButton
              size="sm"
              color="neutral"
              variant="ghost"
              square
              aria-label="Dismiss"
              @click="handleDismiss"
            >
              <UIcon name="i-lucide:x" class="size-4" />
            </UButton>
          </div>
        </div>
      </UContainer>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { LocaleConfig } from '~/types/locale'

const { locales } = useI18n()
const {
  preference,
  shouldShowSuggestion,
  changeLocale,
  dismissSuggestion,
  isSwitching
} = useCountryDetection()
const switchLocalePath = useSwitchLocalePath()

// Internal state for visibility
const isVisible = ref(false)
const hasBeenDismissed = ref(false)

// Check if we should show the banner
const shouldShow = computed(() => {
  // Don't show if already dismissed in this session
  if (hasBeenDismissed.value) return false

  // Use the composable's logic
  return shouldShowSuggestion.value && isVisible.value
})

// Get suggested locale info
const suggestedLocale = computed((): LocaleConfig | undefined => {
  const pref = preference.value
  if (!pref?.detected_locale) return undefined

  return (locales.value as LocaleConfig[]).find(
    l => l.code === pref.detected_locale
  )
})

// Build message based on detected locale
const message = computed(() => {
  const suggested = suggestedLocale.value
  if (!suggested) return ''

  // Use simple, clear messaging
  const countryName = suggested.name

  // Check if we're showing prices (on pricing page)
  const route = useRoute()
  const isPricingRelated = route.path.includes('pricing') ||
                          route.path.includes('konty-')

  if (isPricingRelated) {
    return `Looks like you're in ${countryName}. See prices in local currency?`
  }

  return `It looks like you're in ${countryName}. Would you like to switch?`
})

// Accept button label
const acceptLabel = computed(() => {
  const suggested = suggestedLocale.value
  if (!suggested) return 'Switch'

  // Use flag emoji if available
  return `Switch to ${suggested.name}`
})

// Handle accepting the suggestion
const handleAccept = async () => {
  const pref = preference.value
  if (!pref?.detected_locale) return

  try {
    // Switch to detected locale - mark as explicit choice
    await changeLocale(pref.detected_locale, true)

    // Navigate to localized path
    const newPath = switchLocalePath(pref.detected_locale)
    if (newPath) {
      await navigateTo(newPath)
    }

    // Hide banner
    isVisible.value = false
  } catch (error) {
    console.error('Failed to switch to suggested locale:', error)
  }
}

// Handle dismissing the banner
const handleDismiss = () => {
  // Mark as dismissed in preference
  dismissSuggestion()

  // Hide for this session
  hasBeenDismissed.value = true
  isVisible.value = false
}

// Show banner after a short delay to avoid layout shift
onMounted(() => {
  // Only show after hydration and a small delay
  setTimeout(() => {
    isVisible.value = true
  }, 1500)
})
</script>
