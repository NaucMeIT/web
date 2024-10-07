'use client'

import { CheckCircle, Download } from 'lucide-react'
import { type FC, type PropsWithChildren, useRef, useState } from 'react'
import { toast } from 'sonner'

type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
type FileFormat = 'txt' | 'html' | 'md'

interface DownloadWrapperProps {
  filename?: string
  format?: FileFormat
  position?: Position
  showDownloadButton?: boolean
  onDownloadSuccess?: () => void
  onDownloadError?: (error: Error) => void
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

const getMimeType = (format: FileFormat): string => {
  const mimeTypes = {
    txt: 'text/plain',
    html: 'text/html',
    md: 'text/markdown',
  }
  return mimeTypes[format]
}

const getFileExtension = (format: FileFormat): string => {
  const extensions = {
    txt: '.txt',
    html: '.html',
    md: '.md',
  }
  return extensions[format]
}

const sanitizeFilename = (filename: string, format: FileFormat): string => {
  // Remove invalid filename characters and ensure proper extension
  const sanitized = filename.replaceAll(/[<>:"/\\|?*]/g, '-')
  const extension = getFileExtension(format)

  if (sanitized.toLowerCase().endsWith(extension)) {
    return sanitized
  }
  return sanitized + extension
}

const formatContent = (content: HTMLDivElement, format: FileFormat): string => {
  switch (format) {
    case 'html':
      return content.innerHTML
    case 'md':
      // TODO: Convert to proper markdown
      return content.textContent || ''
    case 'txt':
      return content.textContent || ''
  }
}

export const DownloadWrapper: FC<PropsWithChildren<DownloadWrapperProps>> = ({
  children,
  filename = 'download',
  format = 'txt',
  position = 'top-right',
  showDownloadButton = true,
  onDownloadSuccess = () => {
    toast.success('Download started.')
  },
  onDownloadError = (error) => {
    toast.error(`Failed to start downloading - ${error}`)
  },
  className = '',
  buttonClassName = '',
}) => {
  const [isDownloaded, setIsDownloaded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const downloadContent = () => {
    try {
      if (!contentRef.current) return

      const mimeType = getMimeType(format)
      const sanitizedFilename = sanitizeFilename(filename, format)

      const content: string = formatContent(contentRef.current, format)

      // Create blob and download
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = sanitizedFilename
      document.body.append(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      // Show success state
      setIsDownloaded(true)
      onDownloadSuccess?.()

      // Reset downloaded state after 2 seconds
      setTimeout(() => setIsDownloaded(false), 2000)
    } catch (error) {
      const e = error instanceof Error ? error : new Error('Download failed')
      onDownloadError?.(e)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={contentRef}>{children}</div>

      {showDownloadButton && (
        <button
          type='button'
          onClick={downloadContent}
          className={`
            ${getPositionStyles(position)}
            rounded-md hover:bg-gray-100 transition-colors
            duration-200 focus:outline-none focus:ring-2
            focus:ring-offset-2 focus:ring-blue-500
            ${buttonClassName}
          `}
          aria-label='Download content'
          title='Download content'
        >
          {isDownloaded ? (
            <CheckCircle className='w-5 h-5 text-green-500' />
          ) : (
            <Download className='w-5 h-5 text-gray-500' />
          )}
        </button>
      )}
    </div>
  )
}
