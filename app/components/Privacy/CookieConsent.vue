<template>
  <Transition 
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="transform translate-y-full opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-full opacity-0"
  >
    <div 
      v-if="showBanner" 
      class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
    >
      <UContainer class="py-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- Content -->
          <div class="flex-1 text-sm text-gray-700">
            <p class="mb-2 md:mb-0">
              <strong>Poštovanje privatnosti</strong> - Koristimo kolačiće za poboljšanje korisničkog iskustva, 
              analitiku i marketinške svrhe. 
              <NuxtLink to="/privacy" class="text-primary hover:underline">
                Saznajte više o našoj politici privatnosti
              </NuxtLink>.
            </p>
          </div>
          
          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-2 shrink-0">
            <UButton 
              variant="outline" 
              size="sm"
              @click="showPreferences = true"
            >
              Podesi kolačiće
            </UButton>
            
            <UButton 
              color="neutral" 
              variant="solid" 
              size="sm"
              @click="acceptEssentialOnly"
            >
              Samo neophodni
            </UButton>
            
            <UButton 
              color="primary" 
              variant="solid" 
              size="sm"
              @click="acceptAll"
            >
              Prihvati sve
            </UButton>
          </div>
        </div>
      </UContainer>
    </div>
  </Transition>

  <!-- Cookie Preferences Modal -->
  <UModal v-model="showPreferences">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">
            Podešavanja kolačića
          </h3>
          <UButton 
            color="neutral" 
            variant="ghost" 
            icon="lucide:x" 
            @click="showPreferences = false"
          />
        </div>
      </template>

      <div class="space-y-6">
        <!-- Essential Cookies -->
        <div class="border-b border-gray-200 pb-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-medium text-gray-900">Neophodni kolačići</h4>
            <USwitch 
              v-model="cookieSettings.essential" 
              disabled
              color="primary"
            />
          </div>
          <p class="text-sm text-gray-600">
            Neophodni za osnovno funkcionisanje web stranice. Ne mogu se onemogućiti.
          </p>
        </div>

        <!-- Analytics Cookies -->
        <div class="border-b border-gray-200 pb-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-medium text-gray-900">Analitički kolačići</h4>
            <USwitch 
              v-model="cookieSettings.analytics" 
              color="primary"
            />
          </div>
          <p class="text-sm text-gray-600">
            Pomaže nam da razumemo kako posetioci koriste našu web stranicu kroz anonimnu analitiku.
          </p>
        </div>

        <!-- Marketing Cookies -->
        <div class="pb-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-medium text-gray-900">Marketinški kolačići</h4>
            <USwitch 
              v-model="cookieSettings.marketing" 
              color="primary"
            />
          </div>
          <p class="text-sm text-gray-600">
            Koriste se za prikazivanje personalizovanih reklama i praćenje efikasnosti marketinških kampanja.
          </p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton 
            color="neutral" 
            variant="outline"
            @click="showPreferences = false"
          >
            Otkaži
          </UButton>
          <UButton 
            color="primary" 
            @click="savePreferences"
          >
            Sačuvaj podešavanja
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
interface CookieSettings {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

const showBanner = ref(false)
const showPreferences = ref(false)

const cookieSettings = ref<CookieSettings>({
  essential: true, // Always required
  analytics: false,
  marketing: false
})

// Check if user has already made a choice
const cookieConsent = useCookie<CookieSettings>('cookie-consent', {
  default: () => ({
    essential: true,
    analytics: false,
    marketing: false
  }),
  maxAge: 60 * 60 * 24 * 365 // 1 year
})

const hasConsented = useCookie<boolean>('has-consented', {
  default: () => false,
  maxAge: 60 * 60 * 24 * 365 // 1 year
})

// Initialize cookie settings from stored values
onMounted(() => {
  if (hasConsented.value) {
    cookieSettings.value = { ...cookieConsent.value }
    // Apply cookie settings
    applyCookieSettings()
  } else {
    // Show banner after a small delay for better UX
    setTimeout(() => {
      showBanner.value = true
    }, 1000)
  }
})

// Apply cookie settings to third-party services
const applyCookieSettings = () => {
  const config = useRuntimeConfig()
  
  // Analytics cookies
  if (cookieSettings.value.analytics) {
    // Enable Google Analytics if configured
    if (typeof window !== 'undefined' && window.gtag && config.public.googleAnalyticsId) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      })
    }
  } else {
    // Disable analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      })
    }
  }
  
  // Marketing cookies
  if (cookieSettings.value.marketing) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      })
    }
  } else {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      })
    }
  }
}

// Accept all cookies
const acceptAll = () => {
  cookieSettings.value = {
    essential: true,
    analytics: true,
    marketing: true
  }
  saveConsent()
}

// Accept essential cookies only
const acceptEssentialOnly = () => {
  cookieSettings.value = {
    essential: true,
    analytics: false,
    marketing: false
  }
  saveConsent()
}

// Save custom preferences
const savePreferences = () => {
  saveConsent()
  showPreferences.value = false
}

// Save consent to cookies and apply settings
const saveConsent = () => {
  hasConsented.value = true
  cookieConsent.value = { ...cookieSettings.value }
  showBanner.value = false
  applyCookieSettings()
  
  // Track consent choice (only if analytics are enabled)
  if (cookieSettings.value.analytics) {
    const { $track } = useNuxtApp()
    if ($track) {
      $track.conversion('Cookie Consent', {
        analytics: cookieSettings.value.analytics,
        marketing: cookieSettings.value.marketing
      })
    }
  }
}

// Expose methods for external use
defineExpose({
  showPreferences: () => {
    showPreferences.value = true
  },
  resetConsent: () => {
    hasConsented.value = false
    showBanner.value = true
    cookieSettings.value = {
      essential: true,
      analytics: false,
      marketing: false
    }
  }
})
</script>