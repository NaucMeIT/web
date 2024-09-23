import 'filepond/dist/filepond.min.css'
import './fileUploader.css'

import * as React from 'react'
import * as ReactFilePond from 'react-filepond'
import { toast } from 'sonner'

interface ServerFileMetadata {
  url: string
  name: string
  size: number
  type: string
}

interface Props extends React.ComponentPropsWithRef<typeof ReactFilePond.FilePond> {
  labelIdle?: string
  value?: readonly ServerFileMetadata[]
  onChange?: (setFiles: (prevFiles: ServerFileMetadata[]) => ServerFileMetadata[]) => void
}

export const FileUploader = ({ labelIdle = 'Drag and drop a file here or click', value, onChange }: Props) => {
  const [files, setFiles] = React.useState<ReactFilePond.FilePondProps['files']>(
    value?.map((file) => ({
      source: file.url,
      options: {
        type: 'local',
        metadata: { url: file.url },
        file: {
          name: file.name,
          url: file.url,
          type: file.type,
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
      onupdatefiles={(newFiles) => setFiles(newFiles.map((newFile) => newFile.file))}
      onprocessfile={(error, file) => {
        if (error?.type) return toast.error(error.body)
        return onChange?.((files) => [
          ...files,
          { name: file.filename, size: file.fileSize, type: file.fileType, url: file.serverId },
        ])
      }}
      onremovefile={(error, file) => {
        if (error?.code) return toast.error(error.body)
        return onChange?.((prev) => prev.filter((el) => el.url !== file.getMetadata('url')))
      }}
    />
  )
}
