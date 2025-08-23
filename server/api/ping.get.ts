export default defineEventHandler(() => {
  // Simple ping endpoint for load balancers
  // Returns just "OK" with minimal overhead
  return 'OK'
})