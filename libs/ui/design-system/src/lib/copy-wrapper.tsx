'use client'

import { CheckCircle, Copy } from 'lucide-react'
import { type FC, type PropsWithChildren, useRef, useState } from 'react'
import { toast } from 'sonner'

type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

interface CopyWrapperProps {
  showCopyButton?: boolean
  position?: Position
  onCopySuccess?: () => void
  onCopyError?: (error: Error | string) => void
  className?: string
  buttonClassName?: string
}

const getPositionStyles = (position: Position): string => {
  const base = 'absolute p-2'
  const positions = {
    'top-right': `${base} top-2 right-2`,
    'top-left': `${base} top-2 left-2`,
    'bottom-right': `${base} bottom-2 right-2`,
    'bottom-left': `${base} bottom-2 left-2`,
  }
  return positions[position]
}

export const CopyWrapper: FC<PropsWithChildren<CopyWrapperProps>> = ({
  children,
  showCopyButton = true,
  position = 'top-right',
  onCopySuccess = () => {
    toast.success('Copied to clipboard')
  },
  onCopyError = (error) => {
    toast.error(`Failed to copy to clipboard - ${error}`)
  },
  className = '',
  buttonClassName = '',
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const copyContent = async () => {
    try {
      if (!contentRef.current) return

      // Create a selection range
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(contentRef.current)

      // Clear any existing selections
      selection?.removeAllRanges()
      selection?.addRange(range)

      // Try to copy using the new Clipboard API first
      if (navigator.clipboard && window.ClipboardItem) {
        const types = {
          'text/html': new Blob([contentRef.current.innerHTML], { type: 'text/html' }),
          'text/plain': new Blob([contentRef.current.textContent || ''], { type: 'text/plain' }),
        }

        await navigator.clipboard.write([new ClipboardItem(types)])
      } else {
        // Fallback to the older execCommand method
        document.execCommand('copy')
      }

      // Clear selection
      selection?.removeAllRanges()

      // Show success state
      setIsCopied(true)
      onCopySuccess?.()

      // Reset copied state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      if (typeof error === 'string') {
        onCopyError?.(error)
      } else if (error instanceof Error) {
        onCopyError?.(error.message)
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={contentRef}>{children}</div>

      {showCopyButton && (
        <button
          type='button'
          onClick={copyContent}
          className={`
            ${getPositionStyles(position)}
            rounded-md hover:bg-gray-100 transition-colors
            duration-200 focus:outline-none focus:ring-2
            focus:ring-offset-2 focus:ring-blue-500
            ${buttonClassName}
          `}
          aria-label='Copy content'
          title='Copy to clipboard'
        >
          {isCopied ? <CheckCircle className='w-5 h-5 text-green-500' /> : <Copy className='w-5 h-5 text-gray-500' />}
        </button>
      )}
    </div>
  )
}
