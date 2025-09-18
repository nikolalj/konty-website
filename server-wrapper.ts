/// <reference types="./worker-configuration.d.ts" />
import serverEntry from './.output/server/index.mjs';
import { DEFAULT_LOCALE, VALID_LOCALES, COUNTRY_TO_LOCALE_MAP } from './app/config/locale.config.mjs';

// Type definitions
type ValidLocale = 'me' | 'rs' | 'ba' | 'us';
interface LocaleCookie {
  locale: ValidLocale;
  explicit: boolean;
}

// Extend the Env interface from worker-configuration.d.ts
interface ExtendedEnv extends Env {
  APP_ENV?: 'production' | 'staging' | 'development';
}

// Parse JSON cookie format: {"locale":"me","explicit":false}
function parseLocaleCookie(cookieHeader: string | null): LocaleCookie | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/konty-locale=([^;]+)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

// Check if path should skip locale processing
function shouldSkipPath(pathname: string): boolean {
  const EXCLUDE_PATTERNS = ['/api/', '/_', '.xml', '.txt', '.json'];

  // Check exclude patterns
  if (EXCLUDE_PATTERNS.some(p => pathname.includes(p))) {
    return true;
  }

  // Skip static files
  if (pathname.includes('.') && !pathname.endsWith('/')) {
    return true;
  }

  return false;
}

export default {
  async fetch(request: Request, env: ExtendedEnv, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Detect locale from country
    const country = request.cf?.country as string | undefined;
    const detectedLocale = (country && COUNTRY_TO_LOCALE_MAP[country.toUpperCase()]) || DEFAULT_LOCALE.code;

    // Get current locale from URL
    const firstSegment = pathname.split('/').filter(Boolean)[0];
    const hasLocalePrefix = firstSegment && VALID_LOCALES.includes(firstSegment as ValidLocale);
    const currentLocale = hasLocalePrefix
      ? firstSegment as ValidLocale
      : DEFAULT_LOCALE.code as ValidLocale;

    // Check if we should skip redirects
    const shouldSkipRedirect = (request.method !== 'GET' && request.method !== 'HEAD')
      || shouldSkipPath(pathname)
      || hasLocalePrefix;

    // Only check redirect logic if not skipping
    if (!shouldSkipRedirect) {
      // Get cookie preference only when needed for redirect logic
      const cookie = parseLocaleCookie(request.headers.get('cookie'));

      // Determine target locale (explicit choice or detection)
      // Validate cookie locale before using it
      const cookieLocale = cookie?.locale && VALID_LOCALES.includes(cookie.locale) ? cookie.locale : null;
      const targetLocale = (cookie?.explicit && cookieLocale) ? cookieLocale : detectedLocale;

      // Redirect if target locale is not the default
      if (targetLocale !== DEFAULT_LOCALE.code) {
        // Build redirect URL
        const targetUrl = new URL(`/${targetLocale}${pathname !== '/' ? pathname : '' }`, url.origin);
        targetUrl.search = url.search;

        // Create redirect with cookie if needed
        const headers = new Headers();
        headers.set('Location', targetUrl.toString());

        if (!cookie || cookie.locale !== targetLocale) {
          const cookieValue: LocaleCookie = {
            locale: targetLocale as ValidLocale,
            explicit: cookie?.explicit || false
          };

          headers.set('Set-Cookie',
            `konty-locale=${encodeURIComponent(JSON.stringify(cookieValue))}; ` +
            `Path=/; Max-Age=31536000; SameSite=Lax${env.APP_ENV === 'production' ? '; Secure' : ''}`
          );
        }

        return new Response(null, {
          status: 302,
          headers
        });
      }
    }

    // No redirect needed - add headers and pass through
    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.set('X-Detected-Locale', detectedLocale);
    modifiedHeaders.set('X-Current-Locale', currentLocale);

    const modifiedRequest = new Request(request.url, {
      method: request.method,
      headers: modifiedHeaders,
      body: (request.method === 'GET' || request.method === 'HEAD') ? null : request.body,
      redirect: request.redirect,
      cf: request.cf
    });

    return serverEntry.fetch(modifiedRequest, env, ctx);
  }
};
