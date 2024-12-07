import { Input as InputPrimitive, type InputProps as InputPrimitiveProps } from '@nmit-coursition/ui/primitives/input'
import { Label } from '@nmit-coursition/ui/primitives/label'
import { cn } from '@nmit-coursition/ui/utils'
import type { MixinProps, OverrideProps } from '@nmit-coursition/utils'
import { splitProps } from '@nmit-coursition/utils'
import React from 'react'

type InputProps = OverrideProps<InputPrimitiveProps, { id: string; name: string; type: string }> &
  MixinProps<'label', Omit<React.ComponentProps<'label'>, 'children'>> &
  MixinProps<'container', React.ComponentProps<'div'>> &
  MixinProps<'subText', Omit<React.ComponentProps<'p'>, 'children'>> & {
    labelText: string
    subText?: string
  }

export function Input({ labelText, subText, ...mixProps }: InputProps) {
  const props = splitProps(mixProps, 'label', 'container', 'subText')
  return (
    <div className={cn('grid w-full items-center gap-1.5', props.container.className)} {...props.container}>
      <Label htmlFor={props.rest.id} {...props.label}>
        {labelText}
      </Label>
      <InputPrimitive {...props.rest} />
      {subText && (
        <p className='text-sm text-muted-foreground' {...props.subText}>
          {subText}
        </p>
      )}
    </div>
  )
}
