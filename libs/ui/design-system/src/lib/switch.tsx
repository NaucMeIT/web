import { type VariantProps, cva } from 'class-variance-authority'

import { Label } from '@nmit-coursition/ui/primitives'
import { Switch as SwitchPrimitive, type RootProps } from '@nmit-coursition/ui/primitives/switch'
import { cn } from '@nmit-coursition/ui/utils'

/** todo: import util from `typescript` file when mixins architecure is merged  */
type OverrideProps<T, V> = V & Omit<T, keyof V>

const switchVariants = cva('')

interface Props extends OverrideProps<RootProps, { id: string; name: string }>, VariantProps<typeof switchVariants> {
  label: string
  subText?: string
}

export const Switch = ({ id, className, name, label, subText, ...rest }: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row-reverse items-center justify-center gap-2'>
        <Label htmlFor={id}>{label}</Label>
        <SwitchPrimitive id={id} className={cn(switchVariants({}))} name={name} {...rest} />
      </div>

      {subText && <p className='text-sm'>{subText}</p>}
    </div>
  )
}
