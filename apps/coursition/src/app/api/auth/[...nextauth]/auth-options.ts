import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from 'apps/coursition/prisma/prismaClient'
import bcrypt from 'bcryptjs'
import { Effect, Either, Struct } from 'effect'
import type { NextAuthOptions } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

const handleAuthorize = (dto: { email: string; password: string }) =>
  Effect.gen(function* () {
    const result = yield* Effect.tryPromise({
      try: async () => await prisma.user.findFirstOrThrow({ where: { email: dto.email } }),
      catch: () => Effect.fail('user not found'),
    }).pipe(Effect.either)

    if (Either.isRight(result)) {
      const user = result.right
      const isValidPassword = bcrypt.compareSync(dto.password, user.password as string)

      if (isValidPassword)
        return Struct.evolve({ id: user.id as string, email: user.email }, { id: (id) => id.toString() })
      return null
    }

    return null
  }).pipe(Effect.runPromise)

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, _req) {
        const { email, password } = credentials as Record<'email' | 'password', string>
        return await handleAuthorize({ email, password })
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
}
