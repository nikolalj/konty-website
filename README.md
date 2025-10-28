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

**Required variables:**

- `CALENDLY_API_TOKEN` - Your Calendly Personal Access Token for API integration

**Getting your Calendly API Token:**

1. Log in to your Calendly account
2. Go to [Integrations & Apps](https://calendly.com/integrations/api_webhooks)
3. Navigate to "API & Webhooks"
4. Click "Generate New Token"
5. Copy the token and add it to your `.env` file

Example:

```
CALENDLY_API_TOKEN=your-personal-access-token-here
```

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
