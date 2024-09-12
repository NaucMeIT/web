import { prisma } from 'apps/coursition/prisma/prismaClient'
import { ForgotPassword } from 'apps/coursition/src/components/forgotPassword'
import { UpdatePassword } from 'apps/coursition/src/components/updatePassword'

interface Props {
  searchParams: {
    secret: string
  }
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  if (searchParams?.secret) {
    const reset = await prisma.passwordReset.findFirst({ where: { secret: searchParams.secret } })

    if (reset?.id && Date.now() < reset.expires_at.getTime() && !reset?.is_used) {
      return <UpdatePassword secret={reset.secret} />
    }

    return 'Invalid token'
  }

  return <ForgotPassword />
}
