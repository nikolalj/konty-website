<template>
  <div class="mt-24">
    <LazySharedFAQ heading-level="h1" hydrate-on-visible />

    <!-- Documentation Section -->
    <SharedSection variant="alt">
      <UIAppear direction="up">
        <div class="max-w-4xl mx-auto">
          <ULink
            to="https://docs.konty.com"
            target="_blank"
            class="group block rounded-xl border border-primary/10 hover:border-primary/40 bg-primary/3 hover:bg-primary/8 transition-all duration-200"
          >
            <div class="p-6 sm:p-8">
              <div
                class="flex flex-col lg:flex-row items-start lg:items-center gap-6"
              >
                <div class="flex-shrink-0">
                  <div
                    class="w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-200"
                  >
                    <UIcon
                      name="i-lucide-book-open"
                      class="w-8 h-8 text-primary-600 dark:text-primary-400"
                    />
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <UBadge color="primary" variant="soft" class="mb-3">
                    <UIcon name="i-lucide-sparkles" class="w-3 h-3 mr-1" />
                    {{ t('pages.products.download.hero.docsBadge') }}
                  </UBadge>

                  <h3
                    class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                  >
                    {{ t('pages.products.download.hero.docsTitle') }}
                  </h3>

                  <p
                    class="text-base leading-relaxed text-gray-700 dark:text-gray-300"
                  >
                    {{ t('pages.products.download.hero.docsDescription') }}
                  </p>
                </div>

                <div class="flex-shrink-0 self-start lg:self-center">
                  <div
                    class="w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-200"
                  >
                    <UIcon
                      name="i-lucide-arrow-right"
                      class="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ULink>
        </div>
      </UIAppear>
    </SharedSection>

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
