import { Label } from '@nmit-coursition/ui/primitives/label'
import { cva, type VariantProps } from 'class-variance-authority'
import * as CheckboxPrimitive from '@nmit-coursition/ui/primitives/checkbox'
import { cn } from '@nmit-coursition/ui/utils'

const checkboxVariants = cva('', {
  variants: {
    variant: {
      outlined: '',
      error: '',
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

export function Checkbox({ id, label, subtext, disabled, className, variant, ...rest }: CheckboxProps) {
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
