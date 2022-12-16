import { Button } from "./Button"
import { useState } from "react"

type Props = {
    readonly hiddenText: string
    readonly textButton: string
}

export function Spoiler({ hiddenText, textButton }: Props) {
    const [showHiddenText, setShowHiddenText] = useState<boolean>(true)

    return (
        <>
            {showHiddenText && (
                <Button theme='main' onClick={() => setShowHiddenText(false)}>
                    {textButton}
                </Button>
            )}
            <div className={`mt-2 ${showHiddenText && "blur-sm"}`}>{hiddenText}</div>
        </>
    )
}
