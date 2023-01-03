import { Button } from "./Button"
import { useState } from "react"
import * as React from "react"

type Props = {
    readonly children: React.ReactNode
    readonly textButton: string
}

export function Spoiler({ children, textButton }: Props) {
    const [showHiddenText, setShowHiddenText] = useState(true)

    return (
        <>
            <div className='z-10 absolute my-14 ml-4 sm:ml-8 md:ml-12 lg:ml-20 xl:ml-32 2xl:ml-64'>
                {showHiddenText && (
                    <Button theme='main' onClick={() => setShowHiddenText(false)}>
                        {textButton}
                    </Button>
                )}
            </div>
            <div
                className={`w-1/3 m-4 cursor-not-allowed pointer-events-none select-none ${
                    showHiddenText && "blur-sm"
                }`}
            >
                {children}
            </div>
        </>
    )
}
