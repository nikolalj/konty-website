/**
 * Get localized image path based on current locale
 *
 * @param basePath - Base path without locale (e.g., '/images/features/hospitality/features')
 * @param imageName - Image filename (e.g., 'feat1.avif')
 * @param locale - Current locale (e.g., 'us', 'me', 'ba', 'rs')
 * @returns Full path to the localized image
 */

export const getLocalizedImage = (
  basePath: string,
  imageName: string,
  locale: string
): string => {
  const balkansLocales = ['me', 'ba', 'rs']
  const localeFolder = balkansLocales.includes(locale) ? 'blkn' : 'us'

  return `${basePath}/${localeFolder}/${imageName}`
}

export const useLocalizedImages = () => {
  const { locale } = useI18n()

  const getLocalizedImagePath = (
    basePath: string,
    imageName: string
  ): string => {
    return getLocalizedImage(basePath, imageName, locale.value)
  }

  return {
    getLocalizedImagePath
  }
}
