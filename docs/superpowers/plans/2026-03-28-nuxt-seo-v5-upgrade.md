# Nuxt SEO v3 to v5 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `@nuxtjs/seo` from v3.2.2 to v5.0.2, updating all 7 sub-modules across their major version bumps while preserving Serbian character rendering in OG images.

**Architecture:** The upgrade touches the meta-package version in `package.json`, the `ogImage` config block in `nuxt.config.ts` (fonts removal, config key changes, renderer default), a composable rename across 23 page files (`defineOgImageComponent` -> `defineOgImage`), and 4 OG image component file renames (add `.satori` suffix). All other sub-modules (sitemap, robots, schema-org, site-config, link-checker, seo-utils) require zero code changes — the project is already compliant with their v5-target APIs.

**Tech Stack:** Nuxt 4, @nuxtjs/seo v5, nuxt-og-image v6, Satori renderer, @nuxt/fonts, pnpm, Cloudflare Workers deployment

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `package.json` | Bump `@nuxtjs/seo` version, add `satori` + `@resvg/resvg-wasm` deps |
| Modify | `nuxt.config.ts` | Remove `ogImage.fonts`, remove `ogImage.componentOptions`, remove `defaults.renderer` |
| Rename | `app/components/OgImage/Main.vue` -> `Main.satori.vue` | OG image component (Satori renderer suffix) |
| Rename | `app/components/OgImage/Blog.vue` -> `Blog.satori.vue` | OG image component (Satori renderer suffix) |
| Rename | `app/components/OgImage/Pricing.vue` -> `Pricing.satori.vue` | OG image component (Satori renderer suffix) |
| Rename | `app/components/OgImage/Product.vue` -> `Product.satori.vue` | OG image component (Satori renderer suffix) |
| Modify | 23 page files (listed below) | Replace `defineOgImageComponent()` with `defineOgImage()` |
| Modify | `nuxt.config.ts` (fonts block) | Add TTF variant to `@nuxt/fonts` config for Satori compatibility |

**23 page files with `defineOgImageComponent` -> `defineOgImage`:**
- `app/pages/index.vue`
- `app/pages/pricing.vue`
- `app/pages/demo.vue`
- `app/pages/contact.vue`
- `app/pages/partners.vue`
- `app/pages/client-stories.vue`
- `app/pages/blog/index.vue`
- `app/pages/blog/[...slug].vue`
- `app/pages/offers/3m-free.vue`
- `app/pages/products/index.vue`
- `app/pages/products/download.vue`
- `app/pages/products/retail/index.vue`
- `app/pages/products/retail/features.vue`
- `app/pages/products/hospitality/index.vue`
- `app/pages/products/hospitality/features.vue`
- `app/pages/solutions/index.vue`
- `app/pages/solutions/restaurants.vue`
- `app/pages/solutions/bars-cafes.vue`
- `app/pages/solutions/fast-food.vue`
- `app/pages/solutions/b2b.vue`
- `app/pages/solutions/grocery-supermarkets.vue`
- `app/pages/solutions/clothing-boutiques.vue`
- `app/pages/solutions/general-stores.vue`

---

### Task 1: Create upgrade branch and bump dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Create a feature branch**

```bash
git checkout -b feat/nuxt-seo-v5-upgrade
```

- [ ] **Step 2: Update `@nuxtjs/seo` version in `package.json`**

Change line 33 of `package.json`:

```diff
-    "@nuxtjs/seo": "^3.1.0",
+    "@nuxtjs/seo": "^5.0.0",
```

- [ ] **Step 3: Add explicit Satori renderer dependencies**

nuxt-og-image v6 no longer bundles renderer dependencies. Since this project uses the Satori renderer and deploys to Cloudflare Workers (edge), add the WASM variants. Add these to the `dependencies` section of `package.json`:

```json
"satori": "^0.12.0",
"@resvg/resvg-wasm": "^2.6.0"
```

**Note:** Use `@resvg/resvg-wasm` (not `@resvg/resvg-js`) because the project deploys to Cloudflare Workers which is an edge runtime without native Node.js bindings.

- [ ] **Step 4: Install dependencies**

```bash
pnpm install
```

