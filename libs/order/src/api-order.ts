import { apiCommonGuard, getLoggedUserOrThrow } from '@nmit-coursition/api/utils'
import { Elysia } from 'elysia'
import { buyCredit, buySubscribe } from './buy'
import { checkPayment } from './payment'

export const apiOrder = new Elysia({ prefix: '/order' })
  .use(apiCommonGuard)
  .post('/buy-subscribe', async ({ request }) => {
    const user = await getLoggedUserOrThrow(request)

    return {
      redirectUrl: await buySubscribe(user.id),
    }
  })
  .post('/buy-credit', async ({ request }) => {
    const user = await getLoggedUserOrThrow(request)
    const credit = 500

    return {
      redirectUrl: await buyCredit(user.id, credit),
    }
  })
  .get('/webhook-check-payment-status', async ({ request }) => {
    // TODO: Use gateway id from query
    await checkPayment(1)

    return { success: true }
  })
