import * as CheckboxPrimitive from '@nmit-coursition/ui/primitives/checkbox'
import { Label } from '@nmit-coursition/ui/primitives/label'
import { cn } from '@nmit-coursition/ui/utils'
import { type VariantProps, cva } from 'class-variance-authority'

const checkboxVariants = cva('', {
  variants: {
    variant: {
      outlined: '',
      critical: '', // applies a red border
    },
    size: {
      sm: '', // 8px
      lg: '', // 14px
    },
  },
})

interface CheckboxProps extends CheckboxPrimitive.RootProps, VariantProps<typeof checkboxVariants> {
  id: string
  label: string
  disabled?: boolean
  subtext?: string
}

export const Checkbox = ({ id, label, subtext, disabled, className, variant, ...rest }: CheckboxProps) => {
  return (
    <div className='items-top flex space-x-2'>
      <CheckboxPrimitive.Main id={id} name={id} disabled={disabled} {...rest} className={cn({ variant, className })} />
      <div className='grid gap-1.5 leading-none'>
        <Label htmlFor={id}>{label}</Label>
        {subtext && <p className='text-sm text-muted-foreground'>{subtext}</p>}
      </div>
    </div>
  )
}
