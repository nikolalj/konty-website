export const useViberLink = () => {
  const { t } = useI18n()

  // Strip every non-digit, including the leading "+". Viber's click-to-chat
  // expects digits only with country code.
  const phoneNumber = computed(() =>
    t('data.company.contact.phone').replace(/\D/g, '')
  )

  // Viber's official click-to-chat URL. Deep-links to the Viber app on mobile
  // and falls back to Viber Web on desktop. The bare viber://chat?number=
  // scheme works on Viber Desktop but throws "request unavailable" on the
  // mobile clients.
  const viberLink = computed(
    () => `https://chats.viber.com/${phoneNumber.value}`
  )

  return { phoneNumber, viberLink }
}
