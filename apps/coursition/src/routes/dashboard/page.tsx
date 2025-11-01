import { publicConfig } from '@nmit-coursition/env/typed.ts'
import { api } from '@nmit-coursition/parse-engine/_generated/api'
import { useQuery } from 'convex/react'
import { Effect } from 'effect'

const typedPublic = Effect.runSync(publicConfig)

export default function MockDashboard() {
  const { items } = useQuery(api.media.getMedia, { count: 10 }) ?? {}

  console.log('Items:', items || 'none')

  return (
    <div className='flex justify-center h-screen'>
      <div className='p-4 max-w-2xl w-full'>
        <div>mock-dashboard</div>
        <ul>
          {!!items &&
            items.map((item, index) => (
              <li key={index}>
                <a href={`${typedPublic.FRONTEND_URL.href}media/${item._id.toString()}`}>
                  {item._id} <b>{item.status}</b>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
