import * as React from "react"
import { Typography } from "./Typography"
type Props = {
    readonly icon: React.ReactNode
    readonly children: React.ReactNode
}

export function CatchPoints({ icon, children }: Props) {
    return (
        <div className='flex flex-row items-center justify-between'>
            {icon}
            <Typography className='max-w-xxs w-full'>{children}</Typography>
        </div>
    )
}
