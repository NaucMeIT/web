'use client'
import * as TooltipPrimitive from '@nmit-coursition/ui/primitives/tooltip'
import { type MixinProps, splitProps } from '@nmit-coursition/utils'
// @ts-ignore
import React from 'react'
import type { ComponentProps } from 'react'

interface TriggerProps extends ComponentProps<typeof TooltipPrimitive.TooltipTrigger> {}

interface ContentProps extends ComponentProps<typeof TooltipPrimitive.TooltipContent> {}

interface Props
  extends ComponentProps<typeof TooltipPrimitive.Tooltip>,
    MixinProps<'trigger', Omit<TriggerProps, 'children'>>,
    MixinProps<'content', Omit<ContentProps, 'children'>> {
  trigger: TriggerProps['children']
  content: ContentProps['children']
}

export const Tooltip = ({ trigger, content, ...mixProps }: Props) => {
  const forwardedProps = splitProps(mixProps, 'trigger', 'content')

  return (
    <TooltipPrimitive.TooltipProvider>
      <TooltipPrimitive.Tooltip {...forwardedProps.rest}>
        <TooltipPrimitive.TooltipTrigger {...forwardedProps.trigger}>{trigger}</TooltipPrimitive.TooltipTrigger>
        <TooltipPrimitive.TooltipContent {...forwardedProps.content}>{content}</TooltipPrimitive.TooltipContent>
      </TooltipPrimitive.Tooltip>
    </TooltipPrimitive.TooltipProvider>
  )
}
