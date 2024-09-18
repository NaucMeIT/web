import { buttonVariants } from '@nmit-coursition/ui/primitives'
import { Button, Heading, Html, Link, Section } from '@react-email/components'

interface Props {
  link: string
}

export const ResetPasswordEmailTemplate = ({ link }: Props) => {
  return (
    <Html lang='en'>
      <Section className='my-6'>
        <Heading as='h2'>Hi, plese click on the reset button to reset your password</Heading>
        <Button className={buttonVariants({ variant: 'default', size: 'lg' })}>
          <Link href={link}>Reset</Link>
        </Button>
      </Section>
    </Html>
  )
}
