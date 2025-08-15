import { defineNuxtPlugin } from '#app'
import { setResponseHeader } from 'h3'

export default defineNuxtPlugin((nuxtApp) => {
  const event = nuxtApp.ssrContext?.event
  if (!event) return

  const cspDirectives = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Needed for Nuxt hydration
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://googletagmanager.com'
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'"
    ],
    'font-src': [
      "'self'",
      'data:'
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'https://www.google-analytics.com',
      'https://googletagmanager.com'
    ],
    'connect-src': [
      "'self'",
      'https://www.google-analytics.com',
      'https://analytics.google.com',
      'https://googletagmanager.com'
    ],
    'frame-src': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'upgrade-insecure-requests': []
  }

  const cspValue = Object.entries(cspDirectives)
    .map(([directive, sources]) => sources.length ? `${directive} ${sources.join(' ')}` : directive)
    .join('; ')

  setResponseHeader(event, 'Content-Security-Policy', cspValue)
})
