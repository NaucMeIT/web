import {
  Accordion as AccordionPrimitive,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@nmit-coursition/ui/primitives'
import type { ReactNode } from 'react'

interface AccordionItem {
  title: string
  content: ReactNode
}

interface AccordionDemoProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionDemoProps) {
  return (
    <AccordionPrimitive type='single' collapsible className='w-full'>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent className='p-1'>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionPrimitive>
  )
}
