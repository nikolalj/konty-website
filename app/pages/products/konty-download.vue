<template>
  <section class="pt-28 sm:pt-34 pb-16 bg-[var(--bg-200)] dark:bg-[var(--bg-200)]">
    <UContainer class="flex flex-col lg:grid gap-y-16 gap-12 lg:grid-cols-2 lg:items-center">
      <!-- Left column: Text content -->
      <div>
        <h1 class="text-5xl sm:text-6xl text-pretty tracking-tight font-bold text-highlighted">
          {{ t('pages.products.download.hero.title') }}
        </h1>

        <p class="text-xl font-semibold text-primary mt-4">
          {{ t('pages.products.download.hero.subtitle') }}
        </p>

        <p class="text-lg text-muted text-pretty mt-6">
          {{ t('pages.products.download.hero.description') }}
        </p>

        <!-- Documentation link - hidden on mobile, shown on desktop -->
        <div class="mt-8 hidden lg:block">
          <div class="inline-flex items-center gap-2 px-4 py-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <p class="text-base text-gray-700 dark:text-gray-300">
              {{ t('pages.products.download.hero.docsLink') }}
              <a href="/docs" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-semibold">
                {{ t('pages.products.download.hero.docsLinkText') }}
              </a>
            </p>
          </div>
        </div>
      </div>

      <!-- Right column: All Downloads -->
      <div class="space-y-6">
        <!-- Production Downloads -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-highlighted">{{ items.production.title }}</h3>
          <div class="grid grid-cols-4 gap-3">
            <a
              v-for="option in items.production.options"
              :key="option.title"
              :href="option.link"
              target="_blank"
              class="flex flex-col items-center justify-center p-6 rounded-lg bg-white dark:bg-[var(--bg-300)] hover:bg-gray-100 dark:hover:bg-[var(--bg-400)] ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <UIcon :name="option.icon" class="w-12 h-12 text-primary mb-3" />
              <span class="text-sm font-medium">{{ option.title }}</span>
            </a>
          </div>
        </div>

        <!-- Demo Downloads -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-highlighted">{{ items.demo.title }}</h3>
          <div class="grid grid-cols-4 gap-3">
            <a
              v-for="option in items.demo.options"
              :key="option.title"
              :href="option.link"
              target="_blank"
              class="flex flex-col items-center justify-center p-6 rounded-lg bg-white dark:bg-[var(--bg-300)] hover:bg-gray-100 dark:hover:bg-[var(--bg-400)] ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <UIcon :name="option.icon" class="w-12 h-12 text-gray-500 mb-3" />
              <span class="text-sm font-medium">{{ option.title }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Documentation link - shown on mobile only, after downloads -->
      <div class="lg:hidden">
        <div class="inline-flex items-center gap-2 px-4 py-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <p class="text-base text-gray-700 dark:text-gray-300">
            {{ t('pages.products.download.hero.docsLink') }}
            <a href="/docs" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-semibold">
              {{ t('pages.products.download.hero.docsLinkText') }}
            </a>
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const items = ref({
  production: {
    title: t('pages.products.download.sections.production.title'),
    options: [
      {
        title: t('pages.products.download.sections.production.web'),
        icon: 'i-heroicons-globe-alt',
        link: 'https://app.konty.app'
      },
      {
        title: t('pages.products.download.sections.production.windows'),
        icon: 'i-simple-icons-windows',
        link: 'https://downloads.konty.app/windows/konty-setup.exe'
      },
      {
        title: t('pages.products.download.sections.production.android'),
        icon: 'i-simple-icons-android',
        link: 'https://downloads.konty.app/android/konty.apk'
      },
      {
        title: t('pages.products.download.sections.production.macos'),
        icon: 'i-simple-icons-apple',
        link: 'https://downloads.konty.app/macos/konty.dmg'
      }
    ]
  },
  demo: {
    title: t('pages.products.download.sections.demo.title'),
    options: [
      {
        title: t('pages.products.download.sections.demo.web'),
        icon: 'i-heroicons-globe-alt',
        link: 'https://demo.konty.app'
      },
      {
        title: t('pages.products.download.sections.demo.windows'),
        icon: 'i-simple-icons-windows',
        link: 'https://downloads.konty.app/demo/windows/konty-demo-setup.exe'
      },
      {
        title: t('pages.products.download.sections.demo.android'),
        icon: 'i-simple-icons-android',
        link: 'https://downloads.konty.app/demo/android/konty-demo.apk'
      },
      {
        title: t('pages.products.download.sections.demo.macos'),
        icon: 'i-simple-icons-apple',
        link: 'https://downloads.konty.app/demo/macos/konty-demo.dmg'
      }
    ]
  }
})

useSeoMeta({
  title: 'Download Konty - Everywhere you need it!',
  description: 'Whether you prefer the convenience of web-based access, the familiarity of Windows applications, the mobility of Android devices, or the reliability of MacOS, our software is adaptable to your preferred operating system.',
})
</script>
