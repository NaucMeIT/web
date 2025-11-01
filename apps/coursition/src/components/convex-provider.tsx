import { ConvexProvider, ConvexReactClient } from 'convex/react'
import type { ReactNode } from 'react'

if (!process.env['PUBLIC_CONVEX_URL']) {
  throw new Error('PUBLIC_CONVEX_URL is not defined')
}

const convex = new ConvexReactClient(process.env['PUBLIC_CONVEX_URL'])

export default function ConvexProviderWithClient({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
