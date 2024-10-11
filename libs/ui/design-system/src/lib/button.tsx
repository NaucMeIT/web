import { cn } from '@nmit-coursition/ui/utils'
import { trim } from '@nmit-coursition/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

const buttonVariants = cva(
  trim`
    inline-flex items-center justify-center
    rounded-md whitespace-nowrap
    text-sm font-medium
    ring-offset-background transition-colors
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      intent: {
        main: '',
        off: '',
      },
      grow: {
        false: 'w-min',
        true: 'w-full',
      },
      size: {
        cta: 'h-12 px-6 py-1 text-lg',
        default: 'h-10 px-4 py-1',
        sm: 'h-9 p-3 text-sm',
      },
      variant: {
        primary: 'bg-button-interactive-primary text-text-static-primary hover:bg-button-interactive-primary-hover',
        secondary:
          'bg-button-interactive-secondary text-text-static-primary hover:bg-button-interactive-secondary-hover',
        tertiary: 'bg-green-500 text-text-static-primary hover:bg-green-600',
        destructive: 'bg-button-interactive-alert text-destructive-foreground hover:bg-button-interactive-alert-hover',
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
      intent: 'main',
      grow: false,
      size: 'default',
      variant: 'primary',
      iconPosition: 'left',
    },
  },
)

type ButtonVariantProps = VariantProps<typeof buttonVariants>

interface IntentPrimaryProps {
  intent?: 'main'
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive'
}

interface IntentSecondaryProps {
  intent: 'off'
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
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ intent, size, variant, grow, iconPosition, className }),
          'relative',
          isLoading && 'text-transparent hover:text-transparent',
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        type={type}
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
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
