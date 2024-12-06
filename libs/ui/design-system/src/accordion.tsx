import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionPrimitive,
  AccordionTrigger,
} from '@nmit-coursition/ui/primitives'
import { type MixinProps, createSafeKey, splitProps } from '@nmit-coursition/utils'
// @ts-ignore
import React from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
interface TAccordionItem {
  title: string
  content: ReactNode
}

interface AccordionDemoProps
  extends MixinProps<'trigger', Omit<ComponentPropsWithoutRef<typeof AccordionTrigger>, 'children'>>,
    MixinProps<'content', Omit<ComponentPropsWithoutRef<typeof AccordionContent>, 'children'>> {
  items: TAccordionItem[]
}

export function Accordion({ items, ...mixProps }: AccordionDemoProps) {
  const { trigger, content } = splitProps(mixProps, 'trigger', 'content')

  return (
    <AccordionPrimitive type='single' collapsible className='w-full'>
      {items.map((item) => (
        <AccordionItem key={createSafeKey(item.title)} value={createSafeKey(item.title)}>
          <AccordionTrigger {...trigger}>{item.title}</AccordionTrigger>
          <AccordionContent className='p-1' {...content}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionPrimitive>
  )
}
