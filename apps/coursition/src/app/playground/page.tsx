import { Button } from '@nmit-coursition/ui/design-system'
import { Airplay } from 'lucide-react'

export default function Test() {
  return (
    <div className='flex flex-col max-w-52 '>
      <Button intent='primary' variant='yellow' size='cta'>
        Primary Yellow CTA
      </Button>
      <Button intent='primary' variant='blue'>
        Primary Blue
      </Button>
      <Button intent='primary' variant='destructive'>
        Destructive Button
      </Button>
      <Button intent='secondary' variant='outline'>
        Secondary Outline
      </Button>
      <Button intent='secondary' variant='link'>
        Secondary Link
      </Button>
      <Button intent='primary' variant='green' size='sm' icon={<Airplay />} iconPosition='left'>
        Small Primary Green
      </Button>
      <Button intent='primary' variant='green' size='sm' icon={<Airplay />} iconPosition='right'>
        Small Primary Green
      </Button>

      <Button>Reaaaaally looooong button</Button>
      <Button isLoading>Reaaaaally looooong button</Button>
    </div>
  )
}
