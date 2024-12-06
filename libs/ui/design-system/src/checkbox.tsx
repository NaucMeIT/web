import { Checkbox as CheckboxPrimitive } from '@nmit-coursition/ui/primitives/checkbox'
import { Label } from '@nmit-coursition/ui/primitives/label'
import { cn } from '@nmit-coursition/ui/utils'
import { type MixinProps, splitProps } from '@nmit-coursition/utils'
import React from 'react'

export type CheckboxProps = React.ComponentPropsWithRef<typeof CheckboxPrimitive> &
  MixinProps<'container', Omit<React.ComponentPropsWithRef<'div'>, 'children'>> &
  MixinProps<'label', Omit<React.ComponentPropsWithRef<typeof Label>, 'htmlFor' | 'children'>> &
  MixinProps<'subtext', Omit<React.ComponentPropsWithRef<'p'>, 'children'>> & {
    id: string
    label: string
    subtext?: string
  }

export function Checkbox({ id, label: labelText, subtext: description, ...mixProps }: CheckboxProps) {
  const { container, label, subtext, rest } = splitProps(mixProps, 'container', 'label', 'subtext')

  return (
    <div {...container} className={cn('items-top flex space-x-2', container.className)}>
      <CheckboxPrimitive id={id} name={id} {...rest} />
      <div className='grid gap-1.5 leading-none'>
        <Label htmlFor={id} {...label}>
          {labelText}
        </Label>
        {description && (
          <p className='text-sm text-muted-foreground' {...subtext}>
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
