import * as React from 'react'

import { Button, Heading, Html, Link, Section, Text } from '@react-email/components'
import { buttonVariants } from '../../../ui/primitives/src'

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
