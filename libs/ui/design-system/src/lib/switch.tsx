import { type VariantProps, cva } from 'class-variance-authority'

import { Label } from '@nmit-coursition/ui/primitives'
import * as SwitchPrimitive from '@nmit-coursition/ui/primitives/switch'
import { cn } from '@nmit-coursition/ui/utils'

/** todo: import util from `typescript` file when mixins architecure is merged  */
type OverrideProps<T, V> = V & Omit<T, keyof V>

const switchVariants = cva('', {
  variants: {
    variant: {
      /**
       * OFF: bg-#4A044E, thumb-#FEF3C7
       * ON: bg-[#FEF3C7], thumb-[#4A044E]
       */
      default: '',
      disabled: '',
      outlined: '', // default variant with an outline
      critical: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface Props
  extends OverrideProps<SwitchPrimitive.RootProps, { id: string; name: string }>,
    VariantProps<typeof switchVariants> {
  label: string
  subText?: string
}

export const Switch = ({ id, className, name, variant, label, subText, ...rest }: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row-reverse items-center justify-center gap-2'>
        <Label htmlFor={id}>{label}</Label>
        <SwitchPrimitive.Main id={id} className={cn(switchVariants({ variant }))} name={name} {...rest} />
      </div>

      {subText && <p className='text-sm'>{subText}</p>}
    </div>
  )
}
