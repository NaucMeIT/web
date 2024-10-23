import { prisma } from '@nmit-coursition/db'
import type { shop__order } from '@prisma/client'
import { processOrderPaid, writeOrderLog } from './order'
import { LS_DEFAULT_PAYMENT_STATUS, LS_PAYMENT_STATUS } from './typescript'

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
  if (payment.status === LS_PAYMENT_STATUS.paid) return

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
