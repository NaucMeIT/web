import type { SVGProps } from 'react'

export function CircleCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <title>Circle Check</title>
      <circle cx='12' cy='12' r='10' />
      <path d='m9 12 2 2 4-4' />
    </svg>
  )
}

export function LoaderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <title>Loader</title>
      <path d='M12 2v4' />
      <path d='m16.2 7.8 2.9-2.9' />
      <path d='M18 12h4' />
      <path d='m16.2 16.2 2.9 2.9' />
      <path d='M12 18v4' />
      <path d='m4.9 19.1 2.9-2.9' />
      <path d='M2 12h4' />
      <path d='m4.9 4.9 2.9 2.9' />
    </svg>
  )
}

export function MonitorStopIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <title>Monitor Stop</title>
      <path d='M12 17v4' />
      <path d='M8 21h8' />
      <rect x='2' y='3' width='20' height='14' rx='2' />
      <rect x='9' y='7' width='6' height='6' rx='1' />
    </svg>
  )
}

export const CunnyArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} width='116' height='40' viewBox='0 0 116 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <title>Arrow</title>
    <path
      d='M1.20275 34.9358C10.1103 39.6184 16.1444 40.7257 23.8719 37.1611C30.8504 33.9421 36.7579 26.0852 42.0457 19.9799C48.5925 12.421 63.4413 2.75144 73.6108 14.8267C81.5071 24.2028 80.9343 39.2861 70.807 39.1559C66.9027 39.1058 62.667 33.3414 62.4372 28.2951C62.189 22.8448 66.1237 18.6501 69.0364 16.2447C76.8589 9.78448 87.4799 19.4752 96.4189 18.4429C104.77 17.4785 108.531 10.4475 111.742 1.66332C112.017 0.910901 113.21 4.74838 113.572 5.68378C114.897 9.1129 114.79 7.40528 113.787 4.81254C113.143 3.14505 112.388 -0.638192 111.178 0.918232C110.305 2.04114 107.974 3.11968 106.698 3.61295'
      stroke='#7F7F7F'
      strokeLinecap='round'
    />
  </svg>
)
