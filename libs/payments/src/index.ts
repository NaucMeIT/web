import 'server-only'
import * as LS from '@lemonsqueezy/lemonsqueezy.js'

const apiKey = process.env.LEMON_SQUEEZY_API_KEY as string
const storeId = process.env.LEMON_SQUEEZY_STORE_ID as string

interface CreatePaymentIntentParams {
  variant: string
  metadata?: Record<string, string>
}

LS.lemonSqueezySetup({ apiKey })

export const createCustomer = async (data: LS.NewCustomer, cb: () => void) => {
  const customer = await LS.createCustomer(storeId, data).then(cb)
  return customer
}

export const createCheckoutSession = async ({ variant, metadata }: CreatePaymentIntentParams) => {
  const intent = await LS.createCheckout(storeId, variant, {
    checkoutData: {
      custom: {
        ...metadata,
      },
    },
  })

  return intent
}
