import { Label } from '@nmit-coursition/ui/primitives/label'
import * as TextareaPrimitive from '@nmit-coursition/ui/primitives/textarea'
import { cn } from '@nmit-coursition/ui/utils'
import { type VariantProps, cva } from 'class-variance-authority'

const textAreaVariants = cva('', {
  variants: {
    variant: {
      primary: '',
      invalid: '',
      outlined: '',
      noBackdrop: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export interface TextareaWithTextProps extends TextareaPrimitive.RootProps, VariantProps<typeof textAreaVariants> {
  id: string
  label: string
  placeholder: string
  subtext?: string
  disabled?: boolean
  containerClassName?: string
}

export function Textarea({
  id,
  label,
  placeholder,
  subtext,
  disabled,
  className,
  containerClassName,
  variant,
  ...rest
}: TextareaWithTextProps) {
  return (
    <div className={cn('grid w-full gap-1.5', containerClassName)}>
      <Label htmlFor={id}>{label}</Label>
      <TextareaPrimitive.Main
        placeholder={placeholder}
        id={id}
        name={id}
        disabled={disabled}
        {...rest}
        className={cn(textAreaVariants({ variant, className }))}
      />
      {subtext && <p className='text-sm text-muted-foreground'>{subtext}</p>}
    </div>
  )
}
