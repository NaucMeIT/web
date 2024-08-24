'use server'

import { createCheckoutSession } from '@nmit-coursition/payments'
import { prisma } from 'apps/coursition/prisma/prismaClient'
import bcrypt from 'bcryptjs'
import { Effect, flow } from 'effect'
import { getServerSession } from 'next-auth'
import { authOptions } from '../app/api/auth/[...nextauth]/auth-options'

export const getSession = async () => await getServerSession(authOptions)

/**
 * Doing this because we can only call the payments functions from the server.
 */
export const generateCheckout = async () => {
  const session = await getSession()
  if (!session?.user?.email) return

  return createCheckoutSession(process.env.NMIT_LIFETIME_PRODUCT_VARIANT_ID || '', {
    platform: 'coursition',
    email: session?.user?.email,
    subType: 'lifetime',
  })
}

export const createUser = (dto: { email: string; password: string }) =>
  Effect.gen(function* () {
    const saltOrRounds = 10
    return flow(
      () => bcrypt.hashSync(dto.password, saltOrRounds),
      async (hash) =>
        await prisma.user.create({
          data: {
            email: dto.email,
            password: hash,
            authProvider: 'Credentials',
            paymentStatus: 'FREE',
          },
        }),

      async (user) => {
        const _ = await user
        if (_.id) return { success: true }
        return { success: false }
      },
    )()
  }).pipe(Effect.runPromise)
