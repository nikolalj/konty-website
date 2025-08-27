# OpenGraph Images Guide

## Quick Setup

1. **Create OG images** for each page at 1200x630px
2. **Save them** in `/public/og/` directory as JPG files
3. Images are **automatically used** based on the current page route

## Required Images

Create these images and place them in `/public/og/`:

| File Name | Page | Design Suggestions |
|-----------|------|-------------------|
| `homepage.jpg` | Homepage | Show dashboard screenshot with logo |
| `products.jpg` | Products | Show both Retail & Hospitality icons/screenshots |
| `retail.jpg` | Konty Retail | Retail store interface screenshot |
| `hospitality.jpg` | Konty Hospitality | Restaurant POS interface |
| `pricing.jpg` | Pricing | Pricing table or "Starting from X" message |
| `demo.jpg` | Demo | "Try Free Demo" call-to-action design |
| `about.jpg` | About | Team photo or company values |
| `legal.jpg` | Privacy/Terms | Simple branded image with logo |
| `default.jpg` | Fallback | Generic Konty branded image |

## Image Specifications

- **Dimensions**: 1200x630px (1.91:1 ratio)
- **Format**: JPG (smaller file size than PNG)
- **File size**: Keep under 1MB
- **Content**: Include Konty logo, clear text, product visuals

## Design Tips

1. **Text should be large** - It appears small on social feeds
2. **High contrast** - Ensure readability on all devices
3. **Brand colors** - Use consistent Konty branding
4. **Clear CTA** - What do you want viewers to do?
5. **Localized text** - Consider creating Serbian versions

## Testing

After adding images, test them using:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Current Configuration

The system automatically:
1. Detects the current page route
2. Loads the corresponding OG image from `/public/og/`
3. Falls back to `default.jpg` if page-specific image doesn't exist
4. Generates absolute URLs for social platforms

## Adding New Pages

To add OG image for a new page:

1. Create the image (1200x630px JPG)
2. Save to `/public/og/your-page.jpg`
3. Add configuration in `/app/config/og-images.ts`:

```typescript
'/your-page': {
  path: '/og/your-page.jpg',
  alt: 'Description of image'
}
```

## Performance Notes

- Images are served statically (fast)
- No dynamic generation overhead
- Cached by social platforms
- Update cache by adding version query params if needed

## Temporary Setup

Until proper OG images are created, the site will use `/og/default.jpg` for all pages. **Priority: Create at least `homepage.jpg`, `pricing.jpg`, and `default.jpg` first.**