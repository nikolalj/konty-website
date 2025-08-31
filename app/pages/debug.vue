<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
    <UContainer class="max-w-4xl">
      <h1 class="text-3xl font-bold mb-8">Debug Information</h1>
      
      <!-- Environment Variables -->
      <UCard class="mb-6">
        <template #header>
          <h2 class="text-xl font-semibold">Environment Variables</h2>
        </template>
        <div class="space-y-2 font-mono text-sm">
          <div v-for="(value, key) in config.public.debug" :key="key" class="flex">
            <span class="font-bold text-primary-500 min-w-[200px]">{{ key }}:</span>
            <span class="text-gray-700 dark:text-gray-300">{{ value || 'null' }}</span>
          </div>
        </div>
      </UCard>
      
      <!-- Cloudflare Headers -->
      <UCard class="mb-6">
        <template #header>
          <h2 class="text-xl font-semibold">Cloudflare Headers (from Server)</h2>
        </template>
        <div v-if="debugHeaders" class="space-y-2 font-mono text-sm">
          <div class="flex">
            <span class="font-bold text-primary-500 min-w-[200px]">Country:</span>
            <span class="text-gray-700 dark:text-gray-300">{{ debugHeaders.country || 'Not detected' }}</span>
          </div>
          <div class="flex">
            <span class="font-bold text-primary-500 min-w-[200px]">City:</span>
            <span class="text-gray-700 dark:text-gray-300">{{ debugHeaders.city || 'Not detected' }}</span>
          </div>
          <div class="flex">
            <span class="font-bold text-primary-500 min-w-[200px]">Host:</span>
            <span class="text-gray-700 dark:text-gray-300">{{ debugHeaders.host }}</span>
          </div>
          <div class="mt-4">
            <h3 class="font-bold mb-2">All CF Headers:</h3>
            <div v-for="(value, key) in debugHeaders.allCfHeaders" :key="key" class="flex">
              <span class="font-bold text-blue-500 min-w-[200px]">{{ key }}:</span>
              <span class="text-gray-700 dark:text-gray-300">{{ value }}</span>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-500">No debug headers available (client-side only)</p>
        </div>
      </UCard>
      
      <!-- Current Locale Info -->
      <UCard class="mb-6">
        <template #header>
          <h2 class="text-xl font-semibold">Locale Information</h2>
        </template>
        <div class="space-y-2 font-mono text-sm">
          <div class="flex">
            <span class="font-bold text-primary-500 min-w-[200px]">Current Locale:</span>
            <span class="text-gray-700 dark:text-gray-300">{{ locale }}</span>
          </div>
          <div class="flex">
            <span class="font-bold text-primary-500 min-w-[200px]">Available Locales:</span>
            <span class="text-gray-700 dark:text-gray-300">{{ locales.map(l => l.code).join(', ') }}</span>
          </div>
          <div class="flex">
            <span class="font-bold text-primary-500 min-w-[200px]">Cookie Value:</span>
            <span class="text-gray-700 dark:text-gray-300">{{ localeCookie || 'No cookie' }}</span>
          </div>
          <div class="flex">
            <span class="font-bold text-primary-500 min-w-[200px]">Detected Locale:</span>
            <span class="text-gray-700 dark:text-gray-300">{{ nuxtApp.payload.detectedLocale || 'None' }}</span>
          </div>
        </div>
      </UCard>
      
      <!-- Browser Info -->
      <UCard class="mb-6">
        <template #header>
          <h2 class="text-xl font-semibold">Browser Information</h2>
        </template>
        <div class="space-y-2 font-mono text-sm">
          <div class="flex">
            <span class="font-bold text-primary-500 min-w-[200px]">Current URL:</span>
            <span class="text-gray-700 dark:text-gray-300">{{ currentUrl }}</span>
          </div>
          <div class="flex">
            <span class="font-bold text-primary-500 min-w-[200px]">Hostname:</span>
            <span class="text-gray-700 dark:text-gray-300">{{ hostname }}</span>
          </div>
          <div class="flex">
            <span class="font-bold text-primary-500 min-w-[200px]">User Agent:</span>
            <span class="text-gray-700 dark:text-gray-300 text-xs">{{ userAgent }}</span>
          </div>
        </div>
      </UCard>
      
      <!-- Console Access -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Console Access</h2>
        </template>
        <div class="space-y-2">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Open your browser console and use these commands to explore:
          </p>
          <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm space-y-1">
            <div>// Get runtime config</div>
            <div class="text-blue-500">$nuxt.$config.public.debug</div>
            <div class="mt-2">// Get payload headers</div>
            <div class="text-blue-500">$nuxt.payload.debugHeaders</div>
            <div class="mt-2">// Get locale info</div>
            <div class="text-blue-500">$nuxt.$i18n.locale</div>
            <div class="text-blue-500">$nuxt.$i18n.locales</div>
          </div>
        </div>
      </UCard>
      
      <div class="mt-8 text-center">
        <UButton icon="i-lucide:refresh-cw" @click="refreshPage">
          Refresh Page
        </UButton>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
interface DebugHeaders {
  country: string | null
  city: string | null
  allCfHeaders: Record<string, string>
  host: string | null
  userAgent: string | null
}

const config = useRuntimeConfig()
const nuxtApp = useNuxtApp()
const { locale, locales } = useI18n()
const localeCookie = useCookie('konty-locale')

// Get debug headers from payload
const debugHeaders = ref<DebugHeaders | undefined>(nuxtApp.payload.debugHeaders as DebugHeaders)

// Browser info
const currentUrl = ref('')
const hostname = ref('')
const userAgent = ref('')

onMounted(() => {
  currentUrl.value = window.location.href
  hostname.value = window.location.hostname
  userAgent.value = navigator.userAgent
  
  // Make debug info available in console
  ;(window as Window & { $nuxt?: typeof nuxtApp }).$nuxt = nuxtApp
  
  console.log('Debug Info Available:')
  console.log('- Runtime Config:', config.public.debug)
  console.log('- Debug Headers:', debugHeaders.value)
  console.log('- Locale Info:', { 
    current: locale.value, 
    available: locales.value,
    cookie: localeCookie.value 
  })
})

function refreshPage() {
  window.location.reload()
}

// Disable SEO for this debug page
useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>