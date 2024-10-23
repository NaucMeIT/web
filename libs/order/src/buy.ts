import { createOrder } from './order'
import { createPayment } from './payment'

export async function buySubscribe(userId: bigint): Promise<string> {
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

export async function buyCredit(userId: bigint, credit: number): Promise<string> {
  const order = await createOrder({
    userId,
    currency: 'EUR',
    items: [{ label: 'Credit purchase', price: credit, creditAmount: credit }],
  })

  return await createPayment(order)
}
