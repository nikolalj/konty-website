// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: [
      '.wrangler/**',
      '.wrangler',
      'wrangler/**',
      '**/*.md',
      '**/*.satori.vue', // Satori OG image components use XHTML-style self-closing tags
    ]
  }
)
