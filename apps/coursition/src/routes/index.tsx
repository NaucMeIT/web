import {
  IconArrowUpRight,
  IconClock,
  IconCustomerSupport,
  IconDescend2,
  IconExit,
  IconFastForward,
  IconLikeHeart,
  IconLock,
  IconPercentage,
  IconSafe,
  IconSearch,
  IconSync,
  IconTextRectangle,
  IconUpload,
} from '@douyinfe/semi-icons'
import { Button, Form, Toast } from '@douyinfe/semi-ui'
import type { ButtonProps } from '@douyinfe/semi-ui/lib/es/button'
import { publicConfig } from '@nmit-coursition/env/typed'
import { createSafeKey } from '@nmit-coursition/utils/string'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Effect } from 'effect'

export const Route = createFileRoute('/')({
  component: Index,
})

const typedPublic = Effect.runSync(publicConfig)

type BuyLifetimeProps = ButtonProps & {
  withIcon?: boolean
}

const BuyLifetime = ({ withIcon = true, ...rest }: BuyLifetimeProps) => {
  return (
    <a href={`${typedPublic.BACKEND_URL.href}/auth/login`} className='w-min'>
      <Button
        {...rest}
        className='w-min h-16 text-2xl'
        theme='solid'
        size='large'
        iconPosition='right'
        icon={withIcon && <IconArrowUpRight />}
      >
        Get lifetime deal
      </Button>
    </a>
  )
}

