import { defineNuxtPlugin } from '#app'
import { setResponseHeader } from 'h3'

export default defineNuxtPlugin((nuxtApp) => {
  // Access the event from ssrContext
  const event = nuxtApp.ssrContext?.event
  
  if (!event) {
    return
  }

  // Content Security Policy configuration
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
      "'unsafe-inline'", // Needed for Nuxt UI and Tailwind
      'https://fonts.googleapis.com'
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
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

  // Build CSP header value
  const cspValue = Object.entries(cspDirectives)
    .map(([directive, sources]) => {
      if (sources.length === 0) return directive
      return `${directive} ${sources.join(' ')}`
    })
    .join('; ')

  // Set the CSP header using the event object
  setResponseHeader(event, 'Content-Security-Policy', cspValue)
})