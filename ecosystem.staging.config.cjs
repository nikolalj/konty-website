const config = {
  name: 'konty-website-staging',
  script: '/home/forge/staging.konty.com/current/.output/server/index.mjs',
  cwd: '/home/forge/staging.konty.com/current',
  exec_mode: 'cluster',
  instances: 'max',  // Use all available CPU cores
  autorestart: true,
  watch: false,
  max_memory_restart: '1G',
  env: {
    NODE_ENV: 'staging',
    NUXT_PUBLIC_SITE_URL: 'https://staging.konty.com',
    PORT: 3002
  }
}

module.exports = {
  apps: [config]
}
