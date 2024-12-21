import { CircleCheckIcon, LoaderIcon, MonitorStopIcon } from './icons'

interface State<T extends string> {
  key: T
  text: string
}

interface StatusDisplayProps<T extends string> {
  states: State<T>[]
  status: NoInfer<T>
}

export const StatusDisplay = <T extends string>({ states, status }: StatusDisplayProps<T>) => {
  const currentIndex = states.findIndex((state) => state.key === status)

  const renderStatusCard = (state: { text: string; key: string }, index: number) => {
    const { icon, textClass } = (() => {
      if (index < currentIndex) {
        return {
          icon: <CircleCheckIcon className='text-green-500 h-6 w-6' />,
          textClass: 'text-gray-700',
        }
      }
      if (index === currentIndex) {
        return {
          icon: <LoaderIcon className='text-gray-500 h-6 w-6 animate-spin' />,
          textClass: 'text-gray-700',
        }
      }
      return {
        icon: <MonitorStopIcon className='text-gray-400 h-6 w-6' />,
        textClass: 'text-gray-500',
      }
    })()

    return (
      <div key={state.key} className='p-4 bg-white flex items-center space-x-4'>
        {icon}
        <span className={`text-lg font-medium ${textClass}`}>{state.text}</span>
      </div>
    )
  }

  return <div>{states.map((state, index) => renderStatusCard(state, index))}</div>
}
