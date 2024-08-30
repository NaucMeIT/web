import type * as React from 'react'

import { Input as InputPrimitive } from '@nmit-coursition/ui/primitives/input'
import { Label } from '@nmit-coursition/ui/primitives/label'

interface InputProps extends React.ComponentProps<'input'> {
  label: string
  placeholder: string
  type: string
  id: string
  subtext?: string
  disabled?: boolean
}

export function Input({ label, placeholder, type, id, subtext, disabled, ...rest }: InputProps) {
  return (
    <div className='grid w-full items-center gap-1.5'>
      <Label htmlFor={id}>{label}</Label>
      <InputPrimitive type={type} id={id} name={id} placeholder={placeholder} disabled={disabled} {...rest} />
      {subtext && <p className='text-sm text-muted-foreground'>{subtext}</p>}
    </div>
  )
}
