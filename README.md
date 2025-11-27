# Nuxt UI Starter

Look at [Nuxt docs](https://nuxt.com/docs/getting-started/introduction) and [Nuxt UI docs](https://ui.nuxt.com) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Environment Variables

Copy `.env.example` to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

**Key variables:**

- `APP_ENV` / `NUXT_PUBLIC_SITE_URL` — control runtime environment and canonical URLs
- `GTM_ID` / `LHCI_GITHUB_APP_TOKEN` — analytics + Lighthouse automation
- `USE_CLOUDFLARE_DEV` — opt-in Cloudflare dev preset
- `HUBSPOT_ACCESS_TOKEN`, `HUBSPOT_CLIENT_ID`, `HUBSPOT_MEETING_LINK_SLUG` — HubSpot CRM + scheduling integration

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
