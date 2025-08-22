// Add noindex meta tags on staging environments only
export default defineNuxtPlugin(() => {
  // Check if we're on staging
  const host = window.location.hostname
  const isStaging = 
    host.includes('staging') ||
    host.includes('preview') ||
    host.includes('localhost') ||
    import.meta.env.NODE_ENV === 'staging'

  if (isStaging) {
    // Add meta tags to prevent indexing
    useHead({
      meta: [
        { name: 'robots', content: 'noindex, nofollow, noarchive, nosnippet' },
        { name: 'googlebot', content: 'noindex, nofollow' }
      ]
    })
    
    // Visual indicator for developers
    if (import.meta.dev) {
      console.log('🔒 Staging environment detected - indexing blocked')
    }
  }
})