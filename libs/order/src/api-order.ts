import { apiCommonGuard } from '@nmit-coursition/api/utils'
import { AUTH_BRJ_COOKIES_NAME, getBrjIdentity } from '@nmit-coursition/auth'
import { publicConfig, secretsEffect } from '@nmit-coursition/env'
import { Effect, Redacted } from 'effect'
import { Elysia } from 'elysia'

const secretsEnv = await Effect.runPromise(secretsEffect)
const typedPublic = Effect.runSync(publicConfig)
export const apiOrder = new Elysia({ prefix: '/order', tags: ['order'] }).use(apiCommonGuard).post(
  '/credit-order',
  async ({ cookie }) => {
    const authSession = cookie[AUTH_BRJ_COOKIES_NAME]?.toString() || ''
    if (!authSession) {
      return { status: 'ERROR', message: 'Unauthorized access' }
    }
    const identity = await getBrjIdentity(authSession)
    const response = await fetch(
      `https://brj.app/api/v1/shop/order/create?apiKey=${Redacted.value(secretsEnv.BRJ_API_KEY)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: Redacted.value(secretsEnv.BRJ_API_KEY),
          customer: { email: identity.email },
          locale: 'en',
          currency: 'EUR',
          // publicNotice: 'Poznámka zákazníka',
          // internalNotice: 'Nabití kreditů',
          items: [
            {
              label: 'Credit order',
              price: 40,
              productCode: 'early-adopter',
              count: 1,
              creditAmount: 1000,
            },
          ],
          returnUrl: `${typedPublic.FRONTEND_URL.href}/media`,
        }),
      },
    )
    const jsonResponse = await response.json()
    return { redirectUrl: jsonResponse.links.payLink }
  },
  {},
)
