<template>
  <div class="mt-24">
    <LazySharedFAQ heading-level="h1" hydrate-on-visible />

    <UContainer class="flex justify-center">
      <UIAppear>
        <div class="inline-flex items-center gap-2 px-4 py-3 bg-primary-500/10 rounded-lg border border-primary-200">
          <UIcon name="i-lucide-file-text" class="w-5 h-5 text-primary" />
          <p class="text-base text-gray-700 dark:text-gray-300">
            {{ t('pages.products.download.hero.docsLink') }}
            <a href="https://docs.konty.com" target="_blank" class="text-primary underline font-semibold cursor-pointer">
              {{ t('pages.products.download.hero.docsLinkText') }}
            </a>
          </p>
        </div>
      </UIAppear>
    </UContainer>

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
