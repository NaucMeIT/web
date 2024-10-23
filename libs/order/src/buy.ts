import { createOrder } from './order'
import { createPayment } from './payment'
import { PRODUCT_LIST } from './product'

export async function buySubscribe(userId: bigint): Promise<string> {
  const order = await createOrder({
    userId,
    currency: 'EUR',
    items: [
      {
        label: 'Lifetime subscriptions',
        price: PRODUCT_LIST.lifetimeSubscriptions.price,
        specialActions: 'lifetimeSubscriptions',
      },
    ],
  })

  return await createPayment(order)
}

export async function buyCredit(userId: bigint, credit: number): Promise<string> {
  const order = await createOrder({
    userId,
    currency: 'EUR',
    items: [{ label: 'Credit purchase', price: credit, creditAmount: credit }],
  })

  return await createPayment(order)
}
