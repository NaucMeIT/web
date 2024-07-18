'use server'

import { LS, createCheckoutSession } from '@nmit-coursition/payments'
import { getServerSession } from 'next-auth'

/**
 * Doing this because we can only call the payments functions from the server.
 */
export const generateCheckout = async () => {
  const session = await getServerSession()
  if (!session?.user?.email) return

  return createCheckoutSession(process.env.NMIT_LIFETIME_PRODUCT_VARIANT_ID || '', {
    platform: 'coursition',
    email: session?.user?.email,
    subType: 'lifetime',
  })
}
