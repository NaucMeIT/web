import { Button } from "./Button"
import { Typography } from "./Typography"
type Props = {
    readonly price: number
    readonly title: string
    readonly benefits: readonly string[]
    readonly priority?: boolean
}

const packageBoxBorderVars = {
    "--path": "30px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 30px",
    "--border": "2px",
} as React.CSSProperties

export function PackageBox({ priority, title, benefits, price }: Props) {
    return (
        <div
            className={`polygon-path flex h-full w-80 flex-col items-center justify-between gap-4 p-8 ${
                priority ? "before:bg-primary" : "before:bg-form"
            }`}
            style={packageBoxBorderVars}
        >
            <Typography variant='h3'>{title}</Typography>
            <ul className='h-36 list-dash'>
                {benefits.map((benefit) => (
                    <Typography component='li' key={benefit}>
                        {benefit}
                    </Typography>
                ))}
            </ul>
            <Typography variant='h3'>{price} CZK</Typography>
            <Button theme={priority ? "main" : "off"} size='large' className='mx-auto w-fit'>
                Získat balíček
            </Button>
        </div>
    )
}
