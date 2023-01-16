import * as React from "react"
import { Typography } from "./Typography"
type Props = {
	readonly order: number
	readonly children: React.ReactNode
	readonly title: string
}

export function Problem({ order, children, title }: Props) {
	return (
		<div className='flex flex-row items-center justify-start gap-8 w-full'>
			<Typography variant='eyeCatch' className='block w-24'>{`0${order}`}</Typography>
			<div className='flex flex-col'>
				<Typography variant='step' className='text-left'>
					{title}
				</Typography>
				<Typography className='max-w-prose'>{children}</Typography>
			</div>
		</div>
	)
}
