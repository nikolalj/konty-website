import type { H3Event } from 'h3'
import type { ValidLocale } from '~/types/locale'
import { DEFAULT_LOCALE } from '~/config/locale.config.mjs'

/**
 * Locale context middleware
 *
 * This middleware reads locale information from headers set by the edge wrapper
 * and makes them available in the event context for downstream handlers.
 *
 * Headers set by edge wrapper:
 * - X-Detected-Locale: The locale detected from IP geolocation
 * - X-Current-Locale: The locale from the current URL path
 *
 * Sets context:
 * - event.context.detectedLocale - Used by locale-payload.server.ts plugin
 * - event.context.currentLocale - Available for future use
 */
export default defineEventHandler(async (event: H3Event) => {
  // Read locale information from headers set by edge wrapper
  // Fallback to DEFAULT_LOCALE if headers are missing (e.g., direct Nuxt dev mode)
  const detectedLocale = (getHeader(event, 'x-detected-locale') || DEFAULT_LOCALE.code) as ValidLocale
  const currentLocale = (getHeader(event, 'x-current-locale') || DEFAULT_LOCALE.code) as ValidLocale

  // Set context for downstream handlers
  event.context.detectedLocale = detectedLocale
  event.context.currentLocale = currentLocale
})
