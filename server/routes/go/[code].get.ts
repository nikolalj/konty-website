import { redirects } from '../../config/redirects'

export default defineEventHandler((event) => {
  const code = getRouterParam(event, 'code')

  if (!code || !redirects[code]) {
    throw createError({ statusCode: 404, message: 'Not found' })
  }

  return sendRedirect(event, redirects[code], 302)
})
