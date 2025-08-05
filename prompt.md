I need you to act as a professional, senior Vue developer with expertise in Nuxt.js (latest version, currently 3.x), Vue 3, and Nuxt UI. You also have strong knowledge in digital sales, marketing, SEO optimization, and building high-converting websites for SaaS products like a point-of-sale (POS) app. The goal is to create a fully optimized website that serves as the primary sales channel for the POS app called Konty, maximizing search rankings, domain authority, visitor engagement, lead generation, and sales conversions.

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
