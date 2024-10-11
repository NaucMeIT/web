import { Textarea, type TextareaWithTextProps } from '@nmit-coursition/design-system'
import * as ButtonPrimitive from '@nmit-coursition/ui/primitives/button'
import { cn } from '@nmit-coursition/ui/utils'
import { type VariantProps, cva } from 'class-variance-authority'

const ctaVariants = cva('', {
  variants: {
    ctaVariant: {
      primary: '', // #FAFF00
      secondary: '', // light-oranged
      disabled: '', // #78716C with white text
    },
  },
  defaultVariants: {
    ctaVariant: 'primary',
  },
})

interface Props extends Omit<TextareaWithTextProps, 'subtext'>, VariantProps<typeof ctaVariants> {
  ctaLabel: string

  /** todo: fix type, doesn't recognize `() => void` for some reason :/ */
  ctaAction: any
}

export const TextAreaSubmit = ({ ctaVariant: variant, ctaAction, ctaLabel, ...props }: Props) => {
  return (
    <form action={ctaAction} className='grid grid-cols-1 gap-2'>
      <Textarea {...props} />
      <ButtonPrimitive.Main className={cn(ctaVariants({ ctaVariant: variant }))} />
    </form>
  )
}
