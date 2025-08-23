export default defineEventHandler(() => {
  const config = useRuntimeConfig()

  // Simple ping endpoint for load balancers
  // Returns just "OK" with minimal overhead
  return {
    'env': config.env,
    'public': config.public,
  }
})
