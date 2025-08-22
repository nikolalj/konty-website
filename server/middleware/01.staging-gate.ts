export default defineEventHandler(async (event) => {
console.log(`[Staging Gate] HIT`)
  const host = getHeader(event, 'host') || ''
  const isStaging = host.includes('staging') || host.includes('localhost')

  // Skip protection for production
  if (!isStaging) return

  const url = event.path || ''

  // Allow ONLY: login page, API, static assets
  // Everything else requires auth
  if (url === '/staging-auth' ||
      url.startsWith('/_nuxt/') ||
      url.startsWith('/api/') ||
      url.includes('.')) {
        console.log(`[Staging Gate] Allowing access to: ${url} from host: ${host}`)
    return
  }

  // Check for auth cookie
  const hasAuth = getCookie(event, 'staging-auth') === 'authorized'

  // Debug logging for staging environment
  if (!hasAuth) {
    console.log(`[Staging Gate] Blocking access to: ${url} from host: ${host}`)
    return sendRedirect(event, '/staging-auth', 302)
  }
})
