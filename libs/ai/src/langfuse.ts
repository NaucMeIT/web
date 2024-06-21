import { Langfuse } from 'langfuse'

export const langfuse = new Langfuse({
  publicKey: process.env['NEXT_PUBLIC_LANGFUSE_PUBLIC_KEY'],
  secretKey: process.env['LANGFUSE_SECRET_KEY'],
  baseUrl: process.env['NEXT_PUBLIC_LANGFUSE_BASE_URL'] ?? undefined,
})
