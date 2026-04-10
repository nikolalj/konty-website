export const useViberLink = () => {
  const { t } = useI18n()

  const phoneNumber = computed(() =>
    t('data.company.contact.phone').replace(/[\s()-]/g, '')
  )

  const viberLink = computed(
    () => `viber://chat?number=${encodeURIComponent(phoneNumber.value)}`
  )

  return { phoneNumber, viberLink }
}
