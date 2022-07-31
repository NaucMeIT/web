import { Button } from "./Button"
import { Typography } from "./Typography"
export function CompanyBox() {
  return (
    <div className='my-20 bg-alt py-16'>
      <span id='company'>&nbsp;</span>
      <Typography variant='h2' className='mb-11 block text-center' component='h2'>
        Chcete s námi spolupracovat?
      </Typography>
      <Typography variant='normal' className='mb-6 text-center' component='p'>
        Hledáte zaměstnance a chcete se s námi spolupracovat?
      </Typography>
      <Button theme='off' size='large' className='mx-auto block' onClick={() => undefined}>
        Chci zaměstnance
      </Button>
    </div>
  )
}
