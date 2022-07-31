import { Button } from "./Button"
import { Step } from "./Step"
import { Typography } from "./Typography"

export function How() {
  return (
    <section>
      <span id='how'>&nbsp;</span>
      <Typography variant='h2' component='h2' className='mb-8 text-center'>
        Jak to funguje?
      </Typography>
      <div className='mx-auto flex max-w-6xl flex-row flex-wrap items-center justify-center gap-12'>
        <Step order={1}>Zaregistruj se ZDARMA do kurzu</Step>
        <Step order={2}>Zaregistruj se ZDARMA do kurzu</Step>
        <Step order={3}>Zaregistruj se ZDARMA do kurzu</Step>
        <Step order={4}>Zaregistruj se ZDARMA do kurzu</Step>
        <Step order={5}>Zaregistruj se ZDARMA do kurzu</Step>
      </div>
      <Button theme='off' size='large' className='mx-auto my-20 block'>
        Chci se přidat!
      </Button>
    </section>
  )
}
