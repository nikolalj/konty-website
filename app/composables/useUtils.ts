export const useUtils = () => {
  const { tm, rt } = useI18n()

  /**
   * Checks if a value is a vue-i18n AST node (compiled message)
   * AST nodes have specific structure with type, body, and static properties
   */
  const isAstNode = (value: unknown): boolean => {
    if (!value || typeof value !== 'object') return false
    const obj = value as Record<string, unknown>
    // AST nodes have 'type' (number), 'body' or 'static' properties
    return (
      typeof obj.type === 'number' &&
      ('body' in obj || 'static' in obj || 'items' in obj)
    )
  }

  /**
   * Recursively resolves all AST nodes in a nested structure
   * Handles objects, arrays, and primitive values at any depth
   */
  const resolveDeep = <T>(value: unknown): T => {
    // If it's an AST node, resolve it to a string
    if (isAstNode(value)) {
      return rt(value as Parameters<typeof rt>[0]) as T
    }

    // If it's an array, recursively process each element
    if (Array.isArray(value)) {
      return value.map(item => resolveDeep(item)) as T
    }

    // If it's a plain object (not AST), recursively process each value
    if (value && typeof value === 'object') {
      const result: Record<string, unknown> = {}
      for (const [key, val] of Object.entries(value)) {
        result[key] = resolveDeep(val)
      }
      return result as T
    }

    // Primitive values (string, number, boolean, null) - return as-is
    return value as T
  }

  /**
   * Get a flat array of translated strings from a locale key
   */
  const tArray = (key: string): string[] => {
    const items = tm(key)
    return Array.isArray(items) ? items.map(item => rt(item)) : []
  }

  /**
   * Get a flat object with translated string values from a locale key
   */
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

  /**
   * Get deeply nested translated content from a locale key
   * Recursively resolves all AST nodes at any depth level
   * Use this for complex structures like legal page sections
   */
  const tDeep = <T = unknown>(key: string): T => {
    const items = tm(key)
    return resolveDeep<T>(items)
  }

  return {
    tArray,
    tObject,
    tDeep
  }
}
