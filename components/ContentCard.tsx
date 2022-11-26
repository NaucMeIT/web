import { Button } from "./Button"
import { Typography } from "./Typography"

type Props = {
    readonly title: string
    readonly phrase: string
    readonly href: string
    readonly children?: React.ReactElement
    readonly priority?: boolean
    readonly small?: boolean
}

const packageBoxBorderVars = {
    "--path": "30px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 30px",
    "--border": "2px",
    contain: "strict",
} as React.CSSProperties

export function ContentCard({ title, children, phrase, href, priority, small }: Props) {
    const height = small ? "h-[360px]" : "h-[400px]"
    return (
        <div
            className={`polygon-path flex w-80 ${height} flex-col items-center justify-between gap-4 ${
                small ? "p-4 opacity-90" : "p-8"
            } ${priority ? "before:bg-primary" : "before:bg-form [&:has(input:checked)]:before:bg-primary"}`}
            style={packageBoxBorderVars}
        >
            <Typography variant='h3'>{title}</Typography>
            {children}
            <Button href={href} theme={priority ? "main" : "off"} className='mx-auto w-fit'>
                {phrase}
            </Button>
        </div>
    )
}
