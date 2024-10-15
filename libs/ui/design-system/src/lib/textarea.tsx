import { Label } from '@nmit-coursition/ui/primitives/label'
import * as TextareaPrimitive from '@nmit-coursition/ui/primitives/textarea'
import { cn } from '@nmit-coursition/ui/utils'

export interface TextareaWithTextProps extends TextareaPrimitive.RootProps {
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
      <TextareaPrimitive.Main
        placeholder={placeholder}
        id={id}
        name={id}
        disabled={disabled}
        {...rest}
        // todo: add base and focus styles
        className={cn(``, className)}
      />
      {subtext && <p className='text-sm text-muted-foreground'>{subtext}</p>}
    </div>
  )
}
