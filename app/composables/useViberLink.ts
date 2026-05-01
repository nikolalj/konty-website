export const useViberLink = () => {
  const { t } = useI18n()

  // Digits only with country code, no "+".
  const phoneNumber = computed(() =>
    t('data.company.contact.phone').replace(/\D/g, '')
  )

  // viber://contact?number=+E164 opens the contact card on mobile Viber and
  // lets the user start a chat from there. Mobile Viber's chat?number= action
  // throws "request unavailable" for numbers not already in the user's contacts;
  // contact?number= works for non-contacts. Encoding the "+" as %2B avoids
  // form-urlencoded "+ → space" quirks across clients.
  const viberLink = computed(
    () => `viber://contact?number=${encodeURIComponent('+' + phoneNumber.value)}`
  )

  return { phoneNumber, viberLink }
}
