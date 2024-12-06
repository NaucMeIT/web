import { Label } from '@nmit-coursition/ui/primitives'
import * as RadioGroupPrimitive from '@nmit-coursition/ui/primitives/radio-group'
import { createSafeKey } from '@nmit-coursition/utils'
// @ts-ignore
import React from 'react'

interface RadioGroupPrpps {
  defaultValue?: string
  options: { value: string; displayText: string }[]
}

export const RadioGroup = ({ options, defaultValue }: RadioGroupPrpps) => {
  return (
    <RadioGroupPrimitive.Group defaultValue={defaultValue}>
      {options.map(({ value, displayText }) => (
        <div key={createSafeKey(value)} className='flex items-center space-x-2'>
          <RadioGroupPrimitive.Item value={value} id={value} />
          <Label id={value}>{displayText}</Label>
        </div>
      ))}
    </RadioGroupPrimitive.Group>
  )
}
