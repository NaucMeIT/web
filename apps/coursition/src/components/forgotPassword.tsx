'use client'

import { Button, Input } from '@nmit-coursition/design-system'
import * as React from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import { sendResetPassword } from '../app/actions'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const initialState: any = {
  step: 1,
  error: null,
}

export const ForgotPassword = () => {
  const [step, setStep] = React.useState<1 | 2>(1)
  const [email, setEmail] = React.useState('')
  const [state, action] = useFormState(sendResetPassword, initialState)

  React.useEffect(() => {
    if (state.step) {
      setStep(state.step)
    }

    if (state.error) {
      toast(state.error)
    }
  }, [state.step, state.error])

  if (step === 2) {
    return (
      <div className='container h-screen flex-col gap-2 py-12 flex items-center justify-center mx-auto'>
        <h2 className='text-[20px] font-semibold'>Check Your Email</h2>
        <p>We've sent an email to {email} with a link to reset your password.</p>
      </div>
    )
  }

  return (
    <div className='container h-screen flex-col gap-2 py-12 flex items-center justify-center mx-auto'>
      <h2 className='text-[20px] font-semibold'>Reset your password</h2>
      <form className='grid gap-2 w-full max-w-4xl' action={action}>
        <Input
          label='Email'
          placeholder='johndoe@gmail.com'
          id='email'
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button>Request Password reset</Button>
      </form>
    </div>
  )
}
