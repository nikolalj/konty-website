<template>
  <LegalPageContent :page-data="pageData" />
</template>

<script setup lang="ts">
import type { LegalPageData, Section } from '~/types/legal'

const { t } = useI18n()
const { tDeep } = useUtils()

const pageData = computed<LegalPageData>(() => ({
  title: t('pages.accountDelete.title'),
  lastUpdated: t('pages.accountDelete.lastUpdated'),
  date: t('pages.accountDelete.date'),
  sections: tDeep<Section[]>('pages.accountDelete.sections')
}))

usePageSeo({
  title: t('seo.accountDelete.title'),
  description: t('seo.accountDelete.description')
})
</script>
