import { getRedirects } from '~~/shared/config/campaigns'

export default defineEventHandler((event) => {
  const code = getRouterParam(event, 'code')
  const redirects = getRedirects()

  if (!code || !redirects[code]) {
    throw createError({ statusCode: 404, message: 'Not found' })
  }

  return sendRedirect(event, redirects[code], 302)
})
