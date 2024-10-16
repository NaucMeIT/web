import * as TabsPrimitive from '@nmit-coursition/ui/primitives/tabs'
import { createSafeKey } from '@nmit-coursition/utils'
import type { ReactNode } from 'react'

interface TabsProps {
  values: { value: string; displayText: string; children: ReactNode }[]
}

export const Tabs = ({ values }: TabsProps) => {
  return (
    <TabsPrimitive.Tabs defaultValue={values[0]?.value}>
      <TabsPrimitive.TabsList>
        {values.map(({ value, displayText }) => (
          <TabsPrimitive.TabsTrigger key={`headline-${createSafeKey(value)}`} value={value}>
            {displayText}
          </TabsPrimitive.TabsTrigger>
        ))}
      </TabsPrimitive.TabsList>

      {values.map(({ value, children }) => (
        <TabsPrimitive.TabsContent key={`content-${createSafeKey(value)}`} value={value}>
          {children}
        </TabsPrimitive.TabsContent>
      ))}
    </TabsPrimitive.Tabs>
  )
}
