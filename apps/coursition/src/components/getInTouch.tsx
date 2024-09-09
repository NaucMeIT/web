'use client'

import { Button, Input, Textarea } from '@nmit-coursition/design-system'
import { getInTouch } from '../app/actions'

export const GetInTouch = () => {
  return (
    <form className='flex flex-col gap-4' action={getInTouch}>
      <div className='grid grid-cols-2 gap-6'>
        <Input
          name='email'
          id='email'
          type='email'
          label='Email'
          required
          placeholder='johndoe@example.com'
          className='py-6 w-full col-span-2'
          containerClassName='col-span-2'
        />

        <Input id='firstName' name='firstName' placeholder='John' label='First name' type='text' className='py-6' />
        <Input id='lastName' name='lastName' placeholder='Doe' label='Last name' type='text' className='py-6' />
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
