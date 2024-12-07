import { Label } from '@nmit-coursition/ui/primitives/label'
import { Textarea as TextareaPrimitive } from '@nmit-coursition/ui/primitives/textarea'
import { cn } from '@nmit-coursition/ui/utils'
import { type MixinProps, type OverrideProps, splitProps } from '@nmit-coursition/utils'
// @ts-ignore
import React from 'react'
import type { ComponentPropsWithRef } from 'react'

type TextareaProps = OverrideProps<
  ComponentPropsWithRef<typeof TextareaPrimitive>,
  { id: string; placeholder: string }
> &
  MixinProps<'label', Omit<ComponentPropsWithRef<typeof Label>, 'htmlFor' | 'children'>> &
  MixinProps<'subtext', ComponentPropsWithRef<'p'>> &
  MixinProps<'container', ComponentPropsWithRef<'div'>> & {
    subtext?: string
    label: string
  }

export function Textarea({ id, label: labelText, placeholder, subtext: description, ...mixProps }: TextareaProps) {
  const { container, label, subtext, rest } = splitProps(mixProps, 'label', 'subtext', 'container')

  return (
    <div className={cn('grid w-full gap-1.5', container.className)} {...container}>
      <Label htmlFor={id} {...label}>
        {labelText}
      </Label>
      <TextareaPrimitive placeholder={placeholder} id={id} name={id} {...rest} />
      {description && <p className={cn('text-sm text-muted-foreground', subtext.className)}>{description}</p>}
    </div>
  )
}
