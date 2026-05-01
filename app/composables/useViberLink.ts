export const useViberLink = () => {
  const { t } = useI18n()

  // Strip every non-digit, including the leading "+". Viber's chat deep link
  // expects pure digits with country code; an encoded "+" (%2B) gets re-decoded
  // to a space on some clients, which breaks the lookup ("request unavailable").
  const phoneNumber = computed(() =>
    t('data.company.contact.phone').replace(/\D/g, '')
  )

  const viberLink = computed(
    () => `viber://chat?number=${phoneNumber.value}`
  )

  return { phoneNumber, viberLink }
}
