I need you to act as a professional senior Vue developer with expertise in Nuxt.js v4, Vue.js v3, and Nuxt UI, combined with strong knowledge in digital sales, marketing, SEO optimization, and high-converting SaaS websites (specifically for POS products).

The product is a POS app called Konty, and the website will be its primary sales channel.

The main objectives are:
- Maximize search rankings and domain authority
- Increase visitor engagement and lead generation
- Boost sales conversions

Your task:

1. Research and Preparation
- Review Nuxt 4 documentation, 2025 best practices for high-converting websites, and modern SEO guidelines.
- Focus only on technical aspects, ignoring actual content (text/images).

2. Code Review
- Analyze my current codebase in detail.
- For each area, explain:
    What is good and should be kept
    What is problematic or inefficient
    What needs to be improved or replaced
- Prioritize minimal, clean, and maintainable code.

3. Improvement Plan
- Create a phased roadmap for implementing improvements.
- Only suggest changes that bring impact — avoid marginal gains with low ROI.
- Ensure all suggestions contribute to speed, SEO performance, accessibility, user experience, and conversion optimization.

The final deliverable should be a clear, actionable, step-by-step improvement plan backed by reasoning and best practices.







Before integrating any external theme (e.g., from https://themeforest.net/item/martex-software-saas-startup-landing-page-wordpress-theme/47441503), I want to set up the complete scaffolding: create all necessary placeholder pages and components (must be empty with just one placeholder element!) and configurations. Bare in mind that the main requirement is to optimize everything for performance, SEO, accessibility, and marketing/sales effectiveness based on the strategy and other docs.

Instructions:

- Install necessary dependencies that are not already present (only if needed).
- Set up layouts: Create a default layout including TopBar, Header, AlertBar, main content slot, and Footer. Use NuxtUI where it is appropriate.
- Implement routing.
- Create components as specified below: Categorize as Regular (page-specific), Shared (reusable across pages), or Merged (reusable with a 'product' prop: 'kontyRetail' or 'kontyHospitality' to toggle content/display).
- Use TypeScript for all code.

Website Structure (Global Elements):

TopBar: to show Contact email/phone.
Header: Menu links to Products, Restaurants (KontyHospitality), Retail (KontyRetail), Pricing, About. CTA: "Free Demo" button linking to a demo form.
AlertBar: Narrow sticky bar for announcements.
Footer: Shared across all pages, with links, social icons, copyright, privacy policy.

Page Structure:

4.1. Homepage
- Hero (Regular)
- ClientList (Shared, Merged)
- Features (Regular)
- Statistics (Shared, Merged)
- Testimonials (Shared, Merged)
- GetStarted (Shared, Merged)
- Pricing (Shared, Merged)
- ContactForm (Shared)
- BlogPosts (Regular)
- Footer (Shared)

4.2. Products
- ProductsHeadline (Regular)
- ProductFeatures (Shared, Merged)
- ContactForm (Shared)
- Footer (Shared)

4.3. KontyHospitality
- Headline (Regular)
- ClientList (Shared, Merged)
- Benefits (Shared, Merged)
- Features (Regular)
- Pricing (Shared, Merged)
- GetStarted (Shared, Merged)
- ContactForm (Shared)
- Footer (Shared)

4.4. KontyRetail
- Headline (Regular)
- ClientList (Shared, Merged)
- Benefits (Shared, Merged)
- Features (Regular)
- Pricing (Shared, Merged)
- GetStarted (Shared, Merged)
- ContactForm (Shared)
- Footer (Shared)

4.5 About
- Headline (Regular)
- ClientList (Shared, Merged)
- ContactInfo (Regular)
- ContactForm (Shared)
- Footer (Shared)

I'll provide a document outlining the full digital strategy (including website structure, SEO best practices, marketing integrations, and sales funnels). Part of it focuses on website creation. Additionally, I'll provide technical documentation (in Croatian) from a "documentation" directory, which details specific features, integrations, and requirements for the site.

Think step-by-step: First, reason about the docs content (summarize key points in your response). Then, generate the project structure (directories/files). Finally, output code for setup, configs, layouts, pages, and components. If anything is unclear, ask for
clarification, but aim to complete as much as possible.
Once done, suggest next steps like integrating the theme etc.

Additional info:
Previously there were 2 apps Aria POS for Hospitality (https://ariapos.rs) and Allegra POS for Retail (https://allegrapos.rs). These 2 apps are now being merged into one Konty. Konty already has its website (https://konty.com) but that website is temporary and we are now
changing it with this new one. There is also a user guide website (https://docs.konty.com) which is not subject to change in this process (just giving you additional context).
