export const useViberLink = () => {
  const { t } = useI18n()

  // Keep the "+" so the number stays in E.164 form for the deep link.
  const phoneNumber = computed(() =>
    t('data.company.contact.phone').replace(/[\s()-]/g, '')
  )

  // viber://chat?number=+E164 (with "+" encoded as %2B) is the format that
  // works across clients: desktop Viber opens a chat directly; mobile Viber
  // opens the contact card from which the user taps "Send message". The
  // contact?number= action shows "Request unavailable" on desktop, so don't
  // use it.
  const viberLink = computed(
    () => `viber://chat?number=${encodeURIComponent(phoneNumber.value)}`
  )

  return { phoneNumber, viberLink }
}
