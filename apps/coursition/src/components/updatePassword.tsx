'use client'

import { Button, Input } from '@nmit-coursition/design-system'
import * as React from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import { updatePassword } from '../app/actions'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const initialState: any = {
  message: null,
}

interface Props {
  secret: string
}

export const UpdatePassword = ({ secret }: Props) => {
  const [{ message }, action] = useFormState(updatePassword, initialState)

  React.useEffect(() => {
    if (message) {
      toast(message)
    }
  }, [message])

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
