'use client'

import { type RefObject, useCallback, useState } from 'react'

interface UseContentCopyOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export const copyContent = async (element: HTMLElement, options?: UseContentCopyOptions): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.ClipboardItem) {
      const types = {
        'text/html': new Blob([element.innerHTML], { type: 'text/html' }),
        'text/plain': new Blob([element.textContent || ''], { type: 'text/plain' }),
      }
      await navigator.clipboard.write([new ClipboardItem(types)])
    } else {
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(element)
      selection?.removeAllRanges()
      selection?.addRange(range)
      document.execCommand('copy')
      selection?.removeAllRanges()
    }

    options?.onSuccess?.()
    return true
  } catch (error) {
    const e = error instanceof Error ? error : new Error('Copy failed')
    options?.onError?.(e)
    return false
  }
}

export const useContentCopy = (elementRef: RefObject<HTMLElement>, options?: UseContentCopyOptions) => {
  const [isCopied, setIsCopied] = useState(false)

  const copy = useCallback(async () => {
    if (!elementRef.current) return false

    const success = await copyContent(elementRef.current, {
      onSuccess: () => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
        options?.onSuccess?.()
      },
      onError: options?.onError,
    })

    return success
  }, [elementRef, options])

  return { copy, isCopied }
}