const GetInTouch = () => {
  const handleSubmit = async () => {
    try {
      // await getInTouch(formdata)
      Toast.success('Invitation successfully sent')
    } catch (error: unknown) {
      if (error instanceof Error) {
        Toast.error(error.message)
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit} className='w-xl mx-auto'>
      <Form.Input field='email' type='email' label='Email' required placeholder='e.g. johndoe@example.com' />

      <Form.Input field='firstName' label='First name' placeholder='e.g. John' type='text' />
      <Form.Input field='lastName' label='Last name' placeholder='e.g. Doe' type='text' />
      <Form.TextArea
        field='comment'
        placeholder='e.g. Is it possible to self-host?'
        label='Questions or comments'
        rows={5}
        autosize
        required
      />
      <Button htmlType='submit'>Talk with us</Button>
    </Form>
  )
}

const actions = [
  { name: 'fastest', icon: IconFastForward },
  { name: 'most-accurate', icon: IconPercentage },
  { name: 'privacy-first', icon: IconSafe },
  { name: 'cost-effective', icon: IconDescend2 },
]

const benefits = [
  { text: 'From speech to text in record time.', icon: IconClock },
  {
    text: 'Lost in playback? Found in transcript. Crystal clear.',
    icon: IconSearch,
  },
  {
    text: 'Upgrade your audio. Effortless text transformation.',
    icon: IconLikeHeart,
  },
]

const promises = [
  {
    header: 'Top accuracy',
    description:
      'We guarantee ongoing improvements in transcription accuracy, ensuring your lifetime investment grows in value over time.',
    icon: IconLock,
  },
  {
    header: 'Lifetime access',
    description:
      'One purchase grants you unlimited transcriptions for life, with no hidden fees or subscription traps.',
    icon: IconFastForward,
  },
  {
    header: 'Adaptable technology',
    description:
      'As audio and video formats evolve, our software will adapt, future-proofing your transcription capabilities.',
    icon: IconSync,
  },
  {
    header: 'Unwavering support',
    description:
      'Our dedicated team provides continuous technical assistance, safeguarding your long-term transcription needs.',
    icon: IconCustomerSupport,
  },
]

const consequences = [
  {
    problem: 'Important meeting recorded, but no way to quickly review key points.',
    consequence: '=> "What was that action item again?" Cue endless audio scrolling.',
  },
  {
    problem: 'Brilliant podcast insights, but sharing means manual note-taking.',
    consequence: '=> Love that podcast gem? Hope you enjoy pausing and typing.',
  },
  {
    problem: "Hours of video content, but can't find that crucial quote.",
    consequence: '=> Needle in a haystack? More like a word in a 3-hour video.',
  },
]

const steps = [
  { text: '1. Sign up for our lifetime deal.', icon: IconExit },
  { text: '2. Upload any video or audio file', icon: IconUpload },
  { text: '3. Get accurate transcripts instantly', icon: IconTextRectangle },
]

export default function Index() {
  return (
    <div>
      <main className='mx-auto p-6 md:p-12 flex flex-col'>
        <header className='w-full max-w-7xl mx-auto'>
          <ul className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2'>
            {actions.map((it) => (
              <li key={it.name} className='flex items-center justify-center sm:justify-start gap-2'>
                <it.icon size='extra-large' />
                <span className='uppercase text-sm'>{it.name}</span>
              </li>
            ))}
          </ul>
        </header>

        <section className='mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-4 justify-center'>
            <b className='text-xl font-semibold'>For any video & audio</b>
            <h3 className='font-semibold text-5xl'>Get best transcription in no time.</h3>
            <p className='text-lg font-semibold'>
              From podcasts to lectures, interviews to vlogs - we outperform competitors in speed and accuracy.
            </p>
            <p className='text-lg'>
              Secure, cost-effective transcription. Your media, instantly processed, never stored.
            </p>

            <BuyLifetime />
          </div>

          <div className='h-full items-center justify-center hidden md:flex rotate-6'>
            <img
              decoding='sync'
              alt="Media upload interface for transcription services. Contains a dropzone for video/audio files with drag-and-drop functionality. Below are two input fields: one for specifying video language using keycodes (e.g., en-GB), and another for listing difficult-to-transcribe words. A blue 'Transcribe' button appears at the bottom. Interface also includes a URL tab option alongside the File upload tab."
              src='./transcribe.avif'
            />
          </div>
        </section>

        <section className='mt-12 text-black flex'>
          <div className='max-w-5xl flex flex-col gap-5 mx-auto'>
            <ul className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'>
              {benefits.map((it) => (
                <li key={it.text} className='flex flex-col gap-4 items-center text-center'>
                  <it.icon size='extra-large' />
                  <span className='font-semibold max-w-60'>{it.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className='semi-always-dark bg-bg-0 text-text-1 mt-8 -mx-12'>
          <div className='flex items-center justify-center font-semibold text-2xl py-7 text-center px-8'>
            Maximize the value of video content by making every word searchable.
          </div>
        </section>

        <section>
          <div className='w-full flex h-[40dvh] min-h-96 items-center justify-center mt-8'>
            <iframe
              className='w-full h-full'
              src='https://app.supademo.com/embed/cm6bcgyfj0cwm4jcqtqf1u7x0?embed_v=2'
              loading='lazy'
              title='Coursition - Transcription demo'
              allow='clipboard-write'
              frameBorder='0'
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <section className='py-8 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-7xl mx-auto'>
            <h4 className='font-semibold text-2xl text-center mb-6'>Lacking transcription?</h4>
            <div className='flex flex-col lg:justify-center lg:items-center space-y-4'>
              {consequences.map((item) => (
                <div key={createSafeKey(item.problem)} className='flex-1 flex-row text-sm lg:text-base'>
                  <span className='font-medium'>{item.problem}</span>
                  <span className='mt-1'>{item.consequence}</span>
                </div>
              ))}
            </div>
            <h4 className='font-semibold text-2xl text-center mt-8'>Time to unlock your content</h4>
            <div className='flex justify-center mt-6'>
              <BuyLifetime />
            </div>
          </div>
        </section>

        <section className='mt-12 py-6 text-black flex flex-col gap-4 items-center justify-center'>
          <h4 className='font-semibold text-2xl'>Why us?</h4>
          <p className='w-3/4 max-w-96'>
            Simplify your media. Best AI transcription, under your control. User-friendly interface, flexible pricing.
            Make videos searchable and AI-ready. For creators, businesses, and consumers.
          </p>

          <BuyLifetime className='mt-4' />
        </section>

        <section className='mt-12 container mx-auto grid grid-cols-1 md:grid-cols-2'>
          <div className='h-full items-center justify-center hidden md:flex -rotate-6'>
            <img
              alt='Video subtitle editor interface showing four consecutive timestamps from 00:00:05 to 00:00:13, with their corresponding dialogue lines about AI hype and productivity. Tabs for SRT, VTT (selected), and Raw formats are visible, with copy and download buttons in the top right.'
              src='./transcript.png'
              decoding='async'
              loading='lazy'
            />
          </div>

          <div className='flex flex-col gap-6'>
            <h3 className='font-semibold text-4xl'>Smart transcription on your terms</h3>

            <p className='text-xl'>
              Smart transcripts, your way. Easy to start, simple to use. We tackle the tough stuff - quality, speed, and
              data safety. Made for real people, always improving. Your content changes? We change too.
            </p>

            <BuyLifetime />
          </div>
        </section>

        <section className='mt-12 py-12 text-black flex flex-col gap-8 items-center justify-center -mx-6'>
          <h4 className='font-semibold text-2xl text-center px-4'>Just 3 simple steps</h4>

          <ul className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {steps.map((it) => (
              <li key={it.text} className='flex flex-col items-center gap-2'>
                <it.icon size='extra-large' />
                <span className='font-semibold text-lg'>{it.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className='mt-12 container mx-auto flex flex-col gap-6'>
          <h4 className='font-semibold text-2xl text-center'>Our Promise to You</h4>
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8'>
            {promises.map((it) => (
              <li key={it.header} className='grid grid-rows-[auto_auto_1fr] gap-y-2'>
                <div className='justify-self-center mb-4'>
                  <it.icon size='extra-large' />
                </div>
                <h3 className='text-center text-lg font-bold'>{it.header}</h3>
                <p className='text-lg'>{it.description}</p>
              </li>
            ))}
          </ul>

          <h4 className='font-semibold text-xl text-center'>Curious about our transcription magic?</h4>
          <GetInTouch />
        </section>
      </main>

      <footer className='semi-always-dark bg-bg-0 text-text-0 mt-8'>
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='mb-8 md:mb-0'>
              <h2 className='text-lg font-semibold mb-4'>Coursition s.r.o.</h2>
              <p className='text-sm'>Empowering education through advanced video and audio transcription solutions.</p>
            </div>
            <div>
              <h3 className='text-sm font-semibold mb-4'>Legal</h3>
              <ul className='space-y-2'>
                <li>
                  <Link to='/tos'>Terms of Service</Link>
                </li>
                <li>
                  <Link to='/pp'>Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-sm font-semibold mb-4'>Company Details</h3>
              <ul className='space-y-2 text-sm'>
                <li>CIN: 21017069</li>
                <li>TIN: CZ21017069</li>
                <li>Email: info@coursition.com</li>
              </ul>
            </div>
          </div>
          <div className='mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center'>
            <p className='text-sm'>© {new Date().getFullYear()} Coursition s.r.o. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
