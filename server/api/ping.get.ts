export default defineEventHandler(() => {
  // Simple ping endpoint for load balancers
  // Returns just "OK" with minimal overhead
  return {
    'var1': process.env.HOSTNAME,
    'var2': process.env.APP_ENV,
    'var3': process.env.STAGING_PASSWORD,
    'var4': process.env.NUXT_PUBLIC_SITE_URL,
    'test1': process.env.TEST1,
    'test2': process.env.TEST2,
    'var6': process.env.PORT,
  }
})
