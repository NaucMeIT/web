import * as React from "react"
import { Typography } from "./Typography"
type Props = {
    readonly order: number
    readonly children: React.ReactNode
}

export function Step({ order, children }: Props) {
    return (
        <div className='flex flex-row items-center gap-8'>
            <Typography variant='eyeCatch' className='block w-24'>{`0${order}`}</Typography>
            <div className='flex flex-col'>
                <Typography variant='step'>Krok</Typography>
                <Typography className='max-w-xxs'>{children}</Typography>
            </div>
        </div>
    )
}
