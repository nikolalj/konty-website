# SEO & Technical TODOs

## High Priority

### 1. Create Product Dashboard Image
**Issue:** Schema markup references `/images/konty-dashboard.png` but file doesn't exist
**Files affected:**
- `/app/components/Schema/SoftwareApplication.vue` (line 47)
- `/app/components/Schema/ProductWithOffers.vue` (line 109)

**Solution:**
- Create actual Konty dashboard screenshot at `/public/images/konty-dashboard.png`
- Ensure image is optimized (WebP format recommended)
- Dimensions: at least 1200x630px for social sharing
- Alternative: Update schema to use existing hero image

---

### 2. Implement Featured Image System
**Issue:** OG and Twitter images need dynamic featured images per page
**Current state:** Using default meta images across all pages

**Implementation needed:**
- Add `ogImage` field to page meta
- Create fallback system: page-specific → default
- Ensure images meet social platform requirements:
  - OG: 1200x630px minimum
  - Twitter: 1200x600px with 2:1 aspect ratio

---

### 3. Add Dynamic Lastmod to Sitemap
**Issue:** Sitemap entries don't have `lastmod` dates
**Impact:** Search engines can't determine content freshness

**Solution:**
- Track page modification dates
- Add `lastmod` field to sitemap generation
- Consider using git last commit date or CMS update timestamp

---

### 4. Create URL Redirect System
**Issue:** No system for handling changed URLs/slugs
**Risk:** Broken links and lost SEO value when URLs change

**Requirements:**
- 301 redirect mapping system
- Store redirects in configuration or database
- Handle both internal and external redirects
- Track redirect chains to avoid loops

---

## Medium Priority

### 5. Internal Linking System
**Current gap:** No systematic internal linking with proper rel attributes
**Needed:**
- Add contextual links between related pages
- Implement breadcrumbs on deeper pages
- Use appropriate rel attributes (nofollow for external, etc.)

### 6. Article/Blog Schema
**Status:** Pending until blog section is created
**Requirements:**
- Article schema for blog posts
- Author schema for contributors
- BreadcrumbList schema for navigation

### 7. Enhanced Image Optimization
**Current issues:**
- Some images using external URLs (martex-nuxtjs.vercel.app)
- No systematic image optimization pipeline

**Improvements needed:**
- Host all images locally
- Implement responsive images with srcset
- Use modern formats (WebP, AVIF)
- Add lazy loading for below-fold images

---

## Low Priority

### 8. Schema Enhancements
- Add LocalBusiness schema for physical locations
- Implement Event schema for webinars/demos
- Add VideoObject schema when video content is added
- Consider adding SiteNavigationElement schema

### 9. Performance Monitoring
- Set up Core Web Vitals monitoring
- Implement real user monitoring (RUM)
- Track SEO metrics and rankings
- Monitor 404s and broken links

### 10. Accessibility Improvements
- Complete ARIA labeling
- Ensure all interactive elements are keyboard accessible
- Add skip navigation links
- Test with screen readers

---

## Completed Tasks ✓
- ✓ Removed noindex from legal pages (privacy, terms)
- ✓ Fixed multiple H1 issues across pages
- ✓ Added H1 support to pricing page
- ✓ Added meaningful alt text to informative images
- ✓ Implemented basic schema markup (SoftwareApplication, Product, FAQ, Reviews)
- ✓ Added breadcrumbs (in header component)
- ✓ Fixed duplicate hreflang declarations (removed from custom composable, letting @nuxtjs/i18n handle it)
- ✓ Verified trailing slash consistency (all internal links follow trailingSlash: false)
- ✓ Verified canonical URLs are properly generated without trailing slashes

---

## Notes
- Current SEO score: ~88/100
- Main gaps: Image assets, dynamic content handling, redirect system
- Priority should be given to tasks that directly impact conversion rate