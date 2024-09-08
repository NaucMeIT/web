import { createSafeKey } from '@nmit-coursition/utils'
import {
  BadgeDollarSign,
  Cable,
  Captions,
  Clock,
  FastForward,
  FileUp,
  Fingerprint,
  Heart,
  Lock,
  LogIn,
  Recycle,
  ShieldCheck,
  TrainFront,
  TrendingUp,
} from 'lucide-react'
import { BuyLifetime } from '../components/buyLifetime'
import { GetInTouch } from '../components/getInTouch'

const actions = [
  { name: 'fastest', icon: TrainFront },
  { name: 'most-accurate', icon: ShieldCheck },
  { name: 'privacy-first', icon: Fingerprint },
  { name: 'cost-effective', icon: BadgeDollarSign },
]

const benefits = [
  { text: 'From speech to text in record time.', icon: Clock },
  { text: 'Lost in playback? Found in transcript. Crystal clear.', icon: TrendingUp },
  { text: 'Upgrade your audio. Effortless text transformation.', icon: Heart },
]

const promises = [
  {
    header: 'Top accuracy',
    description:
      'We guarantee ongoing improvements in transcription accuracy, ensuring your lifetime investment grows in value over time.',
    icon: Lock,
  },
  {
    header: 'Lifetime access',
    description:
      'One purchase grants you unlimited transcriptions for life, with no hidden fees or subscription traps.',
    icon: FastForward,
  },
  {
    header: 'Adaptable technology',
    description:
      'As audio and video formats evolve, our software will adapt, future-proofing your transcription capabilities.',
    icon: Recycle,
  },
  {
    header: 'Unwavering support',
    description:
      'Our dedicated team provides continuous technical assistance, safeguarding your long-term transcription needs.',
    icon: Cable,
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
  { text: '1. Sign up for our lifetime deal.', icon: LogIn },
  { text: '2. Upload any video or audio file', icon: FileUp },
  { text: '3. Get accurate transcripts instantly', icon: Captions },
]

export default function Index() {
  return (
    <div className='w-screen h-screen mx-auto p-6 md:p-12 flex flex-col overflow-y-auto overflow-x-hidden'>
      <header className='w-full max-w-7xl mx-auto'>
        <ul className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2'>
          {actions.map((it) => (
            <li key={it.name} className='flex items-center justify-center sm:justify-start gap-2'>
              <it.icon className='w-5 h-5' />
              <span className='uppercase text-sm'>{it.name}</span>
            </li>
          ))}
        </ul>
      </header>

      <section className='mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2'>
        <div className='flex flex-col gap-4'>
          <b className='text-xl font-semibold text-purple-700'>For any video & audio</b>
          <h3 className='font-semibold text-5xl'>Get best transcription in no time.</h3>
          <p className='text-lg font-semibold'>
            From podcasts to lectures, interviews to vlogs - we outperform competitors in speed and accuracy.
          </p>
          <p className='text-lg'>
            Secure, cost-effective transcription. Your media, instantly processed, never stored.
          </p>

          <BuyLifetime withIcon />
        </div>

        <div className='h-full items-center justify-center hidden md:flex'>Insert image here</div>
      </section>

      <section className='mt-12 bg-gray-50 text-black flex -mx-12'>
        <div className='max-w-5xl flex flex-col gap-5 mx-auto'>
          <ul className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'>
            {benefits.map((it) => (
              <li key={it.text} className='flex flex-col items-center text-center'>
                <it.icon className='text-purple-700 w-12 h-12 mb-4' />
                <span className='text-purple-700 font-semibold max-w-60'>{it.text}</span>
              </li>
            ))}
          </ul>

          <div className='w-full flex items-center justify-center mt-8'>Interactive demo</div>
        </div>
      </section>

      <section className='bg-black text-white -mx-12'>
        <div className='flex items-center justify-center font-semibold text-2xl py-7 text-center px-8'>
          Maximize the value of video content by making every word searchable.
        </div>
      </section>

      <section className='bg-white text-black py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <h4 className='font-semibold text-2xl text-center mb-6'>Lacking transcription?</h4>
          <div className='flex flex-col lg:justify-center lg:items-center space-y-4'>
            {consequences.map((item) => (
              <div key={createSafeKey(item.problem)} className='flex-1 flex-row text-sm lg:text-base'>
                <span className='font-medium'>{item.problem}</span>
                <span className='mt-1 text-gray-600'>{item.consequence}</span>
              </div>
            ))}
          </div>
          <h4 className='font-semibold text-2xl text-center mt-8'>Time to unlock your content</h4>
          <div className='flex justify-center mt-6'>
            <BuyLifetime withIcon />
          </div>
        </div>
      </section>

      <section className='mt-12 py-6 bg-gray-50 text-black flex flex-col gap-4 items-center justify-center -mx-12'>
        <h4 className='font-semibold text-2xl'>Why us?</h4>
        <p className='w-3/4 max-w-96'>
          Simplify your media. Best AI transcription, under your control. User-friendly interface, flexible pricing.
          Make videos searchable and AI-ready. For creators, businesses, and consumers.
        </p>

        <BuyLifetime className='mt-4' withIcon />
      </section>

      <section className='mt-12 container mx-auto grid grid-cols-1 md:grid-cols-2'>
        <div className='h-full flex items-center justify-center'>Insert image here</div>

        <div className='flex flex-col gap-6'>
          <h3 className='font-semibold text-4xl'>Smart transcription on your terms</h3>

          <p className='text-xl'>
            Smart transcripts, your way. Easy to start, simple to use. We tackle the tough stuff - quality, speed, and
            data safety. Made for real people, always improving. Your content changes? We change too.
          </p>

          <BuyLifetime withIcon />
        </div>
      </section>

      <section className='mt-12 py-12 bg-gray-50 text-black flex flex-col gap-8 items-center justify-center w-screen -mx-6'>
        <h4 className='font-semibold text-2xl text-center px-4'>Just 3 simple steps</h4>

        <ul className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {steps.map((it) => (
            <li key={it.text} className='flex flex-col items-center gap-2'>
              <it.icon className='size-16 lg:size-24 text-purple-700' />
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
                <it.icon className='w-8 h-8 text-purple-700' />
              </div>
              <h3 className='text-center text-lg font-bold'>{it.header}</h3>
              <p className='text-lg'>{it.description}</p>
            </li>
          ))}
        </ul>

        <h4 className='font-semibold text-xl text-center'>Curious about our transcription magic?</h4>
        <GetInTouch />
      </section>
    </div>
  )
}
