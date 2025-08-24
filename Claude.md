# Claude Code Instructions for Konty POS Website

## Project Context
You are building a website for Konty, a modern Point of Sale (POS) application. This website is the primary sales channel for converting visitors into paying customers. Every decision you make should optimize for conversion rate and customer acquisition.

Read all files in context directory file for information about Konty and this project.

## Core Business Understanding
- **Product**: Konty is a cloud-based POS system for restaurants, retail, and service businesses
- **Target Audience**: Small to medium business owners who want to modernize their operations
- **Primary Goal**: Convert website visitors into trial users, then into paying subscribers
- **Key Differentiators**: No hardware lock-in, fast setup, transparent pricing, modern interface
- **Pricing Model**: Monthly SaaS subscription with tiered pricing based on business size

## Critical Development Guidelines

### Conversion-Focused Implementation
- Place primary CTA ("Start Free Trial" or "Book a Demo") prominently above the fold
- Use contrasting colors for all CTAs (high visibility against background)
- Implement sticky header with CTA that appears on scroll
- Add multiple CTAs throughout long pages at natural decision points
- Create urgency with real-time elements (e.g., "X businesses joined today")
- Show social proof near every major CTA (testimonials, customer count, ratings)
- Minimize form fields - ask only for essential information
- Use multi-step forms with progress indicators for longer processes
- Add trust badges (security, compliance, guarantees) near signup areas

### Performance Requirements
- Optimize for sub-3-second page load (impacts conversion directly)
- Implement lazy loading for images and below-fold content
- Minimize JavaScript blocking - use async/defer
- Optimize images (WebP and AVIF format, appropriate sizing, compression)
- Use CDN for all static assets
- Implement caching strategies
- Ensure Time to Interactive is under 5 seconds
- Mobile performance is critical - most business owners browse on phones

### Mobile-First Approach
- Design for mobile screens first, then scale up
- Touch targets minimum 44x44px
- Simplify navigation for mobile (hamburger menu, simplified options)
- Optimize forms for mobile input (appropriate input types, auto-complete)
- Test on real devices, not just browser emulation
- Consider thumb reach zones for important interactive elements
- Implement swipe gestures where appropriate
- Ensure text is readable without zooming

## Essential Website Sections

### Hero Section
Must include:
- Clear headline that states the primary benefit (not features)
- Subheadline addressing main pain point
- Primary CTA button (high contrast, action-oriented text)
- Visual showing product in use (screenshot, video, or animation)
- Trust indicators (customer count, rating, security badges)

### Features/Benefits Section
- Lead with benefits, support with features
- Use icons and visuals for quick scanning
- Group related features logically
- Include "Learn More" expandables to avoid overwhelming
- Show feature in context (screenshots, mini-demos)
- Connect each feature to business value

### Pricing Section
- Display pricing clearly without hiding information
- Highlight most popular tier
- Show what's included in each tier
- Include free trial messaging

### Social Proof Section
- Customer testimonials with names, businesses, and photos
- Case studies with specific metrics (revenue increase, time saved)
- Customer logos (recognizable brands if available)
- Success stories relevant to different industries

### Demo/Trial Section
- Clear path to start trial or book a demo
- Specify trial length and what's included
- No credit card required
- Show how quick setup is ("Get started in 5 minutes")
- Include self-serve demo option
- Provide demo booking calendar for high-touch sales

## Technical Implementation Notes

### SEO Essentials
- Implement proper heading hierarchy (H1, H2, H3)
- Include meta descriptions for all pages
- Use semantic HTML structure
- Implement schema markup for SaaS/Local Business
- Create clean URL structure
- Ensure fast page load (SEO ranking factor)
- Make site mobile-friendly (mobile-first indexing)
- Include alt text for all images

### Analytics Setup
- Implement Google Analytics 4 or similar
- Track conversions (trial starts, demo requests, pricing views)
- Set up event tracking for key interactions
- Monitor form abandonment
- Track scroll depth on key pages
- Implement heatmap tracking (Hotjar or similar)
- Set up A/B testing framework

### Forms and Data Capture
- Minimize required fields
- Use smart defaults where possible
- Implement inline validation with helpful error messages
- Save form progress (if user returns)
- Send confirmation emails immediately
- Follow up abandoned forms via email

## Content Guidelines

### Copywriting Principles
- Use clear, simple language (avoid jargon)
- Focus on benefits over features
- Address pain points before presenting solutions
- Use active voice and action-oriented language
- Include specific numbers and metrics where possible
- Write scannable content (bullets, short paragraphs, bold key points)
- Use "you" language to speak directly to visitor
- Include clear value propositions throughout

### Visual Design Principles
- Maintain consistent brand colors and fonts
- Use high-quality product screenshots
- Include actual product UI, not just stock photos
- Show product in context of use
- Use white space to avoid overwhelming visitors
- Ensure strong visual hierarchy
- Make interactive elements obviously clickable
- Use micro-animations to guide attention

## Conversion Optimization Checklist

### Must-Have Elements
- [ ] Clear value proposition within 5 seconds
- [ ] Prominent CTAs above and below fold
- [ ] Trust badges and security indicators
- [ ] Customer testimonials and social proof
- [ ] Easy-to-find pricing information
- [ ] Simple trial/demo signup process
- [ ] Mobile-responsive design
- [ ] Fast page load speed
- [ ] Live chat or support option
- [ ] Clear navigation structure

### Psychological Triggers to Implement
- **Urgency**: Limited-time offers, countdown timers
- **Scarcity**: Limited spots, exclusive access
- **Social Proof**: Customer counts, testimonials, reviews
- **Authority**: Industry certifications, expert endorsements
- **Reciprocity**: Free tools, guides, or trials
- **Consistency**: Small commitments leading to larger ones

## Common POS Website Patterns to Follow

### Industry Expectations
- Comparison with competitors (feature matrix)
- Industry-specific landing pages (restaurant, retail, etc.)
- Hardware compatibility information
- Integration marketplace or partner apps
- Migration/switching guides
- ROI calculator or savings estimator
- Resource center (guides, videos, webinars)

## Error Prevention

### Common Mistakes to Avoid
- Don't hide pricing - transparency builds trust
- Don't use generic stock photos - show actual product
- Don't make visitors hunt for CTAs
- Don't use vague headlines - be specific about benefits
- Don't neglect mobile experience
- Don't create long forms without progress indicators
- Don't forget to follow up on abandoned trials
- Don't use technical jargon without explanation
- Don't make assumptions about visitor knowledge
- Don't forget loading states and error handling

## Testing and Iteration

### Elements to A/B Test
- Headlines and value propositions
- CTA button text, color, and placement
- Pricing presentation and structure
- Form field requirements
- Trust badge placement
- Hero images or videos
- Navigation structure
- Pop-up timing and offers

### Key Metrics to Monitor
- Conversion rate (visitor to trial)
- Bounce rate by page and source
- Time on page for key sections
- Form completion rates
- Click-through rates on CTAs
- Trial to paid conversion
- Customer acquisition cost (CAC)
- Lifetime value (LTV)

## Remember
When in doubt, always choose the option that makes it easier for a visitor to understand the value and sign up for Konty. Remove friction, build trust, and guide visitors toward conversion. The website's success is measured by how many visitors become paying customers, not by how impressive the design is.
