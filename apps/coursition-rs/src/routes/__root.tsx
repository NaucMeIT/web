import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import * as React from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className='p-2 flex gap-2 text-lg'>
        <Link
          to='/'
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{' '}
        <Link
          to='/editor'
          activeProps={{
            className: 'font-bold',
          }}
        >
          Editor
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position='bottom-right' />
    </>
  )
}
