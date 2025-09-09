<template>
  <div class="py-40 px-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">GTM Implementation Test</h1>

    <div class="grid gap-6">
      <!-- Status Card -->
      <UCard :ui="{ header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
        <template #header>
          <h2 class="text-xl font-semibold">GTM Status</h2>
        </template>

        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-muted">GTM Container ID:</span>
            <span class="font-mono">{{ gtmId || 'Not configured' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted">GTM Loaded:</span>
            <UBadge :color="gtmLoaded ? 'success' : 'error'">
              {{ gtmLoaded ? 'Yes' : 'No' }}
            </UBadge>
          </div>
          <div class="flex justify-between">
            <span class="text-muted">DataLayer Events:</span>
            <span class="font-semibold">{{ dataLayerCount }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted">Consent Mode:</span>
            <UBadge :color="consentGranted ? 'success' : 'error'">
              {{ consentGranted ? 'Granted' : 'Denied' }}
            </UBadge>
          </div>
        </div>
      </UCard>

      <!-- Test Actions -->
      <UCard :ui="{ header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
        <template #header>
          <h2 class="text-xl font-semibold">Test Actions</h2>
        </template>

        <div class="flex flex-wrap gap-3">
          <UButton icon="i-lucide-send" @click="testEvent">
            Send Test Event
          </UButton>
          <UButton icon="i-lucide-dollar-sign" color="success" @click="testConversion">
            Send Conversion
          </UButton>
          <UButton icon="i-lucide-shopping-cart" color="primary" @click="testEcommerce">
            Send E-commerce
          </UButton>
          <UButton icon="i-lucide-database" variant="outline" @click="checkDataLayer">
            Inspect DataLayer
          </UButton>
          <UButton icon="i-lucide-trash" variant="ghost" @click="clearLogs">
            Clear Logs
          </UButton>
        </div>
      </UCard>

      <!-- Event Log -->
      <UCard v-if="logs.length > 0" :ui="{ header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
        <template #header>
          <h2 class="text-xl font-semibold">Event Log</h2>
        </template>

        <div class="space-y-2 max-h-96 overflow-y-auto">
          <div
            v-for="(log, i) in logs"
            :key="i"
            class="p-3 bg-[var(--bg-100)] dark:bg-[var(--bg-200)] rounded text-sm font-mono"
            :class="{
              'border-l-4 border-green-500': log.type === 'success',
              'border-l-4 border-red-500': log.type === 'error',
              'border-l-4 border-blue-500': log.type === 'info'
            }"
          >
            <div class="flex justify-between items-start">
              <span class="flex-1">{{ log.message }}</span>
              <span class="text-xs text-muted ml-2">{{ log.time }}</span>
            </div>
            <details v-if="log.data" class="mt-2">
              <summary class="cursor-pointer text-xs text-muted">View Data</summary>
              <pre class="mt-2 text-xs overflow-x-auto">{{ JSON.stringify(log.data, null, 2) }}</pre>
            </details>
          </div>
        </div>
      </UCard>

      <!-- Instructions -->
      <UCard :ui="{ header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
        <template #header>
          <h2 class="text-xl font-semibold">How to Verify GTM</h2>
        </template>

        <ol class="space-y-2 list-decimal list-inside">
          <li>Open browser DevTools → Console</li>
          <li>Type <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">dataLayer</code> and press Enter</li>
          <li>Install <a href="https://chrome.google.com/webstore/detail/tag-assistant-legacy/kejbdjndbnbjgmefkgdddjlbokphdefk" target="_blank" class="text-primary hover:underline">GTM Tag Assistant</a></li>
          <li>Enable GTM Preview mode in your GTM container</li>
          <li>Check if events appear in GTM Debug panel</li>
        </ol>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

interface LogEntry {
  type: 'info' | 'success' | 'error'
  message: string
  time: string
  data?: unknown
}

const { track } = useTracking()
const { consent } = useConsent()
const config = useRuntimeConfig()

const gtmId = ref(config.public.gtm?.id)
const gtmLoaded = ref(false)
const dataLayerCount = ref(0)
const consentGranted = computed(() => consent.value.analytics)
const logs: Ref<LogEntry[]> = ref([])

const addLog = (type: LogEntry['type'], message: string, data?: unknown) => {
  logs.value.unshift({
    type,
    message,
    time: new Date().toLocaleTimeString(),
    data
  })
}

const checkDataLayer = () => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    dataLayerCount.value = window.dataLayer.length
    addLog('info', `DataLayer contains ${window.dataLayer.length} events`, window.dataLayer.slice(-5))
    console.log('Full DataLayer:', window.dataLayer)
  } else {
    addLog('error', 'DataLayer not found')
  }
}

const testEvent = () => {
  const eventData = {
    event_category: 'test',
    event_label: 'manual_test',
    event_value: Math.floor(Math.random() * 100)
  }

  track('test_click', eventData)
  addLog('success', 'Sent test_click event', eventData)
}

const testConversion = () => {
  const conversionData = {
    value: 99.99,
    currency: 'USD',
    transaction_id: `TEST-${Date.now()}`
  }

  track('generate_lead', conversionData)
  addLog('success', 'Sent generate_lead conversion', conversionData)
}

const testEcommerce = () => {
  const ecommerceData = {
    value: 149.99,
    currency: 'EUR',
    items: [{
      item_id: 'SKU123',
      item_name: 'Test Product',
      price: 149.99,
      quantity: 1
    }]
  }

  track('purchase', ecommerceData)
  addLog('success', 'Sent purchase event', ecommerceData)
}

const clearLogs = () => {
  logs.value = []
  addLog('info', 'Logs cleared')
}

onMounted(() => {
  // Check GTM status
  if (typeof window !== 'undefined') {
    gtmLoaded.value = !!window.google_tag_manager

    if (gtmLoaded.value) {
      addLog('success', `GTM loaded successfully with ID: ${gtmId.value}`)
    } else {
      addLog('error', 'GTM not loaded. Check if GTM_ID is set in .env')
    }

    checkDataLayer()

    // Monitor dataLayer changes
    if (window.dataLayer) {
      const originalPush = window.dataLayer.push
      window.dataLayer.push = function(...args) {
        const result = originalPush.apply(window.dataLayer, args)
        dataLayerCount.value = window.dataLayer!.length
        return result
      }
    }
  }
})
</script>
