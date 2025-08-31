/**
 * Cloudflare Pages middleware function
 * Runs at the edge before the Nuxt server
 * Adds country and city detection headers for the server to use
 */
interface CloudflareRequest extends Request {
  cf?: {
    country?: string
    city?: string
    continent?: string
    timezone?: string
  }
}

export async function onRequest(context: {
  request: Request
  env: unknown
  next: () => Promise<Response>
}): Promise<Response> {
  const { request, next } = context
  
  // Get location data from Cloudflare's request.cf object
  // This is computed at the edge with zero latency
  const cf = (request as CloudflareRequest).cf
  const country = cf?.country || null
  const city = cf?.city || null
  
  // Clone the request and add location headers
  const modifiedRequest = new Request(request)
  
  if (country) {
    modifiedRequest.headers.set('X-CF-Country', country)
  }
  
  if (city) {
    // Add city for analytics purposes
    modifiedRequest.headers.set('X-CF-City', city)
  }
  
  // Continue to the Nuxt application
  return next()
}