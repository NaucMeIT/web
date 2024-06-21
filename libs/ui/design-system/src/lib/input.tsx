import { Input as InputPrimitive } from '@nmit-coursition/ui/primitives/input'
import { Label } from '@nmit-coursition/ui/primitives/label'

interface InputProps {
  label: string
  placeholder: string
  type: string
  id: string
  subtext?: string
  disabled?: boolean
}

export function Input({ label, placeholder, type, id, subtext, disabled }: InputProps) {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor={id}>{label}</Label>
      <InputPrimitive type={type} id={id} placeholder={placeholder} disabled={disabled} />
      {subtext && <p className='text-sm text-muted-foreground'>{subtext}</p>}
    </div>
  )
}
