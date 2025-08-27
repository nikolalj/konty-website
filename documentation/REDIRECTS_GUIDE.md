# URL Redirects Guide

## How to Add Redirects

When you change a URL or need to redirect old links, add them to `nuxt.config.ts`:

```typescript
routeRules: {
  '/old-url': { redirect: { to: '/new-url', statusCode: 301 } }
}
```

## Why We Use `routeRules`

This is the **native Nuxt way** - no custom code needed:
- ✅ **Fast** - Handled at server level, doesn't load Vue app
- ✅ **Simple** - Just configuration, no middleware code
- ✅ **SEO-friendly** - Preserves search rankings with proper 301s
- ✅ **Built-in** - Native Nuxt feature, no dependencies

## Common Redirect Scenarios

### Page Renamed
```typescript
'/old-pricing': { redirect: { to: '/pricing', statusCode: 301 } }
```

### Category Restructure
```typescript
'/restaurant-pos': { redirect: { to: '/konty-hospitality', statusCode: 301 } }
'/retail-pos': { redirect: { to: '/konty-retail', statusCode: 301 } }
```

### Consolidating Pages
```typescript
'/features': { redirect: { to: '/products', statusCode: 301 } }
'/contact': { redirect: { to: '/demo', statusCode: 301 } }
```

### Wildcard Redirects
```typescript
'/blog/**': { redirect: { to: '/news', statusCode: 301 } }
```

## Status Codes

- **301** - Permanent redirect (SEO value transfers)
- **302** - Temporary redirect (testing/seasonal)
- **307** - Temporary (preserves HTTP method)
- **308** - Permanent (preserves HTTP method)

**Always use 301 for permanent URL changes** to preserve SEO rankings.

## Testing Redirects

1. Add redirect to `nuxt.config.ts`
2. Restart dev server (`npm run dev`)
3. Visit old URL
4. Verify redirect to new URL
5. Check browser shows 301 in Network tab

## Important Notes

- Redirects work automatically with all locales
- No need for separate `/me/old-url`, `/ba/old-url` entries
- Query parameters are preserved by default
- Redirects are cached by browsers (use incognito for testing)

## When NOT to Use Redirects

- **Temporary content** - Use Vue Router navigation instead
- **Complex logic** - Use middleware for dynamic redirects
- **User-based** - Use authentication middleware

## Performance Impact

**Zero** - Redirects happen at Nitro server level before Vue loads, making them extremely fast.