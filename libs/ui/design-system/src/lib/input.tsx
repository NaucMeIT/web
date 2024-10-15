import * as InputPrimitive from '@nmit-coursition/ui/primitives/input'
import { Label } from '@nmit-coursition/ui/primitives/label'
import { cn } from '@nmit-coursition/ui/utils'
import { type VariantProps, cva } from 'class-variance-authority'

type OverrideProps<T, V> = V & Omit<T, keyof V>

const inputVariants = cva('', {
  variants: {
    /** todo: add orientation to the variants with mixins. */
    variant: {},
  },
})

type Orientation = 'horizontal' | 'vertical'

interface InputProps
  extends OverrideProps<
      InputPrimitive.RootProps,
      { type: InputPrimitive.RootProps['type']; placeholder: string; id: string }
    >,
    VariantProps<typeof inputVariants> {
  label: string
  subtext?: string
  disabled?: boolean
  orientation?: Orientation
  containerClassName?: string
}

export function Input({
  label,
  placeholder,
  type,
  id,
  subtext,
  disabled,
  variant,
  orientation = 'vertical',
  containerClassName,
  ...rest
}: InputProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center gap-1.5',
        orientation === 'vertical' ? 'flex-col items-start' : '',
        containerClassName,
      )}
    >
      <Label htmlFor={id}>{label}</Label>
      <InputPrimitive.Main
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(inputVariants({ variant }))}
        {...rest}
      />
      {subtext && <p className='text-sm text-muted-foreground'>{subtext}</p>}
    </div>
  )
}
