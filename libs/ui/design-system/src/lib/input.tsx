import type * as React from 'react'

import { Input as InputPrimitive } from '@nmit-coursition/ui/primitives/input'
import { Label } from '@nmit-coursition/ui/primitives/label'
import { cn } from '@nmit-coursition/ui/utils'

type InputType = React.ComponentProps<'input'>['type']

interface InputProps extends React.ComponentProps<'input'> {
  label: string
  placeholder: string
  type: InputType
  id: string
  subtext?: string
  disabled?: boolean

  // todo: use mix props
  containerClassName?: string
}

export function Input({ label, placeholder, type, id, subtext, disabled, containerClassName, ...rest }: InputProps) {
  return (
    <div className={cn('grid w-full items-center gap-1.5', containerClassName)}>
      <Label htmlFor={id}>{label}</Label>
      <InputPrimitive type={type} id={id} name={id} placeholder={placeholder} disabled={disabled} {...rest} />
      {subtext && <p className='text-sm text-muted-foreground'>{subtext}</p>}
    </div>
  )
}
