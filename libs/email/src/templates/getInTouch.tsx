import { Heading, Html, Section, Text } from '@react-email/components'

interface Props {
  email: string
  fullName: string
  comment?: string
}

export const GetInTouchEmailTemplate = ({ email, fullName, comment }: Props) => (
  <Html lang='en'>
    <Section className='my-6'>
      <Heading as='h2'>Invitation to collaborate with coursition</Heading>
      <Text>Email: {email}</Text>
      <Text>FullName: {fullName}</Text>
      <Text>Comment: {comment}</Text>
    </Section>
  </Html>
)
