import { Label } from '@nmit-coursition/ui/primitives/label'
import { Textarea as TextareaPrimitive, type TextareaProps } from '@nmit-coursition/ui/primitives/textarea'
import { cn } from '@nmit-coursition/ui/utils'

export interface TextareaWithTextProps extends TextareaProps {
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
  ...rest
}: TextareaWithTextProps) {
  return (
    <div className={cn('grid w-full gap-1.5', containerClassName)}>
      <Label htmlFor={id}>{label}</Label>
      <TextareaPrimitive
        placeholder={placeholder}
        id={id}
        name={id}
        disabled={disabled}
        {...rest}
        className={cn(``, className)}
      />
      {subtext && <p className='text-sm text-muted-foreground'>{subtext}</p>}
    </div>
  )
}
