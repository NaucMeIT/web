import 'server-only'

import * as crypto from 'node:crypto'
import * as LS from '@lemonsqueezy/lemonsqueezy.js'
import { addCreditRecord } from '@nmit-coursition/auth'
import { prisma } from '@nmit-coursition/db'
import { secretsEnv, typedEnv } from '@nmit-coursition/env'
import type { LooseAutocomplete } from '@nmit-coursition/utils'
import { shop__order } from '@prisma/client'
import { Redacted } from 'effect'
import { performance } from 'perf_hooks'
import {
  LS_DEFAULT_PAYMENT_STATUS,
  ORDER_LOG_LEVEL,
  type OrderDescription,
  type OrderLogProps,
  type OrderNumberGeneratorStrategyOptions,
  type VariableGeneratorFactory,
} from './typescript'

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

export async function createOrder({ userId, currency, items }: OrderDescription): Promise<shop__order> {
  const start = performance.now()
  const user = await prisma.cas__user.findFirstOrThrow({
    select: { id: true, organisation_id: true },
    where: { id: userId },
  })
  const currencyEntity = await prisma.shop__currency.findFirstOrThrow({ where: { code: currency } })

  const order = await prisma.shop__order.create({
    data: {
      order_number: await resolveNextOrderNumber(user.organisation_id),
      user_id: user.id,
      organisation_id: user.organisation_id,
      price: items.map((item) => item.price).reduce((part, sum) => part + sum, 0),
      currency_id: currencyEntity.id,
      inserted_date: new Date(),
      updated_date: new Date(),
    },
  })

  // Create items by for-loop for keep serial insert order
  for (const item of items) {
    await prisma.shop__order_item.create({
      data: {
        order_id: order.id,
        label: item.label,
        price: item.price,
        credit_amount: item.creditAmount || 0,
        special_actions: formatSpecialActions(item.specialActions),
        inserted_date: new Date(),
      },
    })
  }

  await writeOrderLog({
    orderId: order.id,
    message:
      `Order "${order.order_number}" has been created in ${(performance.now() - start).toFixed(2)} ms.\n` +
      `Items:\n` +
      `${items.map((item) => `${item.label}: ${item.price} ${currency}`).join('\n')}`,
    level: 'success',
  })

  return order
}

function formatSpecialActions(specialActions: string | string[] | undefined) {
  if (!specialActions) return
  if (Array.isArray(item.specialActions)) return item.specialActions.join(';')
  return item.specialActions
}

export async function resolveNextOrderNumber(organisationId: number): Promise<string> {
  const lastOrder = await prisma.shop__order.findFirst({
    select: { order_number: true },
    where: { organisation_id: organisationId },
    orderBy: { order_number: 'desc' },
  })

  const { generate, getFirst } = yearPrefixIncrementStrategy()

  return lastOrder?.order_number ? generate(lastOrder.order_number) : getFirst()
}

/**
 * The general formatting strategy that generates this format:
 *
 * YYXXXXXX
 * ^ ^
 * | \_ Generated number
 * \___ Year prefix
 *
 * Sample generated number can be 21000001 for first number in 2021.
 *
 * This strategy tries to maintain a defined number of characters.
 * The number of characters may overflow in case of a large number of orders.
 * The minimum length of the generated number is 3 characters.
 *
 * If there is a natural year change (during New Year's Eve),
 * the number series will automatically reset and the new number will be the first in the sequence of the new year.
 */
export function yearPrefixIncrementStrategy(options?: OrderNumberGeneratorStrategyOptions): VariableGeneratorFactory {
  const getYear = (): number => Number((options?.date || new Date()).getFullYear().toString().slice(-2))

  const getFirst = (): string => `${getYear()}${'0'.repeat((options?.length || options?.preferredLength || 8) - 3)}1`

  return {
    generate: (last: string): string => {
      const parser = last.match(/^(\d{2})(\d+)$/)
      if (parser && Number(parser[1]) === getYear())
        return `${getYear()}${String(Number(parser[2]) + 1).padStart(options?.length || parser?.[2]?.length || 0, '0')}`

      return getFirst()
    },
    getFirst,
  }
}

