import { Input as InputPrimitive, type InputProps as RootProps } from '@nmit-coursition/ui/primitives/input'
import { Label } from '@nmit-coursition/ui/primitives/label'
import { cn } from '@nmit-coursition/ui/utils'
import { type VariantProps, cva } from 'class-variance-authority'

type OverrideProps<T, V> = V & Omit<T, keyof V>

const inputVariants = cva('', {
  variants: {
    grow: {
      false: 'w-min',
      true: 'w-full',
    },
  },
})

type Orientation = 'horizontal' | 'vertical'

interface InputProps
  extends OverrideProps<RootProps, { type: RootProps['type']; placeholder: string; id: string }>,
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
  grow,
  containerClassName,
  ...rest
}: InputProps) {
  return (
    <div className={cn('flex w-full items-center justify-center gap-1.5', containerClassName)}>
      <Label htmlFor={id}>{label}</Label>
      <InputPrimitive
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(inputVariants({ grow }))}
        {...rest}
      />
      {subtext && <p className='text-sm text-muted-foreground'>{subtext}</p>}
    </div>
  )
}
