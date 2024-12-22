import { apiCommonGuard, computeUsage, reportSpend } from '@nmit-coursition/api/utils'
import { Elysia } from 'elysia'

export const apiDev = new Elysia({ prefix: '/dev', tags: ['dev'] })
  .use(apiCommonGuard)
  .get('/ping', () => ({ status: 'ZEROPS' }), {
    afterResponse: ({ request }) => reportSpend({ request }),
  })
  .get('/fail', () => {
    throw new Error(
      `This is error message from always failing endpoint. Current server time: ${new Date().toISOString()}`,
    )
  })
  .get('/report-usage', async () => await computeUsage({ organisationId: 1 }), {
    afterResponse: ({ request }) => reportSpend({ request }),
  })
  .get('/credit-order', async () => {
    console.log('API KEY', process.env['BRJ_API_KEY'])
    const response = await fetch(`https://brj.app/api/v1/shop/order/create?apiKey=${process.env['BRJ_API_KEY']}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: process.env['BRJ_API_KEY'],
        customer: { email: 'syreanis@gmail.com' },
        locale: 'cs',
        currency: 'CZK',
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
        tags: { category: 'credit' },
        returnUrl: 'http://localhost:3000',
        formData: { code: 'objednavka-zaplacena', data: { field: 'true', 'field-2': 'option1' } },
      }),
    })
    return { status: 'CREDITS', response: await response.json() }
  })
