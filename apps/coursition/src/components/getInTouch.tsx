'use client'

import { Button, Input, Textarea } from '@nmit-coursition/ui/design-system'
import { toast } from 'sonner'
import { getInTouch } from '../app/actions'

export const GetInTouch = () => {
  const handleSubmit = async (formdata: FormData) => {
    try {
      await getInTouch(formdata)
      toast.success('Invitation successfully sent')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <form className='flex flex-col gap-4' action={handleSubmit}>
      <div className='grid grid-cols-2 gap-6'>
        <Input
          name='email'
          id='email'
          type='email'
          labelText='Email'
          required
          placeholder='johndoe@example.com'
          className='py-6 w-full col-span-2'
          containerClassName='col-span-2'
        />

        <Input id='firstName' name='firstName' placeholder='John' labelText='First name' type='text' className='py-6' />
        <Input id='lastName' name='lastName' placeholder='Doe' labelText='Last name' type='text' className='py-6' />
        <Textarea
          name='comment'
          id='comment'
          placeholder='Comment'
          label=''
          rows={5}
          required
          containerClassName='col-span-2'
        />
      </div>
      <Button className='w-full bg-purple-700 hover:bg-purple-700/90' type='submit'>
        Talk with us
      </Button>
    </form>
  )
}
