import { Label } from '@nmit-coursition/ui/primitives'
import * as RadioGroupPrimitive from '@nmit-coursition/ui/primitives/radio-group'
import { cn } from '@nmit-coursition/ui/utils'
import { createSafeKey } from '@nmit-coursition/utils'
import { type VariantProps, cva } from 'class-variance-authority'

const radioGroupVariants = cva('', {
  variants: {
    variant: {
      default: '',
      outlined: '',
      invalid: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface RadioGroupPrpps extends VariantProps<typeof radioGroupVariants> {
  defaultValue?: string
  options: { value: string; displayText: string }[]
}

export const RadioGroup = ({ options, defaultValue, variant }: RadioGroupPrpps) => {
  return (
    <RadioGroupPrimitive.Group defaultValue={defaultValue}>
      {options.map(({ value, displayText }) => (
        <div key={createSafeKey(value)} className='flex items-center space-x-2'>
          <RadioGroupPrimitive.Item value={value} id={value} className={cn(radioGroupVariants({ variant }))} />
          <Label id={value}>{displayText}</Label>
        </div>
      ))}
    </RadioGroupPrimitive.Group>
  )
}
