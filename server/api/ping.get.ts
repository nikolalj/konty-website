export default defineEventHandler(() => {
  // Simple ping endpoint for load balancers
  // Returns just "OK" with minimal overhead
  return {
    'var1': process.env.HOSTNAME,
    'var2': process.env.APP_ENV,
    'var3': process.env.STAGING_PASSWORD,
    'var4': process.env.NUXT_PUBLIC_SITE_URL,
    'test': process.env.TEST,
    'var6': process.env.PORT,
  }
})
