import { Facebook, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

const services = [
  { text: 'Service 1', href: '#' },
  { text: 'Service 2', href: '#' },
  { text: 'Service 3', href: '#' },
]

const handles = [
  { icon: Twitter, href: '#' },
  { icon: Facebook, href: '#' },
  { icon: Linkedin, href: '#' },
]

export const Footer = () => {
  const currentYear = new Date().getUTCFullYear()
  return (
    <footer className='py-12 -mx-12 bg-black text-white flex flex-col gap-6 items-center justify-center mt-8'>
      <div className='mx-auto w-full max-w-7xl flex flex-wrap items-center justify-between'>
        <ul className='flex flex-col gap-1'>
          <b className='text-[18px] font-semibold mb-5'>Contact Us</b>
          <li>1234 Street name</li>
          <li>City, State, 56789</li>

          {/* add email here */}
          <li className='mt-2'>
            Email:
            <a href='mailto:#' className='ml-1 underline underline-offset-2'>
              info@clearbrand.com
            </a>
          </li>
          <li>Phone: (123) 456-7890</li>
        </ul>

        <ul className='flex flex-col gap-1'>
          <b className='text-[18px] font-semibold mb-5'>Services</b>
          {services.map(({ href, text }) => (
            <li key={text} className=''>
              <Link href={href}>{text}</Link>
            </li>
          ))}
        </ul>

        <div className='flex flex-col gap-1'>
          <b className='text-[18px] font-semibold mb-5'>Follow Us</b>
          <ul className='flex gap-2 items-center justify-center'>
            {handles.map((it) => (
              <li key={it.icon.name}>
                <a href={it.href}>
                  <it.icon className='size-4 text-white' />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='px-4 w-full text-center'>© {currentYear} Coursition. All rights reserved.</div>
    </footer>
  )
}
