import { BadgeDollarSign, Fingerprint, ShieldCheck, TrainFront } from 'lucide-react'

const links = [
  { name: 'fastest', icon: <TrainFront />, path: '#' },
  { name: 'most-accurate', icon: <ShieldCheck />, path: '#' },
  { name: 'privacy-first', icon: <Fingerprint />, path: '#' },
  { name: 'cost-effective', icon: <BadgeDollarSign />, path: '#' },
]

export default function Index() {
  return (
    <div className='container mx-auto p-6 md:p-12'>
      <header>
        <ul className='w-full flex items-center justify-between'>
          {links.map((it) => (
            <li key={it.name} className='flex gap-1 items-center'>
              {it.icon}
              <span className='text-[16px] uppercase'>{it.name}</span>
            </li>
          ))}
        </ul>
      </header>
    </div>
  )
}
