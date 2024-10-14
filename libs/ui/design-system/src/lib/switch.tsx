import { cva, type VariantProps } from 'class-variance-authority'

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

interface Props extends OverrideProps<SwitchPrimitive.RootProps, { id: string }>, VariantProps<typeof switchVariants> {
  label: string
}

export const Switch = ({ id, className, variant, label, ...rest }: Props) => {
  return (
    <div className='flex flex-row-reverse items-center justify-center gap-2'>
      <Label htmlFor={id}>{label}</Label>
      <SwitchPrimitive.Main id={id} className={cn(switchVariants({ variant }))} {...rest} />
    </div>
  )
}
