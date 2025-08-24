import type { H3Event } from 'h3'
import { DEFAULT_LOCALE } from '../../config/locale.config'
import { detectUserLocale } from '../utils/country-detection'

/**
 * Simple redirect middleware for first-time visitors
 * Only handles root path redirect to detected locale
 */
export default defineEventHandler(async (event: H3Event) => {
  const url = event.path || ''
  
  // Only handle root path
  if (url !== '/' && url !== '') return
  
  // Detect user's locale (from cookie or IP)
  const { locale } = await detectUserLocale(event)
  
  // Store detected locale in event context for SSR
  event.context.detectedLocale = locale
  
  // Redirect to localized home if not default locale
  if (locale !== DEFAULT_LOCALE) {
    return sendRedirect(event, `/${locale}`, 302)
  }
  
  // Default locale stays at root
})