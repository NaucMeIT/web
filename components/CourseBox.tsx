import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { Typography } from "./Typography"

type Props = {
    readonly image: string
    readonly width: number
    readonly height: number
    readonly side: "right" | "left"
    readonly title: string
    readonly children: React.ReactNode
    readonly link?: string
}

export function CourseBox({ image, width, height, side, title, children, link }: Props) {
    return (
        <div
            className={`flex flex-col ${
                side === "left" ? "md:flex-row" : "md:flex-row-reverse"
            } items-center justify-center gap-x-36 gap-y-4 px-5`}
        >
            <Image src={image} width={width} height={height} alt={`Ilustrace ke kurzu ${title}`} loading='lazy' />
            <div className='flex w-fit max-w-lg flex-col'>
                <Typography variant='h3' component='h3' className='mb-8'>
                    {title}
                </Typography>
                <Typography className='max-w-xsProse' component='div'>
                    {children}
                </Typography>
                {link ? (
                    <Typography
                        variant='link'
                        component={Link}
                        componentProps={{ href: link }}
                        className='py-5 underline'
                    >
                        Zjistit více {">"}
                    </Typography>
                ) : null}
            </div>
        </div>
    )
}
