import type { DetectCountryResponse } from '~/types/locale'

export default defineEventHandler(async (): Promise<DetectCountryResponse> => {

  // Try multiple APIs server-side
  let detectedCountry: string | null = null
  let detectionMethod: 'country.is' | 'ipapi.co' | 'ipwho.is' | 'default' = 'default'

  // Try api.country.is
  try {
    const response = await $fetch<{country: string}>('https://api.country.is/')
    detectedCountry = response.country
    detectionMethod = 'country.is'
  } catch {
    
    // Try ipapi.co as fallback
    try {
      const response = await $fetch<{country_code: string}>('https://ipapi.co/json/')
      detectedCountry = response.country_code
      detectionMethod = 'ipapi.co'
    } catch {
      
      // Try ipwho.is as last resort
      try {
        const response = await $fetch<{country_code: string}>('https://ipwho.is/')
        detectedCountry = response.country_code
        detectionMethod = 'ipwho.is'
      } catch {
        // All methods failed, will use default
      }
    }
  }

  return {
    country: detectedCountry || 'RS',  // Default to Serbia
    method: detectionMethod
  }
})