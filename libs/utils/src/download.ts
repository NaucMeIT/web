'use client'

import { type RefObject, useCallback, useState } from 'react'

export type FileFormat = 'txt' | 'html' | 'md'

interface UseContentDownloadOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  filename?: string
  format?: FileFormat
}

const getMimeType = (format: FileFormat): string =>
  ({
    txt: 'text/plain',
    html: 'text/html',
    md: 'text/markdown',
  })[format]

const getFileExtension = (format: FileFormat): string =>
  ({
    txt: '.txt',
    html: '.html',
    md: '.md',
  })[format]

const sanitizeFilename = (filename: string, format: FileFormat): string => {
  const sanitized = filename.replaceAll(/[<>:"/\\|?*]/g, '-')
  const extension = getFileExtension(format)
  return sanitized.toLowerCase().endsWith(extension) ? sanitized : sanitized + extension
}

export const downloadContent = (element: HTMLElement, options?: UseContentDownloadOptions): boolean => {
  try {
    const format = options?.format ?? 'txt'
    const filename = options?.filename ?? 'download'
    const mimeType = getMimeType(format)
    const sanitizedFilename = sanitizeFilename(filename, format)

    const content = format === 'html' ? element.innerHTML : element.textContent || ''
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = sanitizedFilename
    document.body.append(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    options?.onSuccess?.()
    return true
  } catch (error) {
    const e = error instanceof Error ? error : new Error('Download failed')
    options?.onError?.(e)
    return false
  }
}

export const useContentDownload = (elementRef: RefObject<HTMLElement>, options?: UseContentDownloadOptions) => {
  const [isDownloaded, setIsDownloaded] = useState(false)

  const download = useCallback(async () => {
    if (!elementRef.current) return false

    const success = await downloadContent(elementRef.current, {
      ...options,
      onSuccess: () => {
        setIsDownloaded(true)
        setTimeout(() => setIsDownloaded(false), 2000)
        options?.onSuccess?.()
      },
    })

    return success
  }, [elementRef, options])

  return { download, isDownloaded }
}
