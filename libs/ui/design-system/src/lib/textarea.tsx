import { Label } from '@nmit-coursition/ui/primitives/label'
import { Textarea as TextareaPrimitive } from '@nmit-coursition/ui/primitives/textarea'

interface TextareaWithTextProps extends React.ComponentProps<'textarea'> {
  id: string
  label: string
  placeholder: string
  subtext?: string
  disabled?: boolean
}

export function Textarea({ id, label, placeholder, subtext, disabled, ...rest }: TextareaWithTextProps) {
  return (
    <div className='grid w-full gap-1.5'>
      <Label htmlFor={id}>{label}</Label>
      <TextareaPrimitive placeholder={placeholder} id={id} name={id} disabled={disabled} {...rest} />
      {subtext && <p className='text-sm text-muted-foreground'>{subtext}</p>}
    </div>
  )
}
