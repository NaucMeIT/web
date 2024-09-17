'use client'

import { Button, Input } from '@nmit-coursition/design-system'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { toast } from 'sonner'
import { updatePassword } from '../app/actions'

interface Props {
  secret: string
}

export const UpdatePassword = ({ secret }: Props) => {
  const router = useRouter()

  const handleSubmit = async (formdata: FormData) => {
    try {
      await updatePassword(formdata)
      router.push('/sign-in')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast(err.message)
      }
    }
  }

  const [_, action] = useActionState((_: unknown, formdata: FormData) => handleSubmit(formdata), null)

  return (
    <div className='container h-screen flex-col gap-2 py-12 flex items-center justify-center mx-auto'>
      <h2 className='text-xl font-semibold'>Reset your password</h2>
      <form className='grid gap-2 w-full max-w-4xl' action={action}>
        <Input label='New password' placeholder='' id='password' type='password' name='password' />
        <input name='secret' value={secret} className='hidden' />
        <Button>Update password</Button>
      </form>
    </div>
  )
}
