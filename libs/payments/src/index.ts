import 'server-only'

import * as crypto from 'node:crypto'
import * as LS from '@lemonsqueezy/lemonsqueezy.js'

const apiKey = process.env.LEMON_SQUEEZY_API_KEY as string
const storeId = process.env.LEMON_SQUEEZY_STORE_ID as string

type RecursiveRecord = Record<string, string | RecursiveRecord>

export type Metadata = Record<string, string>
export type WebhookEventHandlerApi = {
  rawBody: string
  request: Request
  customData: {
    condition: (data: RecursiveRecord) => boolean
    callback: (emailToUpdate: string) => void
  }
}

LS.lemonSqueezySetup({ apiKey })

export const createCustomer = async (data: LS.NewCustomer, cb: () => void) => {
  const customer = await LS.createCustomer(storeId, data).then(cb)
  return customer
}

export const createCheckoutSession = async (variant: string, metadata?: Metadata) => {
  const intent = await LS.createCheckout(storeId, variant, {
    checkoutData: {
      custom: {
        ...metadata,
      },
    },
  })

  return intent
}

export const webhookEventHandler = async ({
  rawBody,
  request,
  customData: { callback, condition },
}: WebhookEventHandlerApi) => {
  /**
   * Decodes the webhook secret.
   */
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET as string
  const hmac = crypto.createHmac('sha256', secret)
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'hex')
  const signature = Buffer.from(request.headers.get('X-Signature') || '', 'hex')

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error('Invalid signature.')
  }

  const data = JSON.parse(rawBody)

  if (condition(data)) {
    callback(data.meta.custom_data?.email)
  }

  return { success: true }
}

export type { LS }
