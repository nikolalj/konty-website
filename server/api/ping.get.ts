export default defineEventHandler(() => {
  // Simple ping endpoint for load balancers
  // Returns just "OK" with minimal overhead
  return {
    'var1': process.env.HOSTNAME,
    'var2': process.env.NODE_ENV,
    'var3': process.env.STAGING_PASSWORD,
    'var4': __dirname,
  }
})
