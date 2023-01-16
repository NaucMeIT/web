import * as React from "react"
import { Typography } from "./Typography"

export type CatchPointProps = {
	readonly icon: React.ReactNode
	readonly children: React.ReactNode
}

export function CatchPoints({ icon, children }: CatchPointProps) {
	return (
		<div className='flex flex-row items-center justify-between'>
			{icon}
			<Typography className='max-w-xxs w-full'>{children}</Typography>
		</div>
	)
}
