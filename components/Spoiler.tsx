import { Button } from "./Button"
import { ReactNode, useState } from "react"

type Props = {
    readonly children: ReactNode
    readonly textButton: string
}

export function Spoiler({ children, textButton }: Props) {
    const [showHiddenText, setShowHiddenText] = useState<boolean>(true)

    return (
        <>
            {showHiddenText && (
                <Button theme='off' onClick={() => setShowHiddenText(false)}>
                    {textButton}
                </Button>
            )}
            <div className={`mt-2 cursor-not-allowed pointer-events-none select-none ${showHiddenText && "blur-sm"}`}>
                {children}
            </div>
        </>
    )
}
