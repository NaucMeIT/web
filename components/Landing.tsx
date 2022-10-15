import Image from "next/future/image"
import { Button, ButtonProps } from "./Button"
import { CatchPointProps, CatchPoints } from "./CatchPoints"
import { Typography } from "./Typography"

type LandingProps = {
    readonly title: string
    readonly subtitle: string
    readonly text: React.ReactNode
    readonly catchPoints: readonly CatchPointProps[]
    readonly buttonText: string
    readonly buttonProps?: Partial<ButtonProps>
}

export function Landing({ title, subtitle, text, catchPoints, buttonText, buttonProps }: LandingProps) {
    return (
        <header className='flex flex-row flex-wrap items-center justify-center justify-items-center lg:ml-10 lg:mr-20 lg:grid lg:grid-cols-2 px-5'>
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
                    {catchPoints.map(({ icon, children }, index) => (
                        <CatchPoints key={`catch-point-${index}`} icon={icon}>
                            {children}
                        </CatchPoints>
                    ))}
                </div>
                <Button
                    theme='off'
                    size='large'
                    className='mx-auto mb-10 xl:mb-0 xl:mt-20 block xl:mx-0'
                    {...buttonProps}
                >
                    {buttonText}
                </Button>
            </div>
            <Image
                src='/images/main_illustration.svg'
                width={873}
                height={810}
                alt='Ilustrační úvodní obrázek'
                className='order-first w-3/4 lg:w-full 2xl:order-1'
                priority
            />
        </header>
    )
}
