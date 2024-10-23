import * as LS from '@lemonsqueezy/lemonsqueezy.js'
import { parseError } from '@nmit-coursition/api/utils'
import { prisma } from '@nmit-coursition/db'
import { secretsEnv, typedEnv } from '@nmit-coursition/env'
import { randomStringGenerator } from '@nmit-coursition/utils'
import type { shop__order } from '@prisma/client'
import { Redacted } from 'effect'
import { processOrderPaid, writeOrderLog } from './order'
import { LS_DEFAULT_PAYMENT_STATUS, LS_PAYMENT_STATUS } from './typescript'

LS.lemonSqueezySetup({ apiKey: Redacted.value(secretsEnv.LEMON_SQUEEZY_API_KEY) })

// Create online payment and return redirect link with details
export async function createPayment(order: shop__order): Promise<string> {
  await writeOrderLog({
    orderId: order.id,
    message: `Try to create online payment.`,
    level: 'info',
  })
  const user = await prisma.cas__user.findFirstOrThrow({
    select: { email: true, first_name: true, last_name: true, workos_id: true },
    where: { id: order.user_id },
  })

  const gateway_id = `${randomStringGenerator(32)}_${Date.now()}`
  const { data, error } = await LS.createCheckout(typedEnv.LEMON_SQUEEZY_STORE_ID, '568802', {
    customPrice: Number(order.price) * 100,
    checkoutData: {
      email: user.email,
      name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || undefined,
      custom: {
        id: user.workos_id,
        ref_id: order.order_number,
        gateway_id,
      },
    },
  })

  if (!data || error) {
    await writeOrderLog({
      orderId: order.id,
      message: `Payment creation failed. Error: ${JSON.stringify(parseError(error))}, Data: ${JSON.stringify(data)}`,
      level: 'error',
    })
    throw new Error('Payment creation failed')
  }

  const payment = await prisma.shop__order_payment.create({
    data: {
      order_id: order.id,
      gateway_id,
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
    message: `Payment has been created. ID: ${payment.gateway_id}, Data: ${JSON.stringify(data)}`,
    level: 'success',
  })

  return data.data.attributes.url
}

export async function checkPayment(paymentId: number, newPaymentStatus: string) {
  const payment = await prisma.shop__order_payment.findFirstOrThrow({ where: { id: paymentId } })
  if (payment.status === LS_PAYMENT_STATUS.paid) return

  await writeOrderLog({
    orderId: payment.order_id,
    message: `Try to check payment status.`,
    level: 'info',
  })
  await prisma.shop__order_payment.update({
    data: {
      status: newPaymentStatus,
      last_checked_date: new Date(),
    },
    where: { id: payment.id },
  })

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
