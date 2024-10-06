import { Checkbox as CheckboxPrimitive } from '@nmit-coursition/ui/primitives/checkbox'
import { Label } from '@nmit-coursition/ui/primitives/label'
import { cn } from '@nmit-coursition/ui/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-amber-100 data-[state=checked]:text-amber-100 text-amber-100',
  {
    variants: {
      intent: {
        primary: 'outline outline-[2px] outline-offset-4 outline-amber-100',
        secondary: 'outine outline-[2px] outline-offset-4 outline-fuchsia-400',
      },
      variant: {
        primary: '',
        destructive: 'data-[state=checked]:bg-destructive',
      },
    },

    defaultVariants: {
      intent: 'primary',
      variant: 'primary',
    },
  },
)

// Label-specific styles (e.g., text colors)
const labelVariants = cva('', {
  variants: {
    intent: {
      primary: 'text-amber-100',
      secondary: 'text-amber-100',
    },
    variant: {
      primary: '',
      destructive: 'text-red-500',
    },
  },
  defaultVariants: {
    intent: 'primary',
    variant: 'primary',
  },
})

type CheckboxVariantProps = VariantProps<typeof checkboxVariants>

interface VariantIntentPrimaryProps {
  intent: 'primary'
  variant: 'primary' | 'destructive'
}

interface VariantIntentSecondaryProps {
  intent: 'secondary'
  variant: null
}

/** Omits the properties from `CheckboxVariantProps` because the `CheckboxProps` provides a better union for the variants, allowing the consumers of this component to make use of it. */
type CheckboxBaseProps = React.ComponentProps<typeof CheckboxPrimitive> &
  Omit<CheckboxVariantProps, 'intent' | 'variant'> & {
    id: string
    label: string
    subText?: string
  }

export type CheckboxProps = (VariantIntentPrimaryProps | VariantIntentSecondaryProps) & CheckboxBaseProps

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ id, disabled, intent, variant, label, subText, ...rest }, ref) => {
    return (
      <div className='items-top flex space-x-2'>
        <CheckboxPrimitive
          id={id}
          name={id}
          disabled={disabled}
          className={checkboxVariants({ intent, variant })}
          {...rest}
          ref={ref}
        />
        <div className='grid gap-1.5 leading-none'>
          <Label htmlFor={id} className={cn('font-semibold', labelVariants({ intent, variant }))}>
            {label}
          </Label>
          {subText && <p className='text-sm text-muted-foreground'>{subText}</p>}
        </div>
      </div>
    )
  },
)
export { Checkbox, checkboxVariants }
