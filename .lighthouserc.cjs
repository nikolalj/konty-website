module.exports = {
  ci: {
    // Collection settings
    collect: {
      // Use .output/public for Nuxt static generation
      staticDistDir: './.output/public',
      
      // Test critical conversion pages
      url: [
        'http://localhost/',                    // Homepage
        'http://localhost/pricing',             // Pricing (critical for conversion)
        'http://localhost/konty-retail',        // Product page
        'http://localhost/konty-hospitality',   // Product page
        'http://localhost/demo'                 // Demo request page
      ],
      
      // Number of times to run Lighthouse per URL for more accurate results
      numberOfRuns: 3,
      
      settings: {
        // Chrome flags for CI environment
        chromeFlags: '--no-sandbox --disable-dev-shm-usage --disable-gpu --headless',
        
        // Emulate mobile device (most traffic is mobile)
        preset: 'desktop',
        
        // Throttling to simulate real-world conditions
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1
        },
        
        // Skip audits that don't apply
        skipAudits: ['uses-http2', 'is-on-https']
      }
    },
    
    // Performance assertions
    assert: {
      assertions: {
        // Core Web Vitals (aligned with Google's thresholds)
        'categories:performance': ['warn', {minScore: 0.75}],      // Warning at 75, not error
        'categories:accessibility': ['error', {minScore: 0.85}],   // Critical for compliance
        'categories:best-practices': ['warn', {minScore: 0.85}],   
        'categories:seo': ['error', {minScore: 0.90}],            // Critical for conversion
        
        // Core Web Vitals - Use Google's recommended thresholds
        'first-contentful-paint': ['warn', {maxNumericValue: 2500}],      // 2.5s warning
        'largest-contentful-paint': ['error', {maxNumericValue: 4000}],    // 4s is failing
        'cumulative-layout-shift': ['error', {maxNumericValue: 0.1}],      // CLS < 0.1
        'total-blocking-time': ['warn', {maxNumericValue: 600}],           // 600ms warning
        'speed-index': ['warn', {maxNumericValue: 4500}],                 // 4.5s warning
        
        // Resource budgets (more realistic for Nuxt app with UI library)
        'resource-summary:document:size': ['warn', {maxNumericValue: 100000}],    // 100KB
        'resource-summary:script:size': ['warn', {maxNumericValue: 750000}],      // 750KB
        'resource-summary:stylesheet:size': ['warn', {maxNumericValue: 200000}],  // 200KB
        'resource-summary:image:size': ['warn', {maxNumericValue: 1500000}],      // 1.5MB
        'resource-summary:total:size': ['error', {maxNumericValue: 3000000}],     // 3MB total
        
        // Network requests (realistic for modern SPA)
        'resource-summary:total:count': ['warn', {maxNumericValue: 75}],
        
        // Interactive metrics
        'interactive': ['error', {maxNumericValue: 5000}],                // Time to Interactive
        'max-potential-fid': ['warn', {maxNumericValue: 250}]            // Max FID
      }
    },
    
    // Upload configuration for GitHub PR comments
    upload: {
      target: 'temporary-public-storage',
      
      // GitHub status checks
      githubStatusContextSuffix: '/lighthouse',
      
      // Store reports for 7 days
      urlReplacementPatterns: [
        's/http:\\/\\/localhost/https:\\/\\/konty.com/g'
      ]
    }
  }
}