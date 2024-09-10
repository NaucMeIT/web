'use server'

import { createCheckoutSession } from '@nmit-coursition/payments'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prisma } from 'apps/coursition/prisma/prismaClient'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../app/api/auth/[...nextauth]/auth-options'

/**
 * Doing this because we can only call the payments functions from the server.
 */
export const generateCheckout = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return redirect('/sign-in')

  return createCheckoutSession(process.env['NMIT_LIFETIME_PRODUCT_VARIANT_ID'] || '', {
    platform: 'coursition',
    email: session?.user?.email,
    subType: 'lifetime',
  })
}

export const createUser = async ({ email, password }: { email: string; password: string }) => {
  const saltOrRounds = 10
  const passwordHash = bcrypt.hashSync(password, saltOrRounds)
  return await prisma.user
    .create({
      data: {
        email,
        password: passwordHash,
        authProvider: 'Credentials',
        paymentStatus: 'FREE',
      },
    })
    .catch((err: unknown) => {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { error: 'An account already exist with this email' }
        }
        return { error: err.message }
      }
      return { error: 'unknown error' }
    })
}

export const getInTouch = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata)
  console.log({ data })
  // todo: call resend helper
}
