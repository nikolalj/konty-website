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
    APP_ENV: 'production',
    PORT: 3002
  }
}

module.exports = {
  apps: [config]
}
