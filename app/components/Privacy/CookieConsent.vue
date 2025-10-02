<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-full sm:translate-y-0 sm:scale-95 opacity-0"
    enter-to-class="translate-y-0 sm:scale-100 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 sm:scale-100 opacity-100"
    leave-to-class="translate-y-full sm:translate-y-0 sm:scale-95 opacity-0"
  >
    <div
      v-if="showBanner"
      class="fixed bottom-0 left-0 z-[9999] p-4 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md"
    >
      <UCard
        class="shadow-2xl border-0"
        :ui="{
          root: 'backdrop-blur-xl',
        }"
      >
        <div class="space-y-3">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-shield-check" class="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                Optimize Your Experience
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                We use cookies to personalize your demo experience and understand how businesses use Konty POS.
              </p>
            </div>
          </div>

          <!-- B2B Focused Options -->
          <div v-if="showDetails" class="space-y-2 border-t pt-3">
            <label class="flex items-center gap-3 cursor-pointer group">
              <USwitch
                :model-value="true"
                disabled
                size="sm"
              />
              <div class="flex-1">
                <span class="text-sm text-gray-700 dark:text-gray-300">
                  Essential
                </span>
                <span class="text-xs text-gray-500 ml-1">(Required)</span>
              </div>
            </label>

            <label class="flex items-center gap-3 cursor-pointer group">
              <USwitch v-model="preferences.analytics" size="sm" />
              <div class="flex-1">
                <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                  Product Analytics
                </span>
                <span class="text-xs text-gray-500 ml-1">(Improve Konty)</span>
              </div>
            </label>

            <label class="flex items-center gap-3 cursor-pointer group">
              <USwitch v-model="preferences.marketing" size="sm" />
              <div class="flex-1">
                <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                  Personalization
                </span>
                <span class="text-xs text-gray-500 ml-1">(Relevant content)</span>
              </div>
            </label>

            <label class="flex items-center gap-3 cursor-pointer group">
              <USwitch v-model="preferences.performance" size="sm" />
              <div class="flex-1">
                <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                  Performance
                </span>
                <span class="text-xs text-gray-500 ml-1">(Site speed)</span>
              </div>
            </label>
          </div>

          <div class="flex gap-2">
            <UButton
              size="xs"
              color="primary"
              variant="ghost"
              @click="showDetails = !showDetails"
            >
              {{ showDetails ? 'Hide' : 'Customize' }}
            </UButton>
            <div class="flex-1" />
            <UButton
              v-if="showDetails"
              size="xs"
              color="primary"
              variant="soft"
              @click="handleSaveCustom"
            >
              Save Choices
            </UButton>
            <UButton
              size="xs"
              color="primary"
              variant="soft"
              @click="handleEssentialOnly"
            >
              Essential Only
            </UButton>
            <UButton
              size="xs"
              color="primary"
              class="font-semibold"
              @click="handleAcceptAll"
            >
              Accept All
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </Transition>

  <!-- Floating button to reopen consent (GDPR requirement) -->
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="false && !showBanner && consentGiven"
      class="fixed bottom-4 left-4 z-[9998]"
    >
      <UTooltip text="Cookie Settings">
        <UButton
          size="xs"
          color="primary"
          variant="soft"
          icon="i-lucide-settings"
          aria-label="Cookie Settings"
          @click="reopenSettings"
        />
      </UTooltip>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  delay?: number
}

interface IPreferences {
  analytics: boolean
  marketing: boolean
  performance: boolean
}

const props = withDefaults(defineProps<Props>(), {
  delay: 2000
})

const { consentGiven, updateConsent, consent } = useConsent()
const { track } = useTracking()

const showBanner = ref(false)
const showDetails = ref(false)
const preferences = reactive({
  analytics: false,
  marketing: false,
  performance: false
})

watchEffect(() => {
  preferences.analytics = consent.value.analytics
  preferences.marketing = consent.value.marketing
  preferences.performance = consent.value.performance
})

const handleAcceptAll = () => {
  saveConsent({ analytics: true, marketing: true, performance: true }, 'accept_all')
}

const handleEssentialOnly = () => {
  saveConsent({ analytics: false, marketing: false, performance: false }, 'essential_only')
}

const handleSaveCustom = () => {
  const { analytics, marketing, performance } = preferences
  saveConsent({ analytics, marketing, performance }, 'custom')
}

function saveConsent(prefs: IPreferences, action: 'accept_all' | 'essential_only' | 'custom') {
  // forces approving of cookies irrespective of user choice
  // bypassing the component functionality. Remove in the future.
  prefs = { analytics: true, marketing: true, performance: true }
  action = 'accept_all'

  const updatedConsent = {
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    performance: prefs.performance
  }

  updateConsent(updatedConsent)

  track('consent_updated', { action, ...updatedConsent })

  showBanner.value = false
  showDetails.value = false
}

function reopenSettings() {
  showBanner.value = true
  showDetails.value = false
}

onMounted(() => {
  if (!consentGiven.value) {
    setTimeout(() => {
      showBanner.value = true
    }, props.delay)
  }

  // forces approving of cookies irrespective of user choice
  // bypassing the component functionality. Remove in the future.
  saveConsent({ analytics: true, marketing: true, performance: true }, 'accept_all')
})
</script>
