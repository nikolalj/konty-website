// app/plugins/resource-hints.client.ts
export default defineNuxtPlugin(() => {
  // Only run in production
  if (import.meta.dev) return

  // Implement Speculation Rules API for instant navigation
  if ('speculationrules' in HTMLScriptElement.supports) {
    const script = document.createElement('script')
    script.type = 'speculationrules'
    script.textContent = JSON.stringify({
      prerender: [
        {
          source: 'list',
          urls: ['/products', '/pricing', '/demo']
        }
      ],
      prefetch: [
        {
          source: 'document',
          where: {
            and: [
              { href_matches: '/*' },
              { not: { href_matches: '/admin/*' }},
              { not: { href_matches: '/api/*' }}
            ]
          },
          eagerness: 'moderate'
        }
      ]
    })
    document.head.appendChild(script)
  }

  // Implement Priority Hints for critical resources
  const setCriticalResourceHints = () => {
    // Mark hero images as high priority
    document.querySelectorAll('img[data-hero]').forEach(img => {
      img.setAttribute('fetchpriority', 'high')
      img.setAttribute('decoding', 'async')
    })

    // Mark below-fold images as low priority
    document.querySelectorAll('img:not([data-hero])').forEach(img => {
      if (!img.hasAttribute('fetchpriority')) {
        img.setAttribute('fetchpriority', 'low')
        img.setAttribute('decoding', 'async')
        img.setAttribute('loading', 'lazy')
      }
    })
  }

  // Run on initial load
  if (document.readyState === 'complete') {
    setCriticalResourceHints()
  } else {
    window.addEventListener('load', setCriticalResourceHints)
  }

  // Run on route changes
  const router = useRouter()
  router.afterEach(() => {
    setTimeout(setCriticalResourceHints, 100)
  })
})
