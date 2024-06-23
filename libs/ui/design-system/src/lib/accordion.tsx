import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionPrimitive,
  AccordionTrigger,
} from '@nmit-coursition/ui/primitives'
import { createSafeKey } from '@nmit-coursition/utils'
import type { ReactNode } from 'react'

interface TAccordionItem {
  title: string
  content: ReactNode
}

interface AccordionDemoProps {
  items: TAccordionItem[]
}

export function Accordion({ items }: AccordionDemoProps) {
  return (
    <AccordionPrimitive type='single' collapsible className='w-full'>
      {items.map((item) => (
        <AccordionItem key={createSafeKey(item.title)} value={createSafeKey(item.title)}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent className='p-1'>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionPrimitive>
  )
}
