import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from 'apps/coursition/prisma/prismaClient'
import NextAuth from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }
