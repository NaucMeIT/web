import { LearnEarn, PayConsultancy, Time, Worldwide } from "./icons"
import { Button } from "./Button"
import { CatchPoints } from "./CatchPoints"
import { Typography } from "./Typography"

export function Landing() {
    return (
        <main className='flex flex-row flex-wrap items-center justify-center px-5'>
            <div>
                <span id='home'>&nbsp;</span>
                <Typography variant='h2' component='h1'>
                    Nauč se programovat
                </Typography>
                <Typography variant='h1' component='h1' className='uppercase'>
                    a nech si za to platit!
                </Typography>
                <Typography component='p' className='max-w-xsProse'>
                    Klademe si za cíl pomoci komukoliv získat dovednosti a{"\u00A0"}znalosti vhodné pro práci v IT. To
                    vše bez časových limitací a za cenu dostupnou pro každého.
                </Typography>
                <div className='mt-20 grid grid-rows-4 md:grid-cols-2 md:grid-rows-2'>
                    <CatchPoints icon={<LearnEarn />}>Učíš se a zároveň vyděláváš</CatchPoints>
                    <CatchPoints icon={<PayConsultancy />}>
                        Platíš pouze za konzultace s{"\u00A0"}odborníkem z oboru
                    </CatchPoints>
                    <CatchPoints icon={<Time />}>
                        Rychlost kurzu si{"\u00A0"}určuješ{"\u00A0"}sám
                    </CatchPoints>
                    <CatchPoints icon={<Worldwide />}>Celý kurz je online přístupný odkudkoliv</CatchPoints>
                </div>
                <Button theme='off' size='large' className='mx-auto mb-10 xl:mb-0 xl:mt-20 block xl:mx-0'>
                    Vyzkoušej ZDARMA
                </Button>
            </div>
            <img
                src='/images/main_illustration.svg'
                width='870px'
                height='726px'
                alt='Ilustrační úvodní obrázek'
                className='order-first w-3/4 lg:w-1/2 2xl:order-1'
            />
        </main>
    )
}
