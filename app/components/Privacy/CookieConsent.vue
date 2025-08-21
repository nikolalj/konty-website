<!-- components/KontyCookieConsent.vue -->
<template>
  <!-- Loading state while initializing -->
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isInitializing && showLoadingState"
      class="fixed bottom-4 right-4 z-[9999]"
    >
      <div class="backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
        <UIcon name="i-lucide-refresh-ccv" class="h-4 w-4 text-primary-500 animate-spin" />
        <span class="text-xs text-gray-600 dark:text-gray-400">Initializing preferences...</span>
      </div>
    </div>
  </Transition>

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
      class="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:bottom-4 sm:right-4 sm:left-auto sm:max-w-md"
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
              @click="saveCustomPreferences"
            >
              Save Choices
            </UButton>
            <UButton
              size="xs"
              color="primary"
              variant="soft"
              @click="acceptEssential"
            >
              Essential Only
            </UButton>
            <UButton
              size="xs"
              color="primary"
              class="font-semibold"
              @click="acceptAll"
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
      v-if="!showBanner && mounted && enableFloatingButton"
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
import { ref, reactive, onMounted, watch, nextTick, readonly } from 'vue'

// Type definitions
interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  performance: boolean
}

interface ConsentData {
  timestamp: string
  preferences: CookiePreferences
  consentVersion: string
  consentId: string
}

// Props
interface Props {
  cookieName?: string
  cookieExpiry?: number
  delay?: number
  consentVersion?: string
  enableFloatingButton?: boolean
  geoLocation?: string
  showLoadingState?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  cookieName: 'konty-cookie-consent',
  cookieExpiry: 365,
  delay: 2000,
  consentVersion: '2.0.0',
  enableFloatingButton: true,
  geoLocation: 'auto',
  showLoadingState: false
})

// Runtime config
const config = useRuntimeConfig()

// State
const showBanner = ref(false)
const showDetails = ref(false)
const mounted = ref(false)
const isProcessing = ref(false)
const isInitializing = ref(true)
const userGeoLocation = ref<string>('unknown')

const preferences = reactive<CookiePreferences>({
  necessary: true,
  analytics: false,
  marketing: false,
  performance: false
})

