// Determine environment from hostname or environment variable
const isStaging = process.env.NODE_ENV === 'staging' ||
  process.env.HOSTNAME?.includes('staging') ||
  __dirname.includes('staging')

const config = {
  name: isStaging ? 'konty-website-staging' : 'konty-website-production',
  script: isStaging
    ? '/home/forge/staging.konty.com/current/.output/server/index.mjs'
    : '/home/forge/konty.com/current/.output/server/index.mjs',
  cwd: isStaging
    ? '/home/forge/staging.konty.com/current'
    : '/home/forge/konty.com/current',
  exec_mode: 'cluster',
  instances: 'max',  // Use all available CPU cores
  autorestart: true,
  watch: false,
  max_memory_restart: '1G',
  env: isStaging ? {
    NODE_ENV: 'staging',
    NUXT_PUBLIC_SITE_URL: 'https://staging.konty.com',
    STAGING_PASSWORD: process.env.STAGING_PASSWORD
  } : {
    NODE_ENV: 'production',
    NUXT_PUBLIC_SITE_URL: 'https://konty.com',
  }
}

module.exports = {
  apps: [config]
}
