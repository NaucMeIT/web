import { Outlet } from '@modern-js/runtime/router'
import './index.css'
import ConvexProviderWithClient from '../components/convex-provider.tsx'

export default function Layout() {
  return (
    <div>
      <ConvexProviderWithClient>
        <Outlet />
      </ConvexProviderWithClient>
    </div>
  )
}
