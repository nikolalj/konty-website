<template>
  <LegalPageContent :page-data="pageData" />
</template>

<script setup lang="ts">
import type { LegalPageData, Section } from '~/types/legal'

const { t } = useI18n()
const { tDeep } = useUtils()

const pageData = computed<LegalPageData>(() => ({
  title: t('pages.privacy.title'),
  lastUpdated: t('pages.privacy.lastUpdated'),
  date: t('pages.privacy.date'),
  sections: tDeep<Section[]>('pages.privacy.sections')
}))

usePageSeo({
  title: t('seo.privacy.title'),
  description: t('seo.privacy.description')
})
</script>
