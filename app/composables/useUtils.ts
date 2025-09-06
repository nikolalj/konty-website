export const useUtils = () => {
  const { tm, rt } = useI18n()

  const tArray = (key: string): string[] => {
    const items = tm(key)
    return Array.isArray(items) ? items.map(item => rt(item)) : []
  }

  const tObject = (key: string): Record<string, string> => {
    const items = tm(key)
    if (!items || Array.isArray(items) || typeof items !== 'object') {
      return {}
    }

    const result: Record<string, string> = {}
    for (const [objKey, value] of Object.entries(items)) {
      result[objKey] = rt(value)
    }

    return result
  }

  return {
    tArray,
    tObject
  }
}
