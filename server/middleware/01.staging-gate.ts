export default defineEventHandler(async (event) => {

  const host = getHeader(event, 'host') || ''
  const isStaging = host.includes('staging') || host.includes('localhost')

  // Skip protection for production
  if (!isStaging) return

  const url = event.path || ''

  // Allow: login page, API, static assets
  if (url === '/staging-auth' ||
      url.startsWith('/_nuxt/') ||
      url.startsWith('/api/') ||
      url.includes('.')) {
    return
  }

  // Check for auth cookie
  const hasAuth = getCookie(event, 'staging-auth') === 'authorized'

  if (!hasAuth) {
    return sendRedirect(event, '/staging-auth', 302)
  }
})
