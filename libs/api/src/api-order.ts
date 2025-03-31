import { secretsEffect } from '@nmit-coursition/env/secrets'
import { publicConfig } from '@nmit-coursition/env/typed'
import { Effect, Redacted } from 'effect'
import { Elysia } from 'elysia'
import { apiCommonGuard } from './utils/api-utils'

export const apiOrder = new Elysia({ prefix: '/order' }).use(apiCommonGuard).post('/credit-order', async () => {
  const secretsEnv = await Effect.runPromise(secretsEffect)
  const typedPublic = Effect.runSync(publicConfig)

  const response = await fetch(
    `https://brj.app/api/v1/shop/order/create?apiKey=${Redacted.value(secretsEnv.BRJ_API_KEY)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: Redacted.value(secretsEnv.BRJ_API_KEY),
        customer: { email: 'syreanis@gmail.com' },
        locale: 'cs',
        currency: 'CZK',
        publicNotice: 'Poznámka zákazníka',
        internalNotice: 'Nabití kreditů',
        items: [
          {
            label: 'Nabití kreditů',
            price: 300,
            count: 1,
            vat: 0,
            creditAmount: 500,
          },
        ],
        // Tam budu přesměrován po úspěšném dokončení platby (děkovací stránky)
        returnUrl: typedPublic.FRONTEND_URL.href,
      }),
    },
  )
  // Vždy přesměřovat na response.redirectUrl
  return { status: 'CREDITS', response: await response.json() }
})
