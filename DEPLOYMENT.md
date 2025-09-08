# Konty Website - Cloudflare Workers Deployment Guide

## Quick Start

### First Time Setup
1. Login to Cloudflare:
```bash
wrangler login
```

2. Build the project (single build for all environments):
```bash
pnpm build
```

3. Deploy to production:
```bash
pnpm deploy
```

4. Deploy to staging:
```bash
pnpm deploy:staging
```

## Configuration Overview

### Key Setup
- **Nitro Config**: `deployConfig: false` - This allows us to use wrangler.toml with environments
- **wrangler.toml**: Full environment support with production and staging configurations
- **Single Build**: One build deployed to multiple environments

### Features Enabled
- ✅ **Smart Placement** - Automatically selects optimal edge location (Belgrade/Zagreb for Balkans)
- ✅ **Environment Separation** - Production and staging environments with different configs
- ✅ **Node.js Compatibility** - Required for Nuxt/Nitro
- ✅ **Observability** - Logging and analytics enabled
- ✅ **Optimized Performance** - 50ms CPU limit for better performance

## Environment Variables

### Production
- `APP_ENV`: `production`
- `NUXT_PUBLIC_SITE_URL`: `https://konty.com`
- `GTM_ID`: Your Google Tag Manager ID
- `NUXT_UI_PRO_LICENSE`: Your Nuxt UI Pro license

### Staging
- `APP_ENV`: `staging`
- `NUXT_PUBLIC_SITE_URL`: `https://staging-konty-website.codeusteam.workers.dev`
- Same GTM_ID and license

## Important: Why deployConfig is false

We set `deployConfig: false` in nuxt.config.ts because:
1. **Nitro's auto-generated wrangler.json doesn't support environments**
2. **Wrangler blocks environments in "redirected" (generated) configs**
3. **We need true Cloudflare environment separation for staging/production**
4. **Single build can be deployed to multiple environments**

## Testing Edge Location

After deployment, verify you're hitting the right edge:
```bash
# Check production
curl -I https://konty-website.codeusteam.workers.dev | grep cf-ray

# Check staging  
curl -I https://staging-konty-website.codeusteam.workers.dev | grep cf-ray
```

Look for:
- **BEG** = Belgrade ✅
- **ZAG** = Zagreb ✅
- **VIE** = Vienna ⚠️ (suboptimal for Balkans, but Smart Placement should fix this)

## Optional: Enable KV for Locale Caching

1. Create KV namespace in Cloudflare dashboard:
```bash
wrangler kv:namespace create "LOCALE_CACHE"
wrangler kv:namespace create "LOCALE_CACHE" --preview
```

2. Copy the IDs and uncomment the KV section in `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "LOCALE_CACHE"
id = "your-kv-namespace-id"
preview_id = "your-preview-kv-id"
```

3. Use in your locale middleware:
```javascript
// Check cache first
const cached = await env.LOCALE_CACHE.get(ip)
if (cached) return cached

// Store in cache
await env.LOCALE_CACHE.put(ip, locale, { expirationTtl: 86400 })
```

## Custom Domain Setup

1. Add your domain in Cloudflare DNS
2. Uncomment the routes section in `wrangler.toml`:
```toml
[[routes]]
pattern = "konty.com"
zone_name = "konty.com"
```

3. Deploy again:
```bash
pnpm deploy
```

## Monitoring

View real-time logs:
```bash
# Production logs
pnpm tail

# Staging logs
pnpm tail:staging
```

## Local Development

Test Worker locally:
```bash
pnpm dev:worker
```
Access at: http://localhost:8787

## Troubleshooting

### Still hitting Vienna (VIE)?
1. Smart Placement may take time to optimize
2. Try adding placement hint:
```toml
[placement]
mode = "smart"
hint = "europe-southeast"  # Forces Southeast Europe
```

### Build Issues?
1. Ensure you're using the correct nitro preset:
```javascript
// nuxt.config.ts
nitro: {
  preset: 'cloudflare-module'
}
```

2. Clear build cache:
```bash
rm -rf .output .nuxt dist
pnpm build
```

### Environment Variables Not Working?
- Check they're defined in the correct environment section
- Rebuild after changing wrangler.toml
- Use `wrangler secret` for sensitive values

## Performance Tips

1. **Smart Placement** should automatically select Belgrade/Zagreb for Balkans traffic
2. **KV Caching** can reduce locale detection overhead
3. **Monitor CPU usage** - Stay under 50ms for optimal performance
4. **Use Analytics** to track edge locations and performance

## Migration from Pages

If migrating from Cloudflare Pages:
1. Workers gives you more control but may have different edge routing
2. Smart Placement should improve regional performance
3. Monitor cf-ray headers to ensure optimal edge selection
4. Consider Pages if Workers doesn't hit Belgrade/Zagreb consistently