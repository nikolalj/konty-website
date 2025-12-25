<template>
  <LegalPageContent :page-data="pageData" />
</template>

<script setup lang="ts">
import type { LegalPageData, Section } from '~/types/legal'

const { t } = useI18n()
const { tDeep } = useUtils()

const pageData = computed<LegalPageData>(() => ({
  title: t('pages.terms.title'),
  lastUpdated: t('pages.terms.lastUpdated'),
  date: t('pages.terms.date'),
  sections: tDeep<Section[]>('pages.terms.sections')
}))

usePageSeo({
  title: t('seo.terms.title'),
  description: t('seo.terms.description')
})
</script>
