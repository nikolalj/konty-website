import type { H3Event } from 'h3'
import { Reader } from '@maxmind/geoip2-node'
import { existsSync } from 'fs'
import { join } from 'path'
import { getHeader } from 'h3'

/**
 * Simple MaxMind GeoLite2 detection
 * No caching, no complexity - just lookup and return
 */

let reader: any = null  // Database reader instance

/**
 * Initialize database reader once
 */
async function getReader() {
  if (reader) return reader
  
  const dbPath = join(process.cwd(), 'server', 'data', 'GeoLite2-Country.mmdb')
  
  if (!existsSync(dbPath)) {
    console.warn('[MaxMind] Database not found. Run: pnpm download-geolite2')
    return null
  }
  
  try {
    reader = await Reader.open(dbPath)
    console.log('[MaxMind] Database loaded')
    return reader
  } catch (error) {
    console.error('[MaxMind] Failed to load database:', error)
    return null
  }
}

/**
 * Get client IP from request headers
 */
function getClientIP(event: H3Event): string | null {
  // Try common headers
  const headers = [
    'x-real-ip',
    'x-forwarded-for',
    'x-client-ip'
  ]
  
  for (const header of headers) {
    const value = getHeader(event, header)
    if (value) {
      // Take first IP if multiple
      const ip = value.split(',')[0]?.trim()
      // Skip local IPs
      if (ip && !ip.startsWith('127.') && !ip.startsWith('192.168.') && ip !== '::1') {
        return ip
      }
    }
  }
  
  return null
}

/**
 * Detect country using MaxMind
 * Returns 2-letter country code or null
 */
export async function detectCountryWithMaxMind(event: H3Event): Promise<string | null> {
  const db = await getReader()
  if (!db) return null
  
  const ip = getClientIP(event)
  if (!ip) return null
  
  try {
    const result = db.country(ip)
    return result.country?.isoCode || null
  } catch {
    // IP not found in database
    return null
  }
}