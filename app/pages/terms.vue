<template>
  <div class="px-6 py-12 bg-white min-h-screen">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

    <div class="prose prose-lg max-w-none">
      <p class="text-gray-600 mb-8">
        <strong>Last updated:</strong> {{ new Date().toLocaleDateString() }}
      </p>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
        <p class="text-gray-700 mb-4">
          By accessing and using Konty's point-of-sale software and services ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
        <p class="text-gray-700 mb-4">
          Konty provides cloud-based point-of-sale software solutions for retail and hospitality businesses. Our Service includes inventory management, sales processing, customer management, and reporting tools accessible through web and mobile applications.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
        <p class="text-gray-700 mb-4">
          To use our Service, you must create an account and provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
        </p>
        <ul class="list-disc pl-6 text-gray-700 mb-4">
          <li>You must be at least 18 years old to create an account</li>
          <li>You must provide accurate business and contact information</li>
          <li>You are responsible for keeping your account information up to date</li>
          <li>You must not share your account credentials with unauthorized persons</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use</h2>
        <p class="text-gray-700 mb-4">
          You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
        </p>
        <ul class="list-disc pl-6 text-gray-700 mb-4">
          <li>Use the Service for any illegal or unauthorized purpose</li>
          <li>Violate any applicable laws or regulations</li>
          <li>Interfere with or disrupt the Service or servers</li>
          <li>Attempt to gain unauthorized access to any part of the Service</li>
          <li>Upload or transmit malicious code or content</li>
          <li>Impersonate any person or entity</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. Payment and Billing</h2>
        <p class="text-gray-700 mb-4">
          Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We reserve the right to modify our pricing with 30 days' notice.
        </p>
        <ul class="list-disc pl-6 text-gray-700 mb-4">
          <li>Payment is due upon subscription activation</li>
          <li>Late payments may result in service suspension</li>
          <li>Price changes require 30 days' advance notice</li>
          <li>Cancellation takes effect at the end of the current billing period</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibent text-gray-900 mb-4">6. Data and Privacy</h2>
        <p class="text-gray-700 mb-4">
          We take the privacy and security of your data seriously. Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
        </p>
        <ul class="list-disc pl-6 text-gray-700 mb-4">
          <li>You retain ownership of your business data</li>
          <li>We implement industry-standard security measures</li>
          <li>We do not sell your personal information to third parties</li>
          <li>Data backups are performed regularly for service continuity</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
        <p class="text-gray-700 mb-4">
          The Service and its original content, features, and functionality are owned by Konty and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">8. Service Availability</h2>
        <p class="text-gray-700 mb-4">
          While we strive to maintain high service availability, we do not guarantee uninterrupted access to the Service. We may perform maintenance that temporarily affects service availability, and we will provide reasonable notice when possible.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
        <p class="text-gray-700 mb-4">
          In no event shall Konty be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
        <p class="text-gray-700 mb-4">
          We may terminate or suspend your account and access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
        <p class="text-gray-700 mb-4">
          We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
        <p class="text-gray-700 mb-4">
          If you have any questions about these Terms of Service, please contact us at:
        </p>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-700">
            <strong>Email:</strong> legal@konty.com<br>
            <strong>Address:</strong> [Your Business Address]<br>
            <strong>Phone:</strong> [Your Phone Number]
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Use the new simplified SEO composable
usePageSeo({
  title: t('seo.terms.title'),
  description: t('seo.terms.description'),
  type: 'website'
})
</script>
