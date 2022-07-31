import NextHead from "next/head"
import React from "react"

type HeadProps = {
    readonly desc: string
    readonly twImg: string
    readonly fbImg: string
    readonly url: string
    readonly children: React.ReactNode
}

export const Head = (props: HeadProps) => (
    <NextHead>
        <meta name='Description' key='desc' content={props.desc} />
        <meta name='twitter:description' key='tw:desc' content={props.desc} />
        <meta property='og:description' key='og:desc' content={props.desc} />
        <meta name='twitter:image' key='tw:image' content={props.twImg} />
        <meta name='twitter:url' key='tw:url' content={props.url} />
        <meta property='og:url' key='og:url' content={props.url} />
        <meta property='og:image' key='og:image' content={props.fbImg} />
        {props.children}
    </NextHead>
)
