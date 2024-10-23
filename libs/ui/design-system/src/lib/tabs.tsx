import * as TabsPrimitive from '@nmit-coursition/ui/primitives/tabs'
import { type MixinProps, createSafeKey, splitProps } from '@nmit-coursition/utils'
import type { ComponentPropsWithRef, ReactNode } from 'react'

interface TabsProps
  extends ComponentPropsWithRef<typeof TabsPrimitive.Tabs>,
    MixinProps<'trigger', Omit<ComponentPropsWithRef<typeof TabsPrimitive.TabsTrigger>, 'value'>>,
    MixinProps<'content', Omit<ComponentPropsWithRef<typeof TabsPrimitive.TabsContent>, 'value' | 'children'>> {
  values: { value: string; displayText: string; children: ReactNode }[]
}

export const Tabs = ({ values, ...mixProps }: TabsProps) => {
  const { trigger, content, rest } = splitProps(mixProps, 'trigger', 'content')

  return (
    <TabsPrimitive.Tabs defaultValue={values[0]?.value} {...rest}>
      <TabsPrimitive.TabsList>
        {values.map(({ value, displayText }) => (
          <TabsPrimitive.TabsTrigger key={`headline-${createSafeKey(value)}`} value={value} {...trigger}>
            {displayText}
          </TabsPrimitive.TabsTrigger>
        ))}
      </TabsPrimitive.TabsList>

      {values.map(({ value, children }) => (
        <TabsPrimitive.TabsContent key={`content-${createSafeKey(value)}`} value={value} {...content}>
          {children}
        </TabsPrimitive.TabsContent>
      ))}
    </TabsPrimitive.Tabs>
  )
}
