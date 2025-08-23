const config = {
  name: 'konty-website',
  script: '/home/forge/konty.com/current/.output/server/index.mjs',
  cwd: '/home/forge/konty.com/current',
  exec_mode: 'cluster',
  instances: 'max',  // Use all available CPU cores
  autorestart: true,
  watch: false,
  max_memory_restart: '1G',
  env: {
    NODE_ENV: 'productionn',
    NUXT_PUBLIC_SITE_URL: 'https://konty.com',
    PORT: 3002
  }
}

module.exports = {
  apps: [config]
}