// Create online payment and return redirect link with details
export async function createPayment(order: shop__order): Promise<string> {
  await writeOrderLog({
    orderId: order.id,
    message: `Try to create online payment.`,
    level: 'info',
  })

  // TODO: Use LemonSqueezy and create payment request

  const payment = await prisma.shop__order_payment.create({
    data: {
      order_id: order.id,
      gateway_id: '', // TODO
      price: order.price,
      status: LS_DEFAULT_PAYMENT_STATUS,
      inserted_date: new Date(),
      gateway_provider_id: 1, // LemonSqueezy
    },
  })

  await prisma.shop__order_payment_status_history.create({
    data: {
      payment_id: payment.id,
      status: LS_DEFAULT_PAYMENT_STATUS,
      inserted_date: new Date(),
    },
  })

  await writeOrderLog({
    orderId: order.id,
    message: `Payment has been created. ID: ${payment.gateway_id}`,
    level: 'success',
  })

  // TODO: Return redirect to gateway
  return ''
}

export async function checkPayment(paymentId: number) {
  const payment = await prisma.shop__order_payment.findFirstOrThrow({ where: { id: paymentId } })
  // TODO: Check if this status really exist
  if (payment.status === 'paid') return

  await writeOrderLog({
    orderId: payment.order_id,
    message: `Try to check payment status.`,
    level: 'info',
  })

  // TODO: Load new payment status from API or webhook
  const newPaymentStatus = LS_DEFAULT_PAYMENT_STATUS

  if (newPaymentStatus !== payment.status) {
    await writeOrderLog({
      orderId: payment.order_id,
      message: `Payment status has been changed (${payment.status} => ${newPaymentStatus}).`,
      level: 'info',
    })

    await prisma.shop__order_payment_status_history.create({
      data: {
        payment_id: payment.id,
        status: newPaymentStatus,
        inserted_date: new Date(),
      },
    })
  }

  if (newPaymentStatus === 'paid') {
    await processOrderPaid(payment.order_id)
  }
}

export async function processOrderPaid(orderId: bigint) {
  const order = await prisma.shop__order.findFirstOrThrow({ where: { id: orderId } })
  const items = await prisma.shop__order_item.findMany({
    where: { order_id: order.id },
    orderBy: [{ inserted_date: 'asc' }],
  })

  // TODO: Mark order status as paid (shop__order table)

  await Promise.all(
    items.map(async (item) => {
      if (item.credit_amount) {
        await addCreditRecord(order.user_id, item.credit_amount, `Order ${order.order_number}`)
      }
      if (item.special_actions) {
        await Promise.all(item.special_actions.split(';').map((action) => runOrderSpecialAction(order, action)))
      }
    }),
  )

  await writeOrderLog({
    orderId: order.id,
    message: `Order has been paid`,
    level: 'success',
  })
}

export async function runOrderSpecialAction(order: shop__order, action: string) {
  await writeOrderLog({
    orderId: order.id,
    message: `Run special action "${action}".`,
    level: 'info',
  })

  if (action === 'lifetimeSubscriptions') {
    await prisma.cas__user.update({
      data: { lifetime_subscribe: true, updated_date: new Date() },
      where: { id: order.user_id },
    })
  }
}

export async function createSubscribePayment(userId: number): Promise<string> {
  const order = await createOrder({
    userId,
    currency: 'EUR',
    items: [
      {
        label: 'Lifetime subscriptions',
        price: 5000, // TODO: Check pricing
        specialActions: 'lifetimeSubscriptions',
      },
    ],
  })

  return await createPayment(order)
}

export async function createCreditPayment(userId: number, credit: number): Promise<string> {
  const order = await createOrder({
    userId,
    currency: 'EUR',
    items: [{ label: 'Credit purchase', price: credit, creditAmount: credit }],
  })

  return await createPayment(order)
}

export async function writeOrderLog({ orderId, message, level }: OrderLogProps) {
  await prisma.shop__order_log.create({
    data: {
      order_id: orderId,
      message: message.trim(),
      level: ORDER_LOG_LEVEL[level],
      inserted_date: new Date(),
    },
  })
}

export type { LS }