Expected: Installation succeeds. Check for any peer dependency warnings and resolve them.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: bump @nuxtjs/seo to v5, add satori renderer deps"
```

---

### Task 2: Update `nuxt.config.ts` OG image configuration

**Files:**
- Modify: `nuxt.config.ts:47-58` (fonts block)
- Modify: `nuxt.config.ts:156-181` (ogImage block)

- [ ] **Step 1: Add TTF font variant to `@nuxt/fonts` config**

In v6, OG image fonts come from `@nuxt/fonts` instead of `ogImage.fonts`. The current `fonts` config at line 47-58 only declares the `.woff2` file. Satori needs TTF (it silently drops woff2 and breaks Serbian characters). Add the TTF source alongside the existing woff2.

Replace the `fonts` block in `nuxt.config.ts` (lines 47-58) with:

```typescript
  fonts: {
    provider: 'local',
    families: [
      {
        name: 'Plus Jakarta Sans',
        src: [
          '/fonts/PlusJakartaSans-Variable.woff2',
          '/fonts/PlusJakartaSans-Variable.ttf',
        ],
        weights: ['200 800'],
        styles: ['normal'],
        global: true
      }
    ]
  },
```

**Why:** When `@nuxt/fonts` has both woff2 and TTF available, it serves woff2 to browsers (smaller) but Satori can resolve the TTF it needs. The `global: true` flag makes the font available to OG image rendering.

- [ ] **Step 2: Remove `ogImage.fonts` config**

Delete lines 160-165 from `nuxt.config.ts` (the entire `fonts` array inside the `ogImage` block):

```diff
  ogImage: {
    zeroRuntime: false,

-    // Local TTF font — Satori silently drops woff2, breaking Serbian characters
-    fonts: [
-      { name: 'Plus Jakarta Sans', weight: 400, path: '/fonts/PlusJakartaSans-Variable.ttf' },
-      { name: 'Plus Jakarta Sans', weight: 600, path: '/fonts/PlusJakartaSans-Variable.ttf' },
-      { name: 'Plus Jakarta Sans', weight: 700, path: '/fonts/PlusJakartaSans-Variable.ttf' }
-    ],
-
```

- [ ] **Step 3: Remove `ogImage.componentOptions` config**

Delete lines 177-180 from `nuxt.config.ts`:

```diff
-    // Component defaults
-    componentOptions: {
-      global: true // Make OG image components globally available
-    }
```

- [ ] **Step 4: Remove `renderer` from `ogImage.defaults`**

The `defaults.renderer` option is removed in v6. Satori is auto-detected when the `satori` package is installed. Remove it:

```diff
    defaults: {
      extension: 'png',
      width: 1200,
      height: 630,
-      renderer: 'satori', // Fast, universal compatibility
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7, // 7 days cache
      component: 'Main' // Default OG image component for all pages
    },
```

- [ ] **Step 5: Verify the final `ogImage` block looks correct**

The entire `ogImage` section in `nuxt.config.ts` should now be:

```typescript
  // OG Image generation with Satori
  ogImage: {
    zeroRuntime: false,

    // Default settings for all OG images
    defaults: {
      extension: 'png',
      width: 1200,
      height: 630,
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7, // 7 days cache
      component: 'Main' // Default OG image component for all pages
    },
  },
```

- [ ] **Step 6: Commit**

```bash
git add nuxt.config.ts
git commit -m "chore: update ogImage config for nuxt-og-image v6

Remove ogImage.fonts (now handled by @nuxt/fonts with TTF source),
remove componentOptions (removed in v6),
remove defaults.renderer (auto-detected from installed packages).
Add TTF font source to @nuxt/fonts for Satori Serbian char support."
```

---

### Task 3: Rename OG image components with `.satori` suffix

**Files:**
- Rename: `app/components/OgImage/Main.vue` -> `app/components/OgImage/Main.satori.vue`
- Rename: `app/components/OgImage/Blog.vue` -> `app/components/OgImage/Blog.satori.vue`
- Rename: `app/components/OgImage/Pricing.vue` -> `app/components/OgImage/Pricing.satori.vue`
- Rename: `app/components/OgImage/Product.vue` -> `app/components/OgImage/Product.satori.vue`

nuxt-og-image v6 requires OG image component files to include a renderer suffix (`.satori.vue`, `.takumi.vue`, or `.browser.vue`) so it knows which renderer to use.

- [ ] **Step 1: Rename all 4 OG image components**

```bash
cd /Users/nikola/projects/konty-website
git mv app/components/OgImage/Main.vue app/components/OgImage/Main.satori.vue
git mv app/components/OgImage/Blog.vue app/components/OgImage/Blog.satori.vue
git mv app/components/OgImage/Pricing.vue app/components/OgImage/Pricing.satori.vue
git mv app/components/OgImage/Product.vue app/components/OgImage/Product.satori.vue
```

- [ ] **Step 2: Verify the renames**

```bash
ls app/components/OgImage/
```

Expected output:
```
Blog.satori.vue
Main.satori.vue
Pricing.satori.vue
Product.satori.vue
```

- [ ] **Step 3: Commit**

```bash
git add app/components/OgImage/
git commit -m "chore: rename OG image components with .satori suffix for v6"
```

---

### Task 4: Replace `defineOgImageComponent` with `defineOgImage` across all pages

**Files:**
- Modify: All 23 page files listed in the file map above

In nuxt-og-image v6, `defineOgImageComponent()` is replaced by `defineOgImage()`. The function signature is identical — same arguments, same behavior — it's purely a rename.

- [ ] **Step 1: Bulk replace using sed**

Run a single command to replace all occurrences across all `.vue` files:

```bash
cd /Users/nikola/projects/konty-website
grep -rl 'defineOgImageComponent' app/pages/ | xargs sed -i '' 's/defineOgImageComponent/defineOgImage/g'
```

- [ ] **Step 2: Verify the replacements**

```bash
grep -r 'defineOgImageComponent' app/pages/
```

Expected: No output (no remaining old usages).

```bash
grep -r 'defineOgImage(' app/pages/ | wc -l
```

Expected: `23` matches.

- [ ] **Step 3: Spot-check a few files**

Verify `app/pages/index.vue` line 30 now reads:
```typescript
defineOgImage('Main', {
```

Verify `app/pages/pricing.vue` line 24 now reads:
```typescript
defineOgImage('Pricing', {
```

Verify `app/pages/blog/[...slug].vue` line 252 now reads:
```typescript
defineOgImage('Blog', {
```

Verify `app/pages/products/retail/index.vue` line 30 now reads:
```typescript
defineOgImage('Product', {
```

- [ ] **Step 4: Commit**

```bash
git add app/pages/
git commit -m "chore: replace defineOgImageComponent with defineOgImage for v6"
```

---

### Task 5: Build and verify

**Files:**
- No file changes — this is a verification task

- [ ] **Step 1: Run the dev server**

```bash
pnpm dev
```

Expected: Server starts without errors. Watch the console for:
- No warnings about `ogImage.fonts` being an unknown config key
- No warnings about `ogImage.componentOptions` being an unknown config key
- No errors about missing OG image components
- Satori renderer is loaded (look for Satori-related log lines)

- [ ] **Step 2: Test OG image generation in the browser**

Visit the dev server at `http://localhost:3000` and navigate to the OG image debug endpoint. In v6, the URL pattern changed from `/__og-image__/` to `/_og/`. Try:

```
http://localhost:3000/_og/d/rs
```

Expected: A PNG image is returned showing the homepage OG image with the Konty logo, title text, and workspace background.

- [ ] **Step 3: Test Serbian character rendering**

Navigate to a page with Serbian text in the OG image:

```
http://localhost:3000/_og/d/rs/pricing
```

Expected: Serbian characters (like š, č, ž, đ, ć) render correctly in the OG image. If they appear as boxes or are missing, the TTF font is not being served to Satori — see Task 6 for the fallback fix.

- [ ] **Step 4: Test all 4 OG image component variants**

Test each component type to ensure they all render:

```
http://localhost:3000/_og/d/rs                          # Main component
http://localhost:3000/_og/d/rs/pricing                  # Pricing component
http://localhost:3000/_og/d/rs/products/retail           # Product component
http://localhost:3000/_og/d/rs/blog/<any-slug>          # Blog component
```

Expected: Each returns a properly rendered PNG with the correct template layout.

- [ ] **Step 5: Run the build**

```bash
pnpm build
```

Expected: Build completes successfully. The link checker runs at the end (it has `failOnError: true`). If it reports broken links at the old `/__og-image__/` paths, those are not real issues — the module's internal routing handles the new paths.

- [ ] **Step 6: Check the debug SEO page**

Navigate to the debug-seo page:

```
http://localhost:3000/rs/debug-seo
```

Check each tab:
- **Core Config**: `useSiteConfig()` still returns valid data
- **Schema.org**: Structured data renders correctly
- **OG Image**: Preview shows the correct image
- **Technical SEO**: Sitemap URL, robots config, canonical URL all correct

---

### Task 6 (Conditional): Fallback font fix if Serbian characters break

> **Only do this task if Step 3 of Task 5 revealed broken Serbian characters.** If Serbian chars render correctly, skip to Task 7.

**Files:**
- Modify: `nuxt.config.ts`

If `@nuxt/fonts` doesn't serve the TTF file to Satori (only woff2), we need to configure Satori's font options directly via the `satoriOptions` config key that v6 exposes.

- [ ] **Step 1: Add `satoriOptions` font config to `ogImage`**

Add a `satoriOptions` key to the `ogImage` block in `nuxt.config.ts`:

```typescript
  ogImage: {
    zeroRuntime: false,

    // Override Satori font resolution — serve TTF for Serbian character support
    satoriOptions: {
      fonts: [
        { name: 'Plus Jakarta Sans', weight: 400, style: 'normal', data: undefined, path: '/fonts/PlusJakartaSans-Variable.ttf' },
        { name: 'Plus Jakarta Sans', weight: 600, style: 'normal', data: undefined, path: '/fonts/PlusJakartaSans-Variable.ttf' },
        { name: 'Plus Jakarta Sans', weight: 700, style: 'normal', data: undefined, path: '/fonts/PlusJakartaSans-Variable.ttf' }
      ]
    },

    defaults: {
      extension: 'png',
      width: 1200,
      height: 630,
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7,
      component: 'Main'
    },
  },
```

**Note:** The exact API for `satoriOptions` may differ. Check `https://nuxtseo.com/docs/og-image/api/config` for the v6 font override syntax. If `satoriOptions.fonts` doesn't work, try the `satori.options.fonts` key or read the nuxt-og-image v6 source for the correct override path.

- [ ] **Step 2: Re-test Serbian characters**

```
http://localhost:3000/_og/d/rs/pricing
```

Expected: Serbian characters now render correctly.

- [ ] **Step 3: Commit if changes were made**

```bash
git add nuxt.config.ts
git commit -m "fix: add satoriOptions font override for Serbian character support"
```

---

### Task 7: Final verification and cleanup

**Files:**
- No file changes — verification only

- [ ] **Step 1: Run lint**

```bash
pnpm lint
```

Expected: No new lint errors introduced by the upgrade.

- [ ] **Step 2: Run typecheck**

```bash
pnpm typecheck
```

Expected: No new type errors. If `defineOgImageComponent` was previously typed by the module, `defineOgImage` should be typed the same way in v6. If typecheck fails on `defineOgImage` not being found, ensure `nuxt prepare` has been run to regenerate types:

```bash
pnpm postinstall
pnpm typecheck
```

- [ ] **Step 3: Full production build test**

```bash
pnpm build
```

Expected: Clean build with no errors. Link checker passes.

- [ ] **Step 4: Preview the production build**

```bash
pnpm preview
```

Navigate through key pages and verify:
- Homepage OG image works
- Blog post OG images work
- Pricing page OG image shows plans with correct currency
- Product pages show features in OG image
- Sitemap at `/sitemap_index.xml` generates correctly
- Robots.txt at `/robots.txt` is correct
- Schema.org structured data on pages (check via view-source or debug-seo page)

- [ ] **Step 5: Commit any final adjustments**

If any small fixes were needed during verification, commit them:

```bash
git add -A
git commit -m "fix: address post-upgrade issues from nuxt-seo v5 migration"
```

---

## Modules Requiring Zero Code Changes

These sub-modules have major version bumps but your codebase already uses compatible APIs:

| Module | Version Jump | Why No Changes Needed |
|--------|-------------|----------------------|
| `nuxt-site-config` v3->v4 | `site.name` is already explicitly set. No legacy `runtimeConfig.public.siteUrl/siteName/siteDescription` keys used. `useSiteConfig()` calls are client-side only. |
| `@nuxtjs/sitemap` v7->v8 | No `asSitemapCollection()` usage. `defineSitemapEventHandler()` in server API routes is unchanged. `_i18nTransform` still works. |
| `@nuxtjs/robots` v5->v6 | No `asRobotsCollection()` usage. Config format is unchanged. |
| `nuxt-schema-org` v5->v6 | No `asSchemaOrgCollection()` usage. `useSchemaOrg()`, `defineWebPage()`, `defineLocalBusiness()`, `defineBreadcrumb()` APIs are all unchanged. |
| `nuxt-link-checker` v4->v5 | No API changes — just a site-config v4 dependency update. |
| `nuxt-seo-utils` v7->v8 | No API changes — adds new optional composables. |

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Serbian characters break in OG images after font config change | Medium | High | Task 6 provides fallback `satoriOptions` font override. Test immediately in Task 5 Step 3. |
| `@resvg/resvg-wasm` doesn't work on Cloudflare Workers | Low | High | If it fails, try `@resvg/resvg-js` instead (works with Node.js-compatible Workers). Check Cloudflare Workers compatibility flag `nodejs_compat`. |
| Old `/__og-image__/` URLs cached in CDN or social platforms | Low | Low | Old URLs will 404 until caches expire. Social platforms re-fetch on share. No action needed unless you have hardcoded references (grep found none). |
| `useSiteConfig()` in `debug-seo.vue` or `blog/[...slug].vue` breaks | Low | Low | These are client-side calls. If they fail, the v4 API may require `useNuxtApp().$siteConfig` instead — check error message. |
