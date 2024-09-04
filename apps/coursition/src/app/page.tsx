import { BadgeDollarSign, Clock, Fingerprint, Heart, ShieldCheck, TrainFront, TrendingUp } from 'lucide-react'
import { BuyLifetime } from '../components/buyLifetime'

const links = [
  { name: 'fastest', icon: <TrainFront /> },
  { name: 'most-accurate', icon: <ShieldCheck /> },
  { name: 'privacy-first', icon: <Fingerprint /> },
  { name: 'cost-effective', icon: <BadgeDollarSign /> },
]

const benefits = [
  { text: 'From speech to text in record time.', icon: <Clock className='text-purple-700' /> },
  { text: 'Lost in playback? Found in transcript. Crystal clear.', icon: <TrendingUp className='text-purple-700' /> },
  { text: 'Upgrade your audio. Effortless text transformation.', icon: <Heart className='text-purple-700' /> },
]

export default function Index() {
  return (
    <div className='w-screen h-screen mx-auto p-6 md:p-12 flex flex-col overflow-y-auto overflow-x-hidden'>
      <header className='container mx-auto'>
        <ul className='w-full flex items-center justify-between'>
          {links.map((it) => (
            <li key={it.name} className='flex gap-1 items-center'>
              {it.icon}
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

          <BuyLifetime />
        </div>

        <div className='h-full flex items-center justify-center'>Insert image here</div>
      </section>

      <section className='mt-12 bg-gray-50 text-black flex -mx-12'>
        <div className='h-[400px] max-w-5xl flex flex-col gap-5 mx-auto'>
          <ul className='w-full flex justify-evenly mt-8'>
            {benefits.map((it) => (
              <li key={it.text} className='flex flex-col gap-2 items-center max-w-[240px]'>
                {it.icon}
                <span className='text-purple-700 text-center font-semibold text-[16px] '>{it.text}</span>
              </li>
            ))}
          </ul>

          <div className='w-full flex items-center justify-center mt-8'>Interactive demo</div>
        </div>
      </section>

      <section className='bg-black text-white -mx-12'>
        <div className='flex items-center justify-center font-semibold text-[24px] h-[160px]'>
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

        <BuyLifetime className='mt-4' />
      </section>

      <section className='mt-12 py-6 bg-gray-50 text-black flex flex-col gap-4 items-center justify-center -mx-12'>
        <h4 className='font-semibold text-[24px]'>Why us?</h4>
        <p className='max-w-[400px] text-[16px]'>
          Simplify your media. Best AI transcription, under your control. User-friendly interface, flexible pricing.
          Make videos searchable and AI-ready. For creators, businesses, and consumers.
        </p>

        <BuyLifetime className='mt-4' />
      </section>
    </div>
  )
}
