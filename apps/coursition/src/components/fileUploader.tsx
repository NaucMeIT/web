import 'filepond/dist/filepond.min.css'
import './fileUploader.css'

import * as React from 'react'
import * as ReactFilePond from 'react-filepond'
import { toast } from 'sonner'

/** Walkaround, the creators of react-filepond promised to use the navive file object soon */
export type ActualFileObject = Blob & { readonly lastModified: number; readonly name: string }

interface Props<T = ActualFileObject> extends React.ComponentPropsWithRef<typeof ReactFilePond.FilePond> {
  labelIdle?: string
  value: readonly T[]
  onChange: React.Dispatch<React.SetStateAction<T[]>>
}

export const FileUploader = ({ labelIdle = 'Drag and drop a file here or click', value, onChange, ...rest }: Props) => {
  const [files, setFiles] = React.useState<ReactFilePond.FilePondProps['files']>(
    value?.map((file) => ({
      source: file.name,
      options: {
        type: 'local',
        metadata: { name: file.name },
        file: {
          name: file.name,
          type: file.type,
          size: file.size,
        },
      },
    })),
  )

  return (
    <ReactFilePond.FilePond
      labelIdle={labelIdle}
      credits={false}
      forceRevert={false}
      files={files}
      onupdatefiles={(newFiles) => {
        setFiles(newFiles.map((newFile) => newFile.file))
        onChange?.(newFiles.map((newFile) => newFile.file))
      }}
      onprocessfile={(error, file) => {
        if (error?.type) toast.error(error.body)
        return onChange?.((prev) => [...prev, file.source as ActualFileObject])
      }}
      onremovefile={(error, file) => {
        if (error?.code) return toast.error(error.body)
        return onChange?.((prev) => prev.filter((el) => el.name !== file.filename))
      }}
      {...rest}
    />
  )
}
