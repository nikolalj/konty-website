# Konty Website - TODO List

## SITEMAP

### Before Launch (CRITICAL)
- [ ] **Activate blog sitemap handler**
  - Implement data fetching in `/server/api/__sitemap__/blog.ts`
  - Connect to CMS/database for blog posts
  - Return actual blog URLs with proper lastmod dates
  - Test with real blog content

- [ ] **Update lastmod dates** in `/server/api/__sitemap__/urls.ts`
  - Set actual dates when each page content was last modified
  - Currently all set to `2025-09-15` (placeholder)
  - CRITICAL: Update pricing page lastmod immediately when prices change

- [ ] **Set production environment variables**
  - `NUXT_PUBLIC_SITE_URL` - Set to production domain (https://konty.com)
  - `APP_ENV=production` - Enable proper indexing in robots.txt
  - Verify URLs in sitemap show correct domain, not `http://[:3000`

- [ ] **Submit sitemap to Google Search Console**
  1. Go to Google Search Console
  2. Add property for konty.com (if not already added)
  3. Navigate to Sitemaps section
  4. Submit: `https://konty.com/sitemap_index.xml`
  5. Wait for validation (may show initial error - wait a few days)
  6. Monitor indexing status for all 4 locales
  7. Read https://nuxtseo.com/docs/sitemap/guides/submitting-sitemap for more info

- [ ] **Verify sitemap accessibility**
  - Test: `https://konty.com/sitemap_index.xml`
  - Test: `https://konty.com/robots.txt` (should include sitemap URL)
  - Validate XML at: https://www.xml-sitemaps.com/validate-xml-sitemap.html

## Important Files
- **Sitemap Config**: `/nuxt.config.ts` (lines 133-144)
- **Main Pages Handler**: `/server/api/__sitemap__/urls.ts`
- **Blog Handler**: `/server/api/__sitemap__/blog.ts`
- **Test URLs**:
  - Dev: `http://localhost:3000/sitemap_index.xml`
  - Prod: `https://konty.com/sitemap_index.xml`
