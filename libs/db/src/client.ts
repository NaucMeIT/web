import { secretsEnv } from '@nmit-coursition/env'
import { PrismaClient } from '@prisma/client'
import { Redacted } from 'effect'

process.env = {
  ...process.env,
  DATABASE_URL: Redacted.value(secretsEnv.DATABASE_URL).href,
  DIRECT_URL: Redacted.value(secretsEnv.DIRECT_URL).href,
}

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
export { Prisma } from '@prisma/client'

if (process.env['NODE_ENV'] !== 'production') globalThis.prismaGlobal = prisma
