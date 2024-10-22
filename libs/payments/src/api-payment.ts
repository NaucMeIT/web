import { parseError } from '@nmit-coursition/api/utils'
import axios from 'axios'
import { Elysia } from 'elysia'
import { checkPayment, createCreditPayment, createSubscribePayment } from './index'

export const apiPayment = new Elysia({ prefix: '/payment' })
  .get('/create-payment', async () => {
    try {
      const response = await axios.post(
        'https://api.lemonsqueezy.com/v1/payments',
        {
          amount: 100_00,
          currency: 'CZK',
          payment_method: 'card',
          customer_email: 'janbarasek@gmail.com',
          description: 'Credit 100 CZK',
        },
        {
          headers: {
            Authorization: `Bearer YOUR_API_KEY`,
            'Content-Type': 'application/json',
          },
        },
      )

      console.log('Payment', response.data)

      return { success: true, payment: response.data }
    } catch (e) {
      console.log('Payment', e)
      return { success: false, error: parseError(e) }
    }

    return { success: false }
  })
  .post('/create-subscribe-payment', async ({ request }) => {
    const userId = 1

    return {
      redirectUrl: await createSubscribePayment(userId),
    }
  })
  .post('/create-credit-payment', async ({ request }) => {
    const userId = 1
    const credit = 500

    return {
      redirectUrl: await createCreditPayment(userId, credit),
    }
  })
  .get('/webhook-check-payment-status', async ({ request }) => {
    // TODO: Use gateway id from query
    await checkPayment(1)

    return { success: true }
  })
