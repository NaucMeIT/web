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

const steps = [
  { text: '1. Sign up for our lifetime deal.', icon: LogIn },
  { text: '2. Upload any video or audio file', icon: FileUp },
  { text: '3. Get accurate transcripts instantly', icon: Captions },
]

export default function Index() {
  return (
    <div className='w-screen h-screen mx-auto px-6 pt-6 md:pt-12 md:px-12 flex flex-col overflow-y-auto overflow-x-hidden'>
      <header className='container mx-auto'>
        <ul className='w-full flex items-center justify-between'>
          {actions.map((it) => (
            <li key={it.name} className='flex gap-1 items-center'>
              <it.icon />
              <span className='text-[16px] uppercase'>{it.name}</span>
            </li>
          ))}
        </ul>
      </header>

      <section className='mt-12 container mx-auto grid grid-cols-1 md:grid-cols-2'>
        <div className='flex flex-col gap-4'>
          <b className='text-[20px] font-semibold text-purple-700'>For any video & audio</b>
          <h3 className='font-semibold text-[43px] max-w-[557px] leading-[60px]'>Get best transcription in no time.</h3>
          <p className='text-[18px] font-semibold'>
            From podcasts to lectures, interviews to vlogs - we outperform competitors in speed and accuracy.
          </p>
          <p className='text-[18px]'>
            Secure, cost-effective transcription. Your media, instantly processed, never stored.
          </p>

          <BuyLifetime withIcon />
        </div>

        <div className='h-full flex items-center justify-center'>Insert image here</div>
      </section>

      <section className='mt-12 bg-gray-50 text-black flex -mx-12'>
        <div className='h-[400px] max-w-5xl flex flex-col gap-5 mx-auto'>
          <ul className='w-full flex justify-evenly mt-8'>
            {benefits.map((it) => (
              <li key={it.text} className='flex flex-col gap-2 items-center max-w-[240px]'>
                <it.icon className='text-purple-700' />
                <span className='text-purple-700 text-center font-semibold text-[16px] '>{it.text}</span>
              </li>
            ))}
          </ul>

          <div className='w-full flex items-center justify-center mt-8'>Interactive demo</div>
        </div>
      </section>

      <section className='bg-black text-white -mx-12'>
        <div className='flex items-center justify-center font-semibold text-[24px] h-[160px] text-center px-4'>
          Maximize the value of video content by making every word searchable.
        </div>
      </section>

      <section className='bg-white text-black flex flex-col gap-2 -mx-12 items-center justify-center mt-5'>
        <h4 className='font-semibold text-[24px]'>Lacking transcription?</h4>
        <p className='mt-2'>
          Important meeting recorded, but no way to quickly review key points. =&gt; "What was that action item again?"
          Cue endless audio scrolling.
        </p>
        <p>
          Brilliant podcast insights, but sharing means manual note-taking. =&gt; Love that podcast gem? Hope you enjoy
          pausing and typing.
        </p>
        <p>
          Hours of video content, but can't find that crucial quote. =&gt; Needle in a haystack? More like a word in a
          3-hour video.
        </p>

        <h4 className='font-semibold text-[24px] mt-4'>Time to unlock your content</h4>

        <BuyLifetime className='mt-4' withIcon />
      </section>

      <section className='mt-12 py-6 bg-gray-50 text-black flex flex-col gap-4 items-center justify-center -mx-12'>
        <h4 className='font-semibold text-[24px]'>Why us?</h4>
        <p className='max-w-[400px] text-[16px]'>
          Simplify your media. Best AI transcription, under your control. User-friendly interface, flexible pricing.
          Make videos searchable and AI-ready. For creators, businesses, and consumers.
        </p>

        <BuyLifetime className='mt-4' withIcon />
      </section>

      <section className='mt-12 container mx-auto grid grid-cols-1 md:grid-cols-2'>
        <div className='h-full flex items-center justify-center'>Insert image here</div>

        <div className='flex flex-col gap-6'>
          <h3 className='font-semibold text-[35px] max-w-[557px] leading-[60px]'>Smart transcription on your terms</h3>

          <p className='text-[20px]'>
            Smart transcripts, your way. Easy to start, simple to use. We tackle the tough stuff - quality, speed, and
            data safety. Made for real people, always improving. Your content changes? We change too.
          </p>

          <BuyLifetime withIcon={false} />
        </div>
      </section>

      <section className='mt-12 py-12 bg-gray-50 text-black flex flex-col gap-8 items-center justify-center -mx-12'>
        <h4 className='font-semibold text-[24px]'>3 simple steps to solve your customer’s problem</h4>

        <ul className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {steps.map((it) => (
            <li key={it.text} className='flex flex-col items-center gap-2'>
              <it.icon className='size-[60px] lg:size-[100px] text-purple-700' />
              <span className='font-semibold text-[18px]'>{it.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className='mt-12 container mx-auto flex flex-col gap-6'>
        <h4 className='font-semibold text-[20px] text-center'>Our Promise to You</h4>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 max-w-7xl mx-auto'>
          {promises.map((it) => (
            <li key={it.header} className='flex flex-col gap-2 items-center justify-center'>
              <it.icon className='size-8 text-purple-700' />
              <b className='mt-10 text-[18px]'>{it.header}</b>
              <p className='text-[16px]'>{it.description}</p>
            </li>
          ))}
        </ul>

        <h4 className='font-semibold text-[20px] text-center'>Curious about our transcription magic?</h4>
        <GetInTouch />
      </section>
    </div>
  )
}
