import { Button } from "./Button"
import { ReactNode, useState } from "react"

type Props = {
    readonly children: ReactNode
    readonly textButton: string
}

export function Spoiler({ children, textButton }: Props) {
    const [showHiddenText, setShowHiddenText] = useState(true)

    return (
        <div className='relative'>
            {showHiddenText && (
                <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                    <Button className='z-10' theme='off' onClick={() => setShowHiddenText(false)}>
                        {textButton}
                    </Button>
                </div>
            )}
            <div className={`m-4 ${showHiddenText && "cursor-not-allowed pointer-events-none select-none blur-sm"}`}>
                {children}
            </div>
        </div>
    )
}
