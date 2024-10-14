import 'server-only'

import * as crypto from 'node:crypto'
import * as LS from '@lemonsqueezy/lemonsqueezy.js'
import { secretsEnv, typedEnv } from '@nmit-coursition/env'
import type { LooseAutocomplete } from '@nmit-coursition/utils'
import { Redacted } from 'effect'

const storeId = typedEnv.LEMON_SQUEEZY_STORE_ID

interface LemonSqueezyData {
  data: {
    attributes: {
      status: 'paid' | 'unpaid' | 'pending'
    }
  }
  meta: {
    custom_data?: {
      platform?: string
      sub_type?: LooseAutocomplete<'lifetime'>
    }
  }
}

export interface Metadata {
  [key: string]: string
}
export interface WebhookEventHandlerApi {
  rawBody: string
  request: Request
  customData: {
    condition: (data: LemonSqueezyData) => boolean
    callback: (emailToUpdate: string) => void
  }
}

LS.lemonSqueezySetup({ apiKey: Redacted.value(secretsEnv.LEMON_SQUEEZY_API_KEY) })

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

  // eslint-disable-next-line prefer-structured-clone -- have to check if it works with LemonSqueezy
  return JSON.parse(JSON.stringify(intent)) as typeof intent
}

export const webhookEventHandler = async ({
  rawBody,
  request,
  customData: { callback, condition },
}: WebhookEventHandlerApi) => {
  /**
   * Decodes the webhook secret.
   */
  const secret = Redacted.value(secretsEnv.LEMON_SQUEEZY_WEBHOOK_SECRET)
  const hmac = crypto.createHmac('sha256', secret)
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'hex')
  const signature = Buffer.from(request.headers.get('X-Signature') || '', 'hex')

  // Convert Buffer to Uint8Array
  const digestArray = new Uint8Array(digest)
  const signatureArray = new Uint8Array(signature)

  if (!crypto.timingSafeEqual(digestArray, signatureArray)) {
    throw new Error('Invalid signature.')
  }

  const data = await JSON.parse(rawBody)

  if (condition(data)) {
    callback(data.meta.custom_data?.email)
    return { success: true }
  }

  return { success: false }
}

export type { LS }
