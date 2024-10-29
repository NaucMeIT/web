import { apiCommonGuard, getLoggedUserOrThrow } from '@nmit-coursition/api/utils'
import { prisma } from '@nmit-coursition/db'
import { Elysia, t } from 'elysia'
import { buyCredit, buySubscribe } from './buy'
import { checkPayment } from './payment'

export const apiOrder = new Elysia({ prefix: '/order' })
  .post(
    '/webhook-check-payment-status',
    async ({ body }) => {
      const gateway_id = body.meta.custom_data.gateway_id
      const payment = await prisma.shop__order_payment.findFirst({
        select: { id: true },
        where: {
          gateway_id,
          gateway_provider_id: 1,
        },
      })
      if (!payment) {
        throw new Error(`Payment not found: ${gateway_id}`)
      }
      await checkPayment(payment.id, body.data.attributes.status)

      return { success: true }
    },
    {
      body: t.Object({
        meta: t.Object({
          custom_data: t.Object({
            gateway_id: t.String(),
          }),
        }),
        data: t.Object({
          attributes: t.Object({
            status: t.String(),
          }),
        }),
      }),
    },
  )
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
