import * as TabsPrimitive from '@nmit-coursition/ui/primitives/tabs'
import type { ReactNode } from 'react'

interface TabsProps<Values extends string[]> {
  triggers: { value: NoInfer<Values[number]>; displayText: string }[]
  contents: { value: NoInfer<Values[number]>; children: ReactNode }[]
}

export const Tabs = <Values extends string[]>({ triggers, contents }: TabsProps<Values>) => {
  return (
    <TabsPrimitive.Tabs>
      <TabsPrimitive.TabsList>
        {triggers.map(({ value, displayText }) => (
          <TabsPrimitive.TabsTrigger value={value} key={value}>
            {displayText}
          </TabsPrimitive.TabsTrigger>
        ))}
      </TabsPrimitive.TabsList>

      {contents.map(({ value, children }) => (
        <TabsPrimitive.TabsContent key={value} value={value}>
          {children}
        </TabsPrimitive.TabsContent>
      ))}
    </TabsPrimitive.Tabs>
  )
}
