export default defineNuxtPlugin(() => {
  // Handle automatic redirects for old URLs
  const redirects: Record<string, string> = {
    // Legacy brand redirects
    '/allegra': '/',
    '/aria': '/',
    '/allegrapos': '/',
    '/ariapos': '/',
    
    // Common variations
    '/product': '/products',
    '/price': '/pricing',
    '/contact': '/about',
    
    // Add more redirects as needed
  }

  // Check if current path needs redirect
  const route = useRoute()
  const redirect = redirects[route.path]
  
  if (redirect) {
    throw createError({
      statusCode: 301,
      statusMessage: `Moved Permanently to ${redirect}`
    })
  }
})