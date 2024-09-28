import { Button as ButtonPrimitive } from '@nmit-coursition/ui/primitives/button'
import { cn } from '@nmit-coursition/ui/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      intent: {
        primary: '',
        secondary: '',
      },
      grow: {
        false: 'w-min',
        true: 'w-full',
      },
      size: {
        cta: 'h-12 px-6 py-3 text-lg',
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-sm',
      },
      variant: {
        yellow: 'bg-yellow-500 text-white hover:bg-yellow-600',
        blue: 'bg-blue-500 text-white hover:bg-blue-600',
        green: 'bg-green-500 text-white hover:bg-green-600',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      iconPosition: {
        left: 'flex-row',
        right: 'flex-row-reverse',
      },
    },
    defaultVariants: {
      intent: 'primary',
      grow: false,
      size: 'default',
      variant: 'yellow',
      iconPosition: 'left',
    },
  },
)

type ButtonVariantProps = VariantProps<typeof buttonVariants>

interface IntentPrimaryProps {
  intent?: 'primary'
  variant?: 'yellow' | 'blue' | 'green' | 'destructive'
}

interface IntentSecondaryProps {
  intent: 'secondary'
  variant?: 'outline' | 'ghost' | 'link'
}

export type ButtonProps = (IntentPrimaryProps | IntentSecondaryProps) & ButtonBaseProps

type ButtonBaseProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> &
  Omit<ButtonVariantProps, 'intent' | 'variant'> & {
    isLoading?: boolean
    loadingText?: string
    icon?: React.ReactNode
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      intent,
      size,
      variant,
      grow,
      iconPosition,
      isLoading,
      loadingText = 'Loading...',
      icon,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <ButtonPrimitive
        className={cn(
          buttonVariants({ intent, size, variant, grow, iconPosition, className }),
          'relative',
          isLoading && 'text-transparent hover:text-transparent',
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        <span className={cn('contents', isLoading && 'invisible')}>
          {icon && (
            <span className={cn('flex-shrink-0 h-full', iconPosition === 'left' ? 'mr-2' : 'ml-2')}>{icon}</span>
          )}
          {children}
        </span>
        {isLoading && (
          <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-black'>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            {loadingText}
          </span>
        )}
      </ButtonPrimitive>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
