import { performance } from 'node:perf_hooks'
import { addCreditRecord } from '@nmit-coursition/auth'
import { prisma } from '@nmit-coursition/db'
import type { shop__order } from '@prisma/client'
import {
  ORDER_LOG_LEVEL,
  type OrderDescription,
  type OrderLogProps,
  type OrderNumberGeneratorStrategyOptions,
  type VariableGeneratorFactory,
} from './typescript'

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
    // eslint-disable-next-line no-await-in-loop order items must keep original position
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
  if (Array.isArray(specialActions)) return specialActions.join(';')
  return specialActions
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

export async function processOrderPaid(orderId: bigint) {
  const order = await prisma.shop__order.findFirstOrThrow({ where: { id: orderId } })
  if (order.order_pay_date) {
    // order has been paid in past
    return
  }
  const items = await prisma.shop__order_item.findMany({
    where: { order_id: order.id },
    orderBy: [{ inserted_date: 'asc' }],
  })

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

  await prisma.shop__order.update({
    data: { order_pay_date: new Date() },
    where: { id: order.id },
  })

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
