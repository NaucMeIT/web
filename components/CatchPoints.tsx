import * as React from "react"
import { Typography } from "./Typography"
import { LearnEarn, PayConsultancy, Time, Worldwide } from "./icons"

export type CatchPointProps = {
    readonly children: React.ReactNode
    readonly icon: keyof typeof icons | React.JSX.Element
}

export const icons = {
    LearnEarn: <LearnEarn />,
    Pay: <PayConsultancy />,
    Time: <Time />,
    Worldwide: <Worldwide />,
} as const

export function CatchPoints({ icon, children }: CatchPointProps) {
    const usedIcon = typeof icon === "string" ? icons[icon] : icon
    return (
        <div className='flex flex-row items-center justify-between'>
            {usedIcon}
            <Typography className='max-w-xxs w-full'>{children}</Typography>
        </div>
    )
}
