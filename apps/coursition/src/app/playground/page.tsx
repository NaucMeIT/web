import { Button } from '@nmit-coursition/ui/design-system'
import { Airplay } from 'lucide-react'

export default function Test() {
  return (
    <div className='flex flex-col max-w-52 '>
      <Button intent='main' variant='primary' size='cta'>
        Primary Yellow CTA
      </Button>
      <Button intent='main' variant='secondary'>
        Primary Blue
      </Button>
      <Button intent='main' variant='destructive'>
        Destructive Button
      </Button>
      <Button intent='off' variant='outline'>
        Secondary Outline
      </Button>
      <Button intent='off' variant='link'>
        Secondary Link
      </Button>
      <Button intent='main' variant='tertiary' size='sm' icon={<Airplay />} iconPosition='left'>
        Small Primary Green
      </Button>
      <Button intent='main' variant='tertiary' size='sm' icon={<Airplay />} iconPosition='right'>
        Small Primary Green
      </Button>

      <Button>Reaaaaally looooong button</Button>
      <Button isLoading>Reaaaaally looooong button</Button>
    </div>
  )
}
