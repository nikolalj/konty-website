<template>
  <LegalPageContent :page-data="pageData" />
</template>

<script setup lang="ts">
import type { LegalPageData, Section } from '~/types/legal'

const { t } = useI18n()
const { tDeep } = useUtils()

const pageData = computed<LegalPageData>(() => ({
  title: t('pages.dataProcessing.title'),
  lastUpdated: t('pages.dataProcessing.lastUpdated'),
  date: t('pages.dataProcessing.date'),
  sections: tDeep<Section[]>('pages.dataProcessing.sections')
}))

usePageSeo({
  title: t('seo.dataProcessing.title'),
  description: t('seo.dataProcessing.description')
})
</script>
