import { Button } from "./Button"
import { Step } from "./Step"
import { Typography } from "./Typography"

type HowProps = {
    readonly steps: readonly string[]
    readonly buttonText: string
    readonly buttonProps?: any // Partial<ButtonProps>
}

export function How({ steps, buttonText, buttonProps }: HowProps) {
    return (
        <section className='flex flex-col'>
            <span id='how'>&nbsp;</span>
            <Typography variant='h2' component='h2' className='mb-8 text-center'>
                Jak to funguje?
            </Typography>
            <div className='mx-auto flex max-w-6xl flex-row flex-wrap items-center justify-center gap-12'>
                {steps.map((step, index) => (
                    <Step key={`step-${index}`} order={index + 1}>
                        {step}
                    </Step>
                ))}
            </div>
            <Button theme='off' size='large' className='mx-auto my-20 block' {...buttonProps}>
                {buttonText}
            </Button>
        </section>
    )
}
