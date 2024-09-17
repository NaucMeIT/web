import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from 'apps/coursition/prisma/prismaClient'
import bcrypt from 'bcryptjs'
import type { NextAuthOptions, User } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

const handleAuthorize = async ({ email, password }: { email: string; password: string }) => {
  const user = await prisma.user.findFirst({ where: { email } })

  if (!user) return { error: 'user not found' }

  const isValidPassword = bcrypt.compareSync(password, user.password as string)

  if (!isValidPassword) return { error: 'invalid credentials' }

  return { id: user.id as string, email: user.email }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env['GOOGLE_ID'] || '',
      clientSecret: process.env['GOOGLE_SECRET'] || '',
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, _) {
        const { email, password } = credentials as { email: string; password: string }

        return (await handleAuthorize({ email, password })) as User
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    signIn: ({ user }) => {
      if ('error' in user) {
        return `/sign-in?error=${user.error}`
      }
      return true
    },
  },
}
