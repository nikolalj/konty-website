<template>
  <div class="px-6 py-12 mt-24 bg-white min-h-screen">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Account Deletion</h1>

    <div class="prose prose-lg max-w-none">
      <p class="text-gray-600 mb-8">
        <strong>Last updated:</strong> December 12, 2025
      </p>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          1. How to Delete Your Account
        </h2>
        <p class="text-gray-700 mb-4">
          If you wish to delete your Konty account and all associated data, you
          can do so through the following methods:
        </p>

        <h3 class="text-xl font-semibold text-gray-800 mb-3">
          Option 1: In-App Deletion
        </h3>
        <p class="text-gray-700 mb-4">
          You can delete your account directly from the Konty application:
        </p>
        <ol class="list-decimal pl-6 text-gray-700 mb-4">
          <li>Open the Konty app and log in to your account</li>
          <li>Go to Settings</li>
          <li>Select "Account"</li>
          <li>Tap "Delete Account"</li>
          <li>Confirm your decision when prompted</li>
        </ol>

        <h3 class="text-xl font-semibold text-gray-800 mb-3">
          Option 2: Email Request
        </h3>
        <p class="text-gray-700 mb-4">
          You can request account deletion by sending an email to our support
          team:
        </p>
        <ul class="list-disc pl-6 text-gray-700 mb-4">
          <li>
            Send an email to
            <a :href="`mailto:${t('data.company.contact.email')}@konty.com`" class="text-primary-600 underline"
              >{{ t('data.company.contact.email') }}@konty.com</a
            >
          </li>
          <li>
            Include "Account Deletion Request" in the subject line
          </li>
          <li>
            Provide the email address associated with your Konty account
          </li>
          <li>We will process your request within 30 days</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          2. What Data Will Be Deleted
        </h2>
        <p class="text-gray-700 mb-4">
          When you delete your account, the following data will be permanently
          removed:
        </p>
        <ul class="list-disc pl-6 text-gray-700 mb-4">
          <li>Your account profile and login credentials</li>
          <li>Business information and settings</li>
          <li>Product catalog and inventory data</li>
          <li>Customer records and contact information</li>
          <li>Sales history and transaction records</li>
          <li>Reports and analytics data</li>
          <li>Any uploaded images or documents</li>
          <li>User preferences and customizations</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          3. Data Retention After Deletion
        </h2>
        <p class="text-gray-700 mb-4">
          Please note that some data may be retained for a limited period after
          account deletion:
        </p>
        <ul class="list-disc pl-6 text-gray-700 mb-4">
          <li>
            <strong>Legal compliance:</strong> We may retain certain records as
            required by tax laws, fiscal regulations, or other legal obligations
            (typically for 5-10 years depending on jurisdiction)
          </li>
          <li>
            <strong>Backup systems:</strong> Data in backup systems may take up
            to 90 days to be fully purged
          </li>
          <li>
            <strong>Anonymized data:</strong> Aggregated, anonymized statistics
            that cannot identify you may be retained for analytics purposes
          </li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          4. Before You Delete
        </h2>
        <p class="text-gray-700 mb-4">
          We recommend taking the following steps before deleting your account:
        </p>
        <ul class="list-disc pl-6 text-gray-700 mb-4">
          <li>
            <strong>Export your data:</strong> Download any reports, sales
            history, or other data you may need for your records
          </li>
          <li>
            <strong>Cancel active subscriptions:</strong> Ensure any active
            subscriptions are canceled to avoid future charges
          </li>
          <li>
            <strong>Settle outstanding balances:</strong> Pay any outstanding
            invoices or fees
          </li>
          <li>
            <strong>Inform your team:</strong> If you have multiple users,
            notify them before deletion
          </li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          5. Account Deletion Timeline
        </h2>
        <p class="text-gray-700 mb-4">
          Once you initiate account deletion:
        </p>
        <ul class="list-disc pl-6 text-gray-700 mb-4">
          <li>
            <strong>Immediate:</strong> Your account will be deactivated and you
            will be logged out
          </li>
          <li>
            <strong>Within 30 days:</strong> All personal data will be deleted
            from our active systems
          </li>
          <li>
            <strong>Within 90 days:</strong> Data will be removed from backup
            systems
          </li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          6. Reactivation
        </h2>
        <p class="text-gray-700 mb-4">
          Account deletion is permanent and cannot be undone. If you wish to use
          Konty again after deleting your account, you will need to create a new
          account. Your previous data cannot be recovered.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          7. Contact Us
        </h2>
        <p class="text-gray-700 mb-4">
          If you have any questions about account deletion or need assistance,
          please contact us:
        </p>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-700">
            <strong>Email:</strong> {{ t('data.company.contact.email') }}@konty.com<br>
            <strong>Address:</strong> {{ t('data.company.address.street') }}, {{ t('data.company.address.postalCode') }} {{ t('data.company.address.city') }}, {{ t('data.company.address.country') }}<br>
            <strong>Phone:</strong> {{ t('data.company.contact.phone') }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('seo.accountDelete.title'),
  description: t('seo.accountDelete.description')
})
</script>
