'use server'

import { Components, send } from '@nmit-coursition/email'
import { createCheckoutSession } from '@nmit-coursition/payments'
import type { PasswordReset, User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prisma } from 'apps/coursition/prisma/prismaClient'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../app/api/auth/[...nextauth]/auth-options'

const HASH_SALT_OR_ROUNDS = 10

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
  const passwordHash = bcrypt.hashSync(password, HASH_SALT_OR_ROUNDS)
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

export const getInTouch = async (prevState: { message: string }, formdata: FormData) => {
  const data = Object.fromEntries(formdata) as Record<string, string>

  const { email = '', firstName, lastName, comment } = data
  return await send({
    react: Components.GetInTouchEmailTemplate({ email, fullName: `${firstName} ${lastName}`, comment }),
    from: 'Acme <onboarding@resend.dev>',
    to: [''], // company's email
    subject: 'Get In Touch',
  })
    .then(() => ({ message: 'Your invitation has been sent' }))
    .catch(() => ({ message: "Sorry, your invitation wasn't sent" }))
}

export const sendResetPassword = async (
  _: { step: number; error?: string | null },
  formdata: FormData,
): Promise<{ step: number; error?: string }> => {
  try {
    const email = formdata.get('email') as string

    const user = await prisma.user.findFirst({ where: { email } })

    if (!user?.id) return { error: 'user not found', step: 1 }

    const record = (await prisma.passwordReset
      .create({
        data: {
          id: `re_${nanoid(6)}`,
          /** 4 Hours */
          expires_at: new Date(Date.now() + 1000 * 60 * 60 * 4),
          is_used: false,
          secret: `sec_${nanoid(12)}`,
          userId: user.id,
        },
      })
      .catch((err) => {
        console.log({ err })
        return { step: 1, error: JSON.stringify(err) }
      })) as PasswordReset

    if (!record?.id) return { error: 'error generating reset link', step: 1 }

    return await send({
      from: 'Acme <onboarding@resend.dev>', // todo: change
      to: [email],
      subject: 'Reset your password',
      react: Components.ResetPasswordEmailTemplate({
        link: `${process.env['NEXTAUTH_URL']}/forgot-password?secret=${record.secret}`,
      }),
    })
      .then(() => ({ step: 2 }))
      .catch((err) => ({ step: 1, error: JSON.stringify(err) }))
  } catch (err) {
    console.log({ err })
    return { error: 'an unexpected error occured', step: 1 }
  }
}

export const updatePassword = async (_: { message: string }, formdata: FormData): Promise<{ message: string }> => {
  const password = formdata.get('password') as string
  const secret = formdata.get('secret') as string

  const passwordHash = bcrypt.hashSync(password, HASH_SALT_OR_ROUNDS)

  const reset = await prisma.passwordReset.findFirst({ where: { secret } })

  console.log({ reset })

  if (reset?.id) {
    return await Promise.all([
      prisma.user.update({
        where: { id: reset.userId },
        data: {
          password: passwordHash,
        },
      }),
      prisma.passwordReset.update({
        where: { id: reset?.id },
        data: { is_used: true },
      }),
    ])
      .then(() => ({ message: 'password successfully updated' }))
      .catch(() => ({ message: 'An unexpected error occured' }))
  }

  return { message: 'Invalid user' }
}
