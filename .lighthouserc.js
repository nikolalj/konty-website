module.exports = {
  ci: {
    // Basic configuration
    collect: {
      staticDistDir: './.output/public',
      url: [
        'http://localhost/index.html',
        'http://localhost/products/index.html',
        'http://localhost/konty-retail/index.html',
        'http://localhost/konty-hospitality/index.html',
        'http://localhost/pricing/index.html',
        'http://localhost/about/index.html'
      ],
      settings: {
        // Lighthouse settings
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      }
    },
    
    // Performance budgets
    assert: {
      assertions: {
        // Core Web Vitals thresholds
        'categories:performance': ['error', {minScore: 0.85}],
        'categories:accessibility': ['error', {minScore: 0.90}],
        'categories:best-practices': ['error', {minScore: 0.90}],
        'categories:seo': ['error', {minScore: 0.95}],
        
        // Specific metrics
        'metrics:first-contentful-paint': ['error', {maxNumericValue: 2000}],
        'metrics:largest-contentful-paint': ['error', {maxNumericValue: 2500}],
        'metrics:cumulative-layout-shift': ['error', {maxNumericValue: 0.1}],
        'metrics:total-blocking-time': ['error', {maxNumericValue: 300}],
        
        // Resource budgets
        'resource-summary:document:size': ['error', {maxNumericValue: 50000}], // 50KB
        'resource-summary:script:size': ['error', {maxNumericValue: 500000}], // 500KB
        'resource-summary:stylesheet:size': ['error', {maxNumericValue: 150000}], // 150KB
        'resource-summary:image:size': ['error', {maxNumericValue: 1000000}], // 1MB
        'resource-summary:total:size': ['error', {maxNumericValue: 2000000}], // 2MB
        
        // Network requests
        'resource-summary:total:count': ['error', {maxNumericValue: 50}],
        
        // Unused resources
        'unused-css-rules': ['warn', {maxLength: 2}],
        'unused-javascript': ['warn', {maxLength: 2}]
      }
    },
    
    // Upload configuration (optional - for GitHub integration)
    upload: {
      target: 'temporary-public-storage'
    }
  }
}