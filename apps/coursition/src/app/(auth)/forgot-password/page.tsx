import { prisma } from '@nmit-coursition/db'
import { ForgotPassword } from 'apps/coursition/src/components/forgotPassword'
import { UpdatePassword } from 'apps/coursition/src/components/updatePassword'

interface Props {
  searchParams: Promise<{
    secret: string
  }>
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const search = await searchParams
  const secret = search?.secret
  if (secret) {
    const reset = await prisma.passwordReset.findFirst({ where: { secret } })

    if (reset?.id && Date.now() < reset.expires_at.getTime() && !reset?.is_used) {
      return <UpdatePassword secret={reset.secret} />
    }

    return 'Invalid token'
  }

  return <ForgotPassword />
}
