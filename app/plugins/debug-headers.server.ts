/**
 * Server-side plugin to capture Cloudflare headers for debugging
 */
export default defineNuxtPlugin((nuxtApp) => {
  const event = useRequestEvent()
  
  if (!event) return
  
  // Get all CF-related headers
  const headers = event.node.req.headers
  const cfHeaders: Record<string, string> = {}
  
  // Capture all headers that start with 'x-cf-' or 'cf-'
  Object.entries(headers).forEach(([key, value]) => {
    if (key.toLowerCase().startsWith('x-cf-') || key.toLowerCase().startsWith('cf-')) {
      cfHeaders[key] = String(value)
    }
  })
  
  // Also capture the specific ones we set in our edge function
  const country = headers['x-cf-country'] as string || null
  const city = headers['x-cf-city'] as string || null
  
  // Update runtime config with captured values
  const config = useRuntimeConfig()
  if (config.public.debug) {
    config.public.debug.cfCountry = country || ''
    config.public.debug.cfCity = city || ''
    config.public.debug.cfHeaders = cfHeaders
  }
  
  // Also add to nuxt payload for client access
  nuxtApp.payload.debugHeaders = {
    country,
    city,
    allCfHeaders: cfHeaders,
    host: headers.host as string || null,
    userAgent: headers['user-agent'] as string || null,
  }
})