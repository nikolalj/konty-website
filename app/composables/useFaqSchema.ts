/**
 * Extract FAQ questions from locale data for Schema.org FAQPage markup
 * @param faqKey - The i18n key for the FAQ section (e.g., 'pages.pricing.faq')
 * @returns Array of Q&A pairs for schema generation
 */
export const useFaqSchema = (faqKey: string) => {
  const { tObject } = useUtils()

  const faqData = tObject(faqKey)
  const faqQuestions: Array<{ q: string; a: string }> = []

  let i = 1
  while (faqData[`q${i}`] && faqData[`a${i}`]) {
    faqQuestions.push({
      q: faqData[`q${i}`] as string,
      a: faqData[`a${i}`] as string
    })
    i++
  }

  return faqQuestions
}
