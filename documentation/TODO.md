# Remaining TODOs

## Design/Content Tasks

### 1. Create Product Dashboard Image
**Files needed:** `/public/images/konty-dashboard.png`
- Create actual Konty dashboard screenshot
- Dimensions: 1200x630px (also works for OG images)
- Currently referenced in Schema components but doesn't exist

### 2. Create OG Images  
**Files needed:** In `/public/og/` directory
- `homepage.jpg` - 1200x630px
- `products.jpg` - 1200x630px  
- `retail.jpg` - 1200x630px
- `hospitality.jpg` - 1200x630px
- `pricing.jpg` - 1200x630px
- `demo.jpg` - 1200x630px
- `about.jpg` - 1200x630px
- `legal.jpg` - 1200x630px (for privacy/terms)
- `default.jpg` - 1200x630px (fallback)

**Note:** System is ready, just needs actual image files

## Technical Tasks (Optional Enhancements)

### 3. Replace External Image URLs
**Current issue:** Some components use `martex-nuxtjs.vercel.app` images
- Hero component
- Other placeholder images
- Replace with actual Konty branded images

### 4. Blog/Article Schema
**When needed:** Only when blog section is added
- Article schema for posts
- Author schema
- Not needed until content exists

### 5. Advanced Schema Types
**Nice to have:**
- LocalBusiness schema (if physical locations)
- Event schema (for webinars)
- VideoObject schema (when videos added)

### 6. Performance Monitoring Setup
**For production:**
- Core Web Vitals tracking
- 404 monitoring
- SEO ranking tracking

---

## Completed SEO Tasks ✓

### Critical Issues (All Fixed)
- ✓ Removed noindex from legal pages
- ✓ Fixed multiple H1 issues 
- ✓ Added H1 to pricing page
- ✓ Fixed duplicate hreflang
- ✓ Verified trailing slash consistency
- ✓ Canonical URLs working correctly

### Implementations (All Done)
- ✓ Schema markup (SoftwareApplication, Product, FAQ, Reviews)
- ✓ Breadcrumbs in header
- ✓ Sitemap with lastmod tracking
- ✓ Git pre-commit reminder for lastmod
- ✓ OG image system configured
- ✓ URL redirect system (using routeRules)
- ✓ Internal linking (already well-implemented)
- ✓ Alt text for images

---

## Summary
**Technical SEO: Complete** - All code/configuration tasks are done
**Remaining: Design work** - Need actual images to be created