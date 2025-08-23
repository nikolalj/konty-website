export default defineEventHandler(() => {
  // Simple ping endpoint for load balancers
  // Returns just "OK" with minimal overhead
  return {
    'var2': process.env.APP_ENV,
    'url': process.env.NUXT_PUBLIC_SITE_URL,
    'var6': process.env.PORT,
  }
})
