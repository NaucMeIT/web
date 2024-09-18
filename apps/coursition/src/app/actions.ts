'use server'

import { send } from '@nmit-coursition/email'
import { GetInTouchEmailTemplate, ResetPasswordEmailTemplate } from '@nmit-coursition/email'
import { createCheckoutSession } from '@nmit-coursition/payments'
import type { PasswordReset } from '@prisma/client'
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
  try {
    await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        authProvider: 'Credentials',
        paymentStatus: 'FREE',
      },
    })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('An account already exist with this email')
      }
      throw new Error(error.message)
    }
    throw new Error('unknown error')
  }
}

// eslint-disable-next-line require-await -- todo: call resend helper
export const getInTouch = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata) as Record<string, string>

  const { email = '', firstName, lastName, comment } = data

  try {
    await send({
      react: GetInTouchEmailTemplate({ email, fullName: `${firstName} ${lastName}`, comment }),
      from: email,
      to: [''], // company's email
      subject: 'Get In Touch',
    })
  } catch (error) {
    throw new Error("Sorry, your invitation wasn't sent")
  }
}

export const sendResetPassword = async (formdata: FormData) => {
  try {
    const email = formdata.get('email') as string

    const user = await prisma.user.findFirst({ where: { email } })

    if (!user?.id) throw new Error('User not found')

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

    if (!record?.id) throw new Error('Error generating reset link')

    const response = await send({
      from: 'Acme <onboarding@resend.dev>', // todo: change
      to: [email],
      subject: 'Coursition - Reset your password',
      react: ResetPasswordEmailTemplate({
        link: `${process.env['NEXTAUTH_URL']}/forgot-password?secret=${record.secret}`,
      }),
    })

    if (!response.data?.id) throw new Error('An error occured while sending email')

    return { email }
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
    return null
  }
}

export const updatePassword = async (formdata: FormData) => {
  const password = formdata.get('password') as string
  const secret = formdata.get('secret') as string

  const passwordHash = bcrypt.hashSync(password, HASH_SALT_OR_ROUNDS)

  const reset = await prisma.passwordReset.findFirst({ where: { secret } })

  if (reset?.id) {
    try {
      await Promise.all([
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
      return { success: true }
    } catch (error) {
      throw new Error('Error updating password')
    }
  }
  throw new Error('Invalid user')
}
