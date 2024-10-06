'use client'

import { Button, Input } from '@nmit-coursition/design-system'
import { useSignal } from '@preact/signals-react'
import { useActionState } from 'react'
import { toast } from 'sonner'
import { sendResetPassword } from '../app/actions'

const initialState = { email: '' }

export const ForgotPassword = () => {
  const step = useSignal<1 | 2>(1)

  const handleSubmit = async (formdata: FormData) => {
    try {
      await sendResetPassword(formdata)
      step.value = 2
      return {
        email: formdata.get('email') as string,
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        step.value = 1
        toast.error(error?.message)
      }
      return initialState
    }
  }

  const [state, action] = useActionState((_: unknown, formdata: FormData) => handleSubmit(formdata), initialState)

  if (step.value === 2) {
    return (
      <div className='container h-screen flex-col gap-2 py-12 flex items-center justify-center mx-auto'>
        <h2 className='text-[20px] font-semibold'>Check Your Email</h2>
        <p>We&apos;ve sent an email to {state?.email} with a link to reset your password.</p>
      </div>
    )
  }

  return (
    <div className='container h-screen flex-col gap-2 py-12 flex items-center justify-center mx-auto'>
      <h2 className='text-[20px] font-semibold'>Reset your password</h2>
      <form className='grid gap-2 w-full max-w-4xl' action={action}>
        <Input label='Email' placeholder='johndoe@gmail.com' id='email' type='email' name='email' />
        <Button>Request Password reset</Button>
      </form>
    </div>
  )
}
