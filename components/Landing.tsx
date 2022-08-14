import { Button, ButtonProps } from "./Button"
import { CatchPointProps, CatchPoints } from "./CatchPoints"
import { Typography } from "./Typography"

type LandingProps = {
    readonly title: string
    readonly subtitle: string
    readonly text: React.ReactNode
    readonly catchPoints: readonly CatchPointProps[]
    readonly buttonText: string
    readonly buttonProps?: ButtonProps
}

export function Landing({ title, subtitle, text, catchPoints, buttonText }: LandingProps) {
    return (
        <header className='flex flex-row flex-wrap items-center justify-center px-5'>
            <div>
                <span id='home'>&nbsp;</span>
                <Typography variant='h2' component='h1'>
                    {title}
                </Typography>
                <Typography variant='h1' component='h1' className='uppercase'>
                    {subtitle}
                </Typography>
                <Typography component='p' className='max-w-xsProse'>
                    {text}
                </Typography>
                <div className='mt-20 grid grid-rows-4 md:grid-cols-2 md:grid-rows-2'>
                    {catchPoints.map(({ icon, children }) => (
                        <CatchPoints icon={icon}>{children}</CatchPoints>
                    ))}
                </div>
                <Button theme='off' size='large' className='mx-auto mb-10 xl:mb-0 xl:mt-20 block xl:mx-0'>
                    {buttonText}
                </Button>
            </div>
            <img
                src='/images/main_illustration.svg'
                width='870px'
                height='726px'
                alt='Ilustrační úvodní obrázek'
                className='order-first w-3/4 lg:w-1/2 2xl:order-1'
            />
        </header>
    )
}
