export default defineEventHandler(async (event) => {
  // Basic health check - returns 200 if the app is running

  // You can add more sophisticated checks here:
  // - Database connectivity
  // - External API availability
  // - Memory usage
  // - Response time

  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.APP_ENV || 'development',

    // Memory usage
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB'
    },

    // Node.js version
    node: process.version,

    // PM2 instance ID if running under PM2
    instance: process.env.INSTANCE_ID || 'single'
  }

  // Return 200 OK with health info
  setResponseStatus(event, 200)
  return health
})
