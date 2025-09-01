import type { H3Event } from 'h3'
import type { ValidLocale } from '~/types/locale'

/**
 * Locale context middleware
 *
 * This middleware only reads the detected locale from provider's edge headers
 * and sets it in the event context for use by the application.
 *
 * All locale detection and redirect logic is handled by the provider's middleware (functions/_middleware.ts).
 */
export default defineEventHandler(async (event: H3Event) => {
  // Read detected locale from Cloudflare Function headers
  const detectedLocale = getHeader(event, 'x-detected-locale')

  if (detectedLocale) {
    event.context.detectedLocale = detectedLocale as ValidLocale
  }
})