// Generate unique consent ID
const generateConsentId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// Cookie utilities
const cookieUtils = {
  set(name: string, value: string, days: number) {
    if (!import.meta.client) return

    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)

    const cookieOptions = [
      `${name}=${encodeURIComponent(value)}`,
      `expires=${expires.toUTCString()}`,
      'path=/',
      'SameSite=Lax'
    ]

    if (window.location.protocol === 'https:') {
      cookieOptions.push('Secure')
    }

    document.cookie = cookieOptions.join('; ')
  },

  get(name: string): string | null {
    if (!import.meta.client) return null

    const nameEQ = `${name}=`
    const cookies = document.cookie.split(';')

    for (let cookie of cookies) {
      cookie = cookie.trim()
      if (cookie.indexOf(nameEQ) === 0) {
        const value = cookie.substring(nameEQ.length)
        try {
          return decodeURIComponent(value)
        } catch {
          return value
        }
      }
    }
    return null
  },

  delete(name: string) {
    if (!import.meta.client) return

    // Delete for current path
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`

    // Delete for current domain
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}; SameSite=Lax`

    // Delete for parent domain (handles subdomains)
    const hostname = window.location.hostname
    const parts = hostname.split('.')
    if (parts.length >= 2) {
      const parentDomain = `.${parts.slice(-2).join('.')}`
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${parentDomain}; SameSite=Lax`
    }

    // Delete without domain specification
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  }
}

// Service initialization manager
const serviceManager = {
  // Initialize Google services with Consent Mode v2
  initializeGoogle(prefs: CookiePreferences) {
    if (!import.meta.client) return

    // Ensure gtag is available
    if (!window.gtag) return

    window.dataLayer = window.dataLayer || []

    // Update consent state
    window.gtag('consent', 'update', {
      'ad_storage': prefs.marketing ? 'granted' : 'denied',
      'ad_user_data': prefs.marketing ? 'granted' : 'denied',
      'ad_personalization': prefs.marketing ? 'granted' : 'denied',
      'analytics_storage': prefs.analytics ? 'granted' : 'denied',
      'functionality_storage': 'granted',
      'personalization_storage': prefs.marketing ? 'granted' : 'denied',
      'security_storage': 'granted'
    })

    // Initialize Google Analytics if consented
    const gaId = config.public.googleAnalyticsId as string
    if (prefs.analytics && gaId) {
      window.gtag('config', gaId, {
        'send_page_view': true,
        'cookie_flags': 'SameSite=Lax;Secure'
      })
    }

    // Initialize Google Ads if consented
    const adsId = config.public.googleAdsId as string
    if (prefs.marketing && adsId) {
      window.gtag('config', adsId)

      // Fire remarketing event
      window.gtag('event', 'page_view', {
        'send_to': adsId,
        'value': 0,
        'items': []
      })
    }
  },

  // Initialize Meta Pixel
  initializeMeta(prefs: CookiePreferences) {
    if (!import.meta.client) return

    const pixelId = config.public.metaPixelId as string
    if (!pixelId) return

    if (prefs.marketing) {
      // Initialize Facebook Pixel
      if (!window.fbq) {
        const script = document.createElement('script')
        script.async = true
        script.src = 'https://connect.facebook.net/en_US/fbevents.js'
        document.head.appendChild(script)

        const fbqFunc = function(...args: unknown[]) {
          if (window.fbq.callMethod) {
            window.fbq.callMethod(...args)
          } else {
            window.fbq.queue = window.fbq.queue || []
            window.fbq.queue.push(args)
          }
        }

        window.fbq = fbqFunc as typeof window.fbq
        window.fbq.queue = []
      }

      window.fbq('consent', 'grant')
      window.fbq('init', pixelId)
      window.fbq('track', 'PageView')
    } else {
      if (window.fbq) {
        window.fbq('consent', 'revoke')
      }
    }
  },

  // Initialize performance monitoring
  initializePerformance(prefs: CookiePreferences) {
    if (!import.meta.client) return

    if (prefs.performance) {
      console.log('[Konty] Performance monitoring enabled')
      // Add your performance monitoring initialization here
    }
  },

  // Initialize all services
  initializeAll(prefs: CookiePreferences) {
    this.initializeGoogle(prefs)
    this.initializeMeta(prefs)
    this.initializePerformance(prefs)

    // Dispatch custom event
    if (import.meta.client) {
      window.dispatchEvent(new CustomEvent('konty:cookie-consent', {
        detail: { preferences: prefs }
      }))
    }
  },

  // Clean up cookies when consent is revoked
  cleanup(prefs: CookiePreferences) {
    if (!import.meta.client) return

    // Remove non-essential cookies
    if (!prefs.analytics) {
      // Remove GA cookies
      ['_ga', '_gid', '_gat', '_ga_'].forEach(prefix => {
        document.cookie.split(';').forEach(cookie => {
          const parts = cookie.split('=')
          if (parts[0]) {
            const name = parts[0].trim()
            if (name.startsWith(prefix)) {
              cookieUtils.delete(name)
            }
          }
        })
      })
    }

    if (!prefs.marketing) {
      // Remove marketing cookies
      ['_fbp', '_fbc', 'fr'].forEach(name => {
        cookieUtils.delete(name)
      })
    }
  }
}

// Save consent with audit trail
const saveConsent = async (prefs: CookiePreferences, action: string) => {
  if (isProcessing.value) return
  isProcessing.value = true

  try {
    const consentData: ConsentData = {
      timestamp: new Date().toISOString(),
      preferences: prefs,
      consentVersion: props.consentVersion,
      consentId: generateConsentId()
    }

    // Save to cookie
    cookieUtils.set(props.cookieName, JSON.stringify(consentData), props.cookieExpiry)

    // Initialize services
    serviceManager.initializeAll(prefs)

    // Track consent event
    if (window.gtag) {
      window.gtag('event', 'cookie_consent', {
        'event_category': 'engagement',
        'event_label': action,
        'consent_id': consentData.consentId,
        'analytics': prefs.analytics,
        'marketing': prefs.marketing,
        'performance': prefs.performance
      })
    }

    // Log to server for audit trail (optional)
    const apiBase = config.public.apiBase as string
    if (apiBase) {
      try {
        await $fetch(`${apiBase}/api/consent`, {
          method: 'POST',
          body: {
            ...consentData,
            action,
            url: window.location.href,
            userAgent: navigator.userAgent,
            geoLocation: userGeoLocation.value
          }
        })
      } catch (error) {
        // Silent fail - don't block consent saving
        console.error('[Konty] Failed to log consent:', error)
      }
    }

    // Hide banner
    showBanner.value = false

  } finally {
    isProcessing.value = false
  }
}

// Load existing consent
const loadConsent = (): boolean => {
  const consent = cookieUtils.get(props.cookieName)

  if (!consent) return false

  try {
    const data: ConsentData = JSON.parse(consent)

    // Validate consent version
    if (data.consentVersion !== props.consentVersion) {
      cookieUtils.delete(props.cookieName)
      return false
    }

    // Validate consent age (re-ask after 1 year for GDPR)
    const consentAge = Date.now() - new Date(data.timestamp).getTime()
    const oneYear = 365 * 24 * 60 * 60 * 1000
    if (consentAge > oneYear) {
      cookieUtils.delete(props.cookieName)
      return false
    }

    if (data.preferences) {
      Object.assign(preferences, data.preferences)

      // Re-initialize services
      nextTick(() => {
        serviceManager.initializeAll(data.preferences)
      })

      return true
    }
  } catch (error) {
    console.error('[Konty] Invalid consent data:', error)
    cookieUtils.delete(props.cookieName)
  }

  return false
}

// Detect user's geo location for compliance
const detectGeoLocation = async () => {
  if (props.geoLocation !== 'auto') {
    userGeoLocation.value = props.geoLocation
    return
  }

  try {
    // Use CloudFlare's geo detection
    const response = await $fetch<string>('https://www.cloudflare.com/cdn-cgi/trace', {
      parseResponse: (txt: string) => txt
    })

    const match = response.match(/loc=([A-Z]{2})/)
    if (match && match[1]) {
      userGeoLocation.value = match[1].toLowerCase()
    }
  } catch {
    userGeoLocation.value = 'unknown'
  }
}

// Action handlers
const acceptAll = () => {
  Object.assign(preferences, {
    necessary: true,
    analytics: true,
    marketing: true,
    performance: true
  })
  saveConsent(preferences, 'accept_all')
}

const acceptEssential = () => {
  Object.assign(preferences, {
    necessary: true,
    analytics: false,
    marketing: false,
    performance: false
  })

  // Clean up existing non-essential cookies
  serviceManager.cleanup(preferences)

  saveConsent(preferences, 'essential_only')
}

const saveCustomPreferences = () => {
  // Ensure necessary is always true
  preferences.necessary = true

  // Clean up based on new preferences
  serviceManager.cleanup(preferences)

  saveConsent(preferences, 'custom')
}

const reopenSettings = () => {
  showBanner.value = true
  showDetails.value = false
}

// Withdraw all consent completely (for GDPR compliance)
const withdrawConsent = () => {
  const minimalConsent: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    performance: false
  }

  Object.assign(preferences, minimalConsent)

  // Clean up all non-essential cookies
  serviceManager.cleanup(minimalConsent)

  // Save the withdrawal
  saveConsent(minimalConsent, 'withdrawn')

  // Optionally delete the consent cookie entirely
  if (import.meta.client) {
    cookieUtils.delete(props.cookieName)

    // Reload to ensure all scripts are re-evaluated with new consent state
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }
}

// Initialize default consent mode before user interaction
const initializeDefaultConsent = () => {
  if (!import.meta.client) return

  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    window.gtag = function(...args: Parameters<typeof window.gtag>) {
      window.dataLayer.push(args)
    } as typeof window.gtag
  }

  // Set default consent state based on geo location
  // Default to 'denied' for EU/unknown, 'granted' for US
  const isUSRegion = userGeoLocation.value === 'us'
  const defaultConsent: 'granted' | 'denied' = isUSRegion ? 'granted' : 'denied'

  window.gtag('consent', 'default', {
    'ad_storage': defaultConsent,
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': defaultConsent,
    'functionality_storage': 'granted',
    'personalization_storage': 'denied',
    'security_storage': 'granted',
    'wait_for_update': 500
  })

  // Enable cookieless tracking
  window.gtag('set', {
    'url_passthrough': true,
    'ads_data_redaction': true
  })
}

// Lifecycle
onMounted(async () => {
  mounted.value = true

  // Detect geo location first
  await detectGeoLocation()

  // Initialize default consent
  initializeDefaultConsent()

  // Check for existing valid consent
  if (loadConsent()) {
    return // Consent already given
  }

  // Show banner after delay
  setTimeout(() => {
    showBanner.value = true
  }, props.delay)
})

// Watch for preference changes to update services in real-time
watch(preferences, (newPrefs) => {
  if (mounted.value && !showBanner.value) {
    // User is changing preferences after initial consent
    serviceManager.initializeAll(newPrefs)
  }
}, { deep: true })

// Expose methods for programmatic access (optional)
defineExpose({
  reopenSettings,
  withdrawConsent,
  preferences: readonly(preferences),
  acceptAll,
  acceptEssential,
  isInitializing: readonly(isInitializing)
})
</script>

<style scoped>
/* Ensure the component doesn't affect CLS scores */
.fixed {
  will-change: transform;
}
</style>
