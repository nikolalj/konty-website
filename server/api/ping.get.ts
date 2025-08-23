export default defineEventHandler(() => {
  const config = useRuntimeConfig()

  // Simple ping endpoint for load balancers
  // Returns just "OK" with minimal overhead
  return {
    'stagingPassword': config.stagingPassword,
    'env': config.env,
    'public': config.public,
  }
})
