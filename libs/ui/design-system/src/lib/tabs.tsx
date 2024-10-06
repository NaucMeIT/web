import * as TabsPrimitive from '@nmit-coursition/ui/primitives/tabs'
import type { ReactNode } from 'react'

interface TabsProps {
  // Merge triggers and contents into one values
  values: { value: string; displayText: string; children: ReactNode }[]
}

export const Tabs = ({ values }: TabsProps) => {
  return (
    <TabsPrimitive.Tabs>
      <TabsPrimitive.TabsList>
        {values.map(({ value, displayText }) => (
          <TabsPrimitive.TabsTrigger value={value} key={value}>
            {displayText}
          </TabsPrimitive.TabsTrigger>
        ))}
      </TabsPrimitive.TabsList>

      {values.map(({ value, children }) => (
        <TabsPrimitive.TabsContent key={value} value={value}>
          {children}
        </TabsPrimitive.TabsContent>
      ))}
    </TabsPrimitive.Tabs>
  )
}
