'use client'

import { Button } from '@nmit-coursition/design-system'
import { cn } from '@nmit-coursition/ui/utils'
import { X as DeleteIcon } from 'lucide-react'
import { useState } from 'react'
import { useDropzone, type DropzoneOptions } from 'react-dropzone'

interface Props extends DropzoneOptions {
  idleMessage?: string
  dropZoneMessage?: string
  className?: string

  // todo: improve composability with mixins
  inputName: string
}

export const FileDropper = ({ dropZoneMessage, idleMessage, className, inputName, ...forwardedProps }: Props) => {
  const [files, setFiles] = useState<File[]>([])

  const onDropAccepted = (acceptedFiles: File[]): void => {
    const newFiles = acceptedFiles.map((file) => {
      return new File([file], file.name, {
        type: file.type,
        /** lastModified is used as the fileId, hence why it needs to be unique */
        lastModified: Date.now(),
      })
    }) as File[]

    setFiles((prev) => [...prev, ...newFiles])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDropAccepted, ...forwardedProps })

  return (
    <div {...getRootProps()} className={cn('bg-blue-50 rounded-md py-4 px-12', className)}>
      <input name={inputName} {...getInputProps()} />

      <ul className='grid grid-cols-1 gap-2'>
        {files.map((file) => (
          <li key={file.name} className='h-8 w-full relative bg-blue-300 flex items-center justify-center'>
            {file.name}

            <Button
              variant='outline'
              size='lg'
              className='absolute p-0 top-0 -right-1 h-max rounded-full'
              onClick={(e) => {
                /** prevents the button from triggering the input */
                e.stopPropagation()
                setFiles((prev) => prev.filter(({ lastModified }) => lastModified !== file.lastModified))
              }}
            >
              <DeleteIcon size={18} />
            </Button>
          </li>
        ))}
      </ul>

      {isDragActive ? <p>{dropZoneMessage}</p> : <p>{idleMessage}</p>}
    </div>
  )
}
