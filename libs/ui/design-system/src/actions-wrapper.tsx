import { Button, Toast, Tooltip } from '@douyinfe/semi-ui'
import { useContentCopy } from '@nmit-coursition/utils/copy'
import { type FileFormat, useContentDownload } from '@nmit-coursition/utils/download'
import { cn } from '@nmit-coursition/utils/style'
import {
  Children,
  type FC,
  type PropsWithChildren,
  type ReactNode,
  type RefObject,
  createContext,
  isValidElement,
  useContext,
  useRef,
} from 'react'

type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

interface ActionsContextValue {
  contentRef: RefObject<HTMLDivElement>
}

const ActionsContext = createContext<ActionsContextValue | null>(null)

const useActions = () => {
  const context = useContext(ActionsContext)
  if (!context) {
    throw new Error('Action components must be used within an ActionsWrapper')
  }
  return context
}

interface ActionButtonProps {
  onClick: () => void
  icon: ReactNode
  successIcon?: ReactNode
  isActive?: boolean
  title: string
  className?: string
}

const ActionButton = ({ onClick, icon, successIcon, isActive, title, className = '' }: ActionButtonProps) => (
  <Tooltip content={title} showArrow position='top'>
    <Button
      theme='borderless'
      onClick={onClick}
      className={cn('rounded-md transition-colors duration-200 p-2 bg-primary-light', className)}
    >
      <span className='sr-only'>{title}</span>
      {isActive && successIcon ? successIcon : icon}
    </Button>
  </Tooltip>
)

interface ActionsWrapperProps {
  position?: Position
  className?: string
  buttonGroupClassName?: string
}

const getPositionStyles = (position: Position): string => {
  const base = 'absolute flex gap-2 p-2'
  const positions = {
    'top-right': `${base} top-0 right-2`,
    'top-left': `${base} top-0 left-2`,
    'bottom-right': `${base} bottom-2 right-2`,
    'bottom-left': `${base} bottom-2 left-2`,
  }
  return positions[position]
}

export const ActionsWrapper: FC<PropsWithChildren<ActionsWrapperProps>> = ({
  children,
  position = 'top-right',
  className = '',
  buttonGroupClassName = '',
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const childrenArray = Children.toArray(children)
  const content = childrenArray.find((child) => isValidElement(child) && child.type === ActionsContent)
  const actions = childrenArray.filter((child) => isValidElement(child) && child.type !== ActionsContent)

  return (
    <ActionsContext.Provider value={{ contentRef: contentRef as RefObject<HTMLDivElement> }}>
      <div className={`relative ${className}`}>
        {content}
        {actions.length > 0 && (
          <div className={`${getPositionStyles(position)} ${buttonGroupClassName}`}>{actions}</div>
        )}
      </div>
    </ActionsContext.Provider>
  )
}

const ActionsContent: FC<PropsWithChildren> = ({ children }) => {
  const { contentRef } = useActions()
  return <div ref={contentRef}>{children}</div>
}

interface CopyActionProps {
  className?: string
  onSuccess?: () => void
  onError?: (error: Error) => void
}

const CopyAction: FC<CopyActionProps> = ({ className = '', onSuccess, onError }) => {
  const { contentRef } = useActions()
  const { copy, isCopied } = useContentCopy(contentRef, { onSuccess, onError })

  return (
    <ActionButton
      onClick={copy}
      icon={<span className='icon-[material-symbols--content-copy-outline-sharp] size-6 bg-primary' />}
      successIcon={<span className='icon-[material-symbols--check] size-6 bg-success' />}
      isActive={isCopied}
      title='Copy to clipboard'
      className={className}
    />
  )
}

interface DownloadActionProps {
  className?: string
  filename?: string
  format?: FileFormat
  onSuccess?: () => void
  onError?: (error: Error) => void
}

const DownloadAction: FC<DownloadActionProps> = ({
  className = '',
  filename = 'download',
  format = 'txt',
  onSuccess,
  onError,
}) => {
  const { contentRef } = useActions()
  const { download, isDownloaded } = useContentDownload(contentRef, { filename, format, onSuccess, onError })

  return (
    <ActionButton
      onClick={download}
      icon={<span className='icon-[material-symbols--download-2-outline] size-6 bg-primary' />}
      successIcon={<span className='icon-[material-symbols--check-box-outline-sharp] size-6 bg-success' />}
      isActive={isDownloaded}
      title='Download content'
      className={className}
    />
  )
}

interface CustomActionProps extends ActionButtonProps {
  onSuccess?: () => void
}

const CustomAction: FC<CustomActionProps> = (props) => {
  return <ActionButton {...props} />
}

interface DefaultActionBarProps {
  children: ReactNode
  position?: Position
  className?: string
  filename?: string
  format?: FileFormat
}

const DefaultActionBar: FC<DefaultActionBarProps> = ({
  children,
  position = 'top-right',
  className = '',
  filename = 'file',
  format = 'txt',
}) => {
  return (
    <Actions.Wrapper position={position} className={className}>
      <Actions.Content>{children}</Actions.Content>
      <Actions.Copy
        onSuccess={() => Toast.success('Copied to clipboard')}
        onError={(error) => Toast.error(`Copy failed. Reason: ${error.message}`)}
      />
      <Actions.Download
        filename={filename}
        format={format}
        onSuccess={() => Toast.success('Downloaded successfully')}
        onError={(error) => Toast.error(`Download failed. Reason: ${error.message}`)}
      />
    </Actions.Wrapper>
  )
}

export const Actions = {
  DefaultActionBar,
  Wrapper: ActionsWrapper,
  Content: ActionsContent,
  Copy: CopyAction,
  Download: DownloadAction,
  Custom: CustomAction,
}
