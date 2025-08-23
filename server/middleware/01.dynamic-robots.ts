// Serve different robots.txt based on environment
export default defineEventHandler(async (event) => {
  if (event.path !== '/robots.txt') return

  const host = getHeader(event, 'host') || ''
  const config = useRuntimeConfig()

  const isStaging =
    host.includes('staging') ||
    host.includes('localhost') ||
    config.env === 'staging'

  if (isStaging) {
    // Block all crawlers on staging
    const stagingRobots = `# Staging Environment
User-agent: *
Disallow: /`

    setHeader(event, 'Content-Type', 'text/plain')
    setHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate')
    return stagingRobots
  }

  // Production robots.txt - allow crawling
  const productionRobots = `# Production Environment
User-agent: *
Allow: /

# Sitemap
Sitemap: https://konty.com/sitemap.xml`

  setHeader(event, 'Content-Type', 'text/plain')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  return productionRobots
})
