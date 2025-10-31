<template>
  <section class="pt-44 pb-16">
    <UContainer
      class="flex flex-col lg:grid gap-y-16 gap-12 lg:grid-cols-2 lg:items-center"
    >
      <!-- Left column: Text content -->
      <div>
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl text-pretty tracking-tight font-bold text-highlighted"
        >
          {{ t('pages.products.download.hero.title') }}
        </h1>

        <p class="text-xl font-semibold text-primary mt-4">
          {{ t('pages.products.download.hero.subtitle') }}
        </p>

        <p class="text-lg text-muted text-pretty mt-6">
          {{ t('pages.products.download.hero.description') }}
        </p>

        <!-- Documentation link - hidden on mobile, shown on desktop -->
        <div class="hidden lg:block">
          <div
            class="mt-12 inline-flex items-center gap-2 px-4 py-3 bg-primary-500/10 rounded-lg border border-primary-200"
          >
            <UIcon name="i-lucide-file-text" class="w-5 h-5 text-primary" />
            <p class="text-base text-gray-700 dark:text-gray-300">
              {{ t('pages.products.download.hero.docsLink') }}
              <a
                href="https://docs.konty.com"
                target="_blank"
                class="text-primary underline font-semibold cursor-pointer"
              >
                {{ t('pages.products.download.hero.docsLinkText') }}
              </a>
            </p>
          </div>
        </div>
      </div>

      <!-- Right column: All Downloads -->
      <div class="space-y-6">
        <!-- Loading State -->
        <div v-if="isLoading" class="space-y-6">
          <div class="animate-pulse">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4" />
            <div class="grid grid-cols-4 gap-3">
              <div
                v-for="i in 4"
                :key="i"
                class="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"
              />
            </div>
          </div>
          <div class="animate-pulse">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4" />
            <div class="grid grid-cols-4 gap-3">
              <div
                v-for="i in 4"
                :key="i"
                class="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"
              />
            </div>
          </div>
        </div>

        <!-- Production Downloads -->
        <div v-if="!isLoading">
          <h3 class="text-lg font-semibold mb-4 text-highlighted">
            {{ items.production.title }}
          </h3>
          <div class="grid grid-cols-4 gap-3">
            <a
              v-for="option in items.production.options"
              :key="option.title"
              :href="option.link"
              target="_blank"
              :class="[
                'flex flex-col items-center justify-center p-6 rounded-lg bg-white dark:bg-[var(--bg-300)] ring-1 ring-gray-200 dark:ring-gray-700 transition-all duration-300 group',
                option.link
                  ? 'hover:bg-gray-100 dark:hover:bg-[var(--bg-400)] hover:shadow-lg cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              ]"
              @click="option.link && handleDownload('Full', option.platform)"
            >
              <UIcon :name="option.icon" class="w-12 h-12 text-primary mb-3" />
              <span class="text-sm font-medium">{{ option.title }}</span>
            </a>
          </div>
        </div>

        <!-- LPRF Downloads (Only for Serbian locale) -->
        <div v-if="!isLoading && 'lprf' in items">
          <h3 class="text-lg font-semibold mb-4 text-highlighted">
            {{ (items as any).lprf.title }}
          </h3>
          <div class="grid grid-cols-4 gap-3">
            <a
              v-for="option in (items as any).lprf.options"
              :key="option.title"
              :href="option.link"
              target="_blank"
              :class="[
                'flex flex-col items-center justify-center p-6 rounded-lg bg-white dark:bg-[var(--bg-300)] ring-1 ring-gray-200 dark:ring-gray-700 transition-all duration-300 group',
                option.link
                  ? 'hover:bg-gray-100 dark:hover:bg-[var(--bg-400)] hover:shadow-lg cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              ]"
              @click="option.link && handleDownload('LPRF', option.platform)"
            >
              <UIcon :name="option.icon" class="w-12 h-12 text-primary mb-3" />
              <span class="text-sm font-medium">{{ option.title }}</span>
            </a>
          </div>
        </div>

        <!-- Demo Downloads -->
        <div v-if="!isLoading">
          <h3 class="text-lg font-semibold mb-4 text-highlighted">
            {{ items.demo.title }}
          </h3>
          <div class="grid grid-cols-4 gap-3">
            <a
              v-for="option in items.demo.options"
              :key="option.title"
              :href="option.link"
              target="_blank"
              :class="[
                'flex flex-col items-center justify-center p-6 rounded-lg bg-white dark:bg-[var(--bg-300)] ring-1 ring-gray-200 dark:ring-gray-700 transition-all duration-300 group',
                option.link
                  ? 'hover:bg-gray-100 dark:hover:bg-[var(--bg-400)] hover:shadow-lg cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              ]"
              @click="option.link && handleDownload('Demo', option.platform)"
            >
              <UIcon :name="option.icon" class="w-12 h-12 text-gray-500 mb-3" />
              <span class="text-sm font-medium">{{ option.title }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Documentation link - shown on mobile only, after downloads -->
      <div class="lg:hidden">
        <div
          class="inline-flex items-center gap-2 px-4 py-3 bg-primary-500/10 rounded-lg border border-primary-200"
        >
          <UIcon name="i-lucide-file-text" class="w-5 h-5 text-primary" />
          <p class="text-base text-gray-700 dark:text-gray-300">
            {{ t('pages.products.download.hero.docsLink') }}
            <a
              href="https://docs.konty.com"
              target="_blank"
              class="text-primary underline font-semibold cursor-pointer"
            >
              {{ t('pages.products.download.hero.docsLinkText') }}
            </a>
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const { track } = useTracking()

const downloads = ref({
  web: 'https://pos.konty.com/',
  windows: '',
  macos: '',
  android: 'https://play.google.com/store/apps/details?id=com.konty.pos',
  ios: 'https://www.apple.com/app-store/',
  demoWeb: 'https://staging.pos.konty.com/',
  demoWindows: '',
  demoMacos: '',
  demoAndroid: '',
  demoIos: 'https://www.apple.com/app-store/',
  winLPRF: '',
  macLPRF: ''
})

const isLoading = ref(true)

async function getLatestReleaseAssets(isStaging: boolean) {
  const repo = isStaging ? 'pos-releases-staging' : 'pos-releases'
  return fetchRepoAssets(`nikolalj/${repo}`)
}

interface GitHubAsset {
  name: string
  size: number
  download_count: number
  created_at: string
  browser_download_url: string
  content_type: string
}

interface GitHubRelease {
  assets: Array<{
    name: string
    size: number
    download_count: number
    created_at: string
    browser_download_url: string
    content_type: string
  }>
}

async function fetchRepoAssets(fullRepo: string): Promise<GitHubAsset[]> {
  try {
    const releaseResponse = await fetch(
      `https://api.github.com/repos/${fullRepo}/releases/latest`
    )
    if (!releaseResponse.ok) {
      throw new Error(`GitHub API error: ${releaseResponse.status}`)
    }
    const releaseData = (await releaseResponse.json()) as GitHubRelease
    const assets = releaseData.assets

    return assets.map((asset) => ({
      name: asset.name,
      size: asset.size,
      download_count: asset.download_count,
      created_at: asset.created_at,
      browser_download_url: asset.browser_download_url,
      content_type: asset.content_type
    }))
  } catch (error) {
    console.error(`Error fetching release assets for ${fullRepo}:`, error)
    throw error
  }
}

const getAssetUrl = (assets: GitHubAsset[], keyword: string) =>
  assets.find((asset) => asset.name.toLowerCase().includes(keyword))
    ?.browser_download_url || ''

const fetchDownloadLinks = async () => {
  try {
    const [prodAssets, demoAssets, symphonyAssets] = await Promise.all([
      getLatestReleaseAssets(false),
      getLatestReleaseAssets(true),
      fetchRepoAssets('nikolalj/esdc-electron-release')
    ])

    const platforms = [
      { key: 'windows', keyword: 'exe', source: prodAssets },
      { key: 'macos', keyword: 'dmg', source: prodAssets },
      { key: 'demoWindows', keyword: 'exe', source: demoAssets },
      { key: 'demoMacos', keyword: 'dmg', source: demoAssets },
      { key: 'demoAndroid', keyword: 'apk', source: demoAssets },
      { key: 'winLPRF', keyword: 'exe', source: symphonyAssets },
      { key: 'macLPRF', keyword: 'dmg', source: symphonyAssets }
    ]

    for (const { key, keyword, source } of platforms) {
      downloads.value[key as keyof typeof downloads.value] = getAssetUrl(
        source,
        keyword
      )
    }
  } catch (error) {
    console.error('Failed to fetch downloads', error)
  } finally {
    isLoading.value = false
  }
}

const handleDownload = (
  version: 'Demo' | 'Full' | 'LPRF',
  platform: string
) => {
  track('download', {
    category: version,
    label: platform
  })
}

// Computed items based on fetched downloads
const items = computed(() => {
  const baseItems = {
    production: {
      title: t('pages.products.download.sections.production.title'),
      options: [
        {
          title: t('pages.products.download.sections.production.web'),
          platform: 'Web',
          icon: 'i-lucide-globe',
          link: downloads.value.web
        },
        {
          title: t('pages.products.download.sections.production.windows'),
          platform: 'Windows',
          icon: 'i-simple-icons-windows',
          link: downloads.value.windows
        },
        {
          title: t('pages.products.download.sections.production.android'),
          platform: 'Android',
          icon: 'i-simple-icons-android',
          link: downloads.value.android
        },
        {
          title: t('pages.products.download.sections.production.macos'),
          platform: 'Mac',
          icon: 'i-simple-icons-apple',
          link: downloads.value.macos
        }
      ]
    },
    demo: {
      title: t('pages.products.download.sections.demo.title'),
      options: [
        {
          title: t('pages.products.download.sections.demo.web'),
          platform: 'Web',
          icon: 'i-lucide-globe',
          link: downloads.value.demoWeb
        },
        {
          title: t('pages.products.download.sections.demo.windows'),
          platform: 'Windows',
          icon: 'i-simple-icons-windows',
          link: downloads.value.demoWindows
        },
        {
          title: t('pages.products.download.sections.demo.android'),
          platform: 'Android',
          icon: 'i-simple-icons-android',
          link: downloads.value.demoAndroid
        },
        {
          title: t('pages.products.download.sections.demo.macos'),
          platform: 'Mac',
          icon: 'i-simple-icons-apple',
          link: downloads.value.demoMacos
        }
      ]
    }
  }

  // Add LPRF section only for Serbian locale
  if (locale.value === 'rs') {
    return {
      ...baseItems,
      lprf: {
        title: t('pages.products.download.sections.lprf.title'),
        options: [
          {
            title: t('pages.products.download.sections.lprf.windows'),
            platform: 'Windows',
            icon: 'i-simple-icons-windows',
            link: downloads.value.winLPRF
          },
          {
            title: t('pages.products.download.sections.lprf.macos'),
            platform: 'Mac',
            icon: 'i-simple-icons-apple',
            link: downloads.value.macLPRF
          }
        ]
      }
    }
  }

  return baseItems
})

// Fetch downloads on mount
onMounted(() => {
  fetchDownloadLinks()
})

usePageSeo({
  title: t('seo.products.download.title'),
  description: t('seo.products.download.description')
})
</script>
