import { Label } from '@nmit-coursition/ui/primitives/label'
import { Textarea as TextareaPrimitive } from '@nmit-coursition/ui/primitives/textarea'

interface TextareaWithTextProps {
  id: string
  label: string
  placeholder: string
  subtext?: string
  disabled?: boolean
}

export function Textarea({ id, label, placeholder, subtext, disabled }: TextareaWithTextProps) {
  return (
    <div className='grid w-full gap-1.5'>
      <Label htmlFor={id}>{label}</Label>
      <TextareaPrimitive placeholder={placeholder} id={id} name={id} disabled={disabled} />
      {subtext && <p className='text-sm text-muted-foreground'>{subtext}</p>}
    </div>
  )
}
