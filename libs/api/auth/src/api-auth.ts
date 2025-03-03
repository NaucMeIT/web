import { formatApiErrorResponse } from '@nmit-coursition/api/utils'
import {
  AUTH_BRJ_COOKIES_NAME,
  AUTH_COOKIES_NAME,
  createBrjMagicAuth,
  getBrjIdentity,
  invalidateSession,
  logoutBrj,
} from '@nmit-coursition/auth'
import { publicConfig, secretsEffect } from '@nmit-coursition/env'
import { WorkOS } from '@workos-inc/node'
import { Effect } from 'effect'
import { Redacted } from 'effect'
import { Elysia } from 'elysia'

const typedEnv = Effect.runSync(publicConfig)
const secretsEnv = await Effect.runPromise(secretsEffect)
const workos = new WorkOS(Redacted.value(secretsEnv.WORKOS_API_KEY), {
  clientId: Redacted.value(secretsEnv.WORKOS_CLIENT_ID),
})

export const apiAuth = new Elysia({ prefix: '/auth', tags: ['auth'] })
  .get('/ping', () => ({ status: 'PONG' }))
  .get('/login', ({ redirect }) => {
    const baseUrl = typedEnv.BACKEND_URL.href
    const redirectUri = `${baseUrl}/auth/callback`.replaceAll('//', '/').replaceAll(':/', '://')
    console.log('redirectUri', redirectUri)

    const authorizationUrl = workos.userManagement.getAuthorizationUrl({
      provider: 'authkit',
      redirectUri: redirectUri,
      clientId: Redacted.value(secretsEnv.WORKOS_CLIENT_ID),
    })

    return redirect(authorizationUrl)
  })
  .get('/callback', async ({ request, query, error, redirect, cookie }) => {
    const code = String(query['code'] || '')

    if (!code) throw error(400, formatApiErrorResponse(request, 'No code provided.'))

    try {
      const authenticateResponse = await workos.userManagement.authenticateWithCode({
        clientId: Redacted.value(secretsEnv.WORKOS_CLIENT_ID),
        code,
        session: {
          sealSession: true,
          cookiePassword: Redacted.value(secretsEnv.WORKOS_COOKIE_PASSWORD),
        },
      })

      const { user, sealedSession } = authenticateResponse
      const brjIdentity = await createBrjMagicAuth(user)

      cookie[AUTH_COOKIES_NAME]?.set({
        value: sealedSession || '',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        domain: typedEnv.FRONTEND_URL.hostname,
      })

      if (brjIdentity) {
        cookie[AUTH_BRJ_COOKIES_NAME]?.set({
          value: brjIdentity,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          domain: typedEnv.FRONTEND_URL.hostname,
        })
      }

      return redirect(typedEnv.FRONTEND_URL.href)
    } catch (error) {
      // eslint-disable-next-line no-console debug info
      console.log('dump error', error)
      throw error
    }
  })
  .get('/logout', async ({ redirect, cookie }) => {
    const sessionData = cookie[AUTH_COOKIES_NAME]?.toString()
    const brjSessionData = cookie[AUTH_BRJ_COOKIES_NAME]?.toString()
    if (!sessionData || !brjSessionData) return redirect('/auth/login')

    try {
      const session = workos.userManagement.loadSealedSession({
        sessionData,
        cookiePassword: Redacted.value(secretsEnv.WORKOS_COOKIE_PASSWORD),
      })

      const url = await session.getLogoutUrl()
      await invalidateSession(sessionData)
      await logoutBrj(brjSessionData)
      cookie[AUTH_COOKIES_NAME]?.remove()
      cookie[AUTH_BRJ_COOKIES_NAME]?.remove()

      return redirect(url)
    } catch (error) {
      // eslint-disable-next-line no-console debug info
      console.error(error)
      return redirect('/auth/login')
    }
  })
  .get('/profile', async ({ cookie }) => {
    console.log(cookie)
    const brjSessionData = cookie[AUTH_BRJ_COOKIES_NAME]?.toString() || ''

    return getBrjIdentity(brjSessionData)
  })
