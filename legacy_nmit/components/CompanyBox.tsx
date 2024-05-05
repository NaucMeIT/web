import { Button } from "./Button"
import { Typography } from "./Typography"
export function CompanyBox() {
    return (
        <section className='my-36 bg-alt py-16 flex flex-col'>
            <span id='company'>&nbsp;</span>
            <Typography variant='h2' className='mb-11 block text-center' component='h2'>
                Chcete s námi spolupracovat?
            </Typography>
            <Typography className='mb-6 text-center' component='p'>
                Hledáte zaměstnance a chcete se s námi spolupracovat?
            </Typography>
            <Button theme='off' size='large' className='w-max mx-auto block' href='/'>
                Chci zaměstnance
            </Button>
        </section>
    )
}
