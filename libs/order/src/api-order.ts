import { apiCommonGuard, getLoggedUserOrThrow } from '@nmit-coursition/api/utils'
import { prisma } from '@nmit-coursition/db'
import { Elysia, t } from 'elysia'
import { buyCredit, buySubscribe } from './buy'
import { checkPayment } from './payment'

export const apiOrder = new Elysia({ prefix: '/order' })
  .post(
    '/webhook-check-payment-status',
    async ({
      body: {
        data: {
          id,
          attributes: { status },
        },
      },
    }) => {
      const payment = await prisma.shop__order_payment.findFirst({
        select: { id: true },
        where: {
          gateway_id: id,
          gateway_provider_id: 1,
        },
      })
      if (!payment) {
        throw new Error(`Payment not found: ${id}`)
      }
      await checkPayment(payment.id, status)

      return { success: true }
    },
    {
      body: t.Object({
        data: t.Object({
          id: t.String(),
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
