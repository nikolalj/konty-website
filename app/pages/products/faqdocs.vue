<template>
  <div class="mt-24">
    <LazySharedFAQ heading-level="h1" hydrate-on-visible>
      <div class="mt-12 inline-flex items-center gap-2 px-4 py-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
        <UIcon name="i-lucide-file-text" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <p class="text-base text-gray-700 dark:text-gray-300">
          {{ t('pages.products.download.hero.docsLink') }}
          <a href="https://docs.konty.com" target="_blank" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-semibold cursor-pointer">
            {{ t('pages.products.download.hero.docsLinkText') }}
          </a>
        </p>
      </div>
    </LazySharedFAQ>

     <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('seo.products.faqdocs.title'),
  description: t('seo.products.faqdocs.description')
})
</script>
