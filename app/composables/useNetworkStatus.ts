// app/composables/useNetworkStatus.ts
export const useNetworkStatus = () => {
  const isOnline = ref(true)
  const connection = ref<any>(null)
  const effectiveType = ref<string>('4g')
  const saveData = ref(false)
  const isSlowConnection = computed(() => {
    return saveData.value ||
           effectiveType.value === 'slow-2g' ||
           effectiveType.value === '2g' ||
           effectiveType.value === '3g'
  })

  onMounted(() => {
    // Check online status
    isOnline.value = navigator.onLine
    window.addEventListener('online', () => { isOnline.value = true })
    window.addEventListener('offline', () => { isOnline.value = false })

    // Check connection quality
    if ('connection' in navigator || 'mozConnection' in navigator || 'webkitConnection' in navigator) {
      connection.value = (navigator as any).connection ||
                        (navigator as any).mozConnection ||
                        (navigator as any).webkitConnection

      if (connection.value) {
        effectiveType.value = connection.value.effectiveType || '4g'
        saveData.value = connection.value.saveData || false

        // Listen for connection changes
        connection.value.addEventListener('change', () => {
          effectiveType.value = connection.value.effectiveType || '4g'
          saveData.value = connection.value.saveData || false
        })
      }
    }
  })

  return {
    isOnline: readonly(isOnline),
    effectiveType: readonly(effectiveType),
    saveData: readonly(saveData),
    isSlowConnection: readonly(isSlowConnection),
    shouldReduceMotion: computed(() => isSlowConnection.value),
    shouldLoadHD: computed(() => !isSlowConnection.value && effectiveType.value === '4g')
  }
}
