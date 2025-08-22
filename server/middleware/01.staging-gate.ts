// Minimal staging protection - blocks bots, allows human access with password
// This middleware stays permanently - only activates on staging environments
export default defineEventHandler(async (event) => {

  console.log('--------==---------------', process.env.NUXT_PUBLIC_SITE_URL)

  const host = getHeader(event, 'host') || ''
  const isStaging =
    host.includes('staging') ||
    host.includes('preview') ||
    host.includes('localhost') ||
    process.env.NUXT_PUBLIC_SITE_URL?.includes('staging') ||
    process.env.NODE_ENV === 'staging' ||
    process.env.VERCEL_ENV === 'preview' // Vercel preview deployments

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
