import type { QueryClient } from '@tanstack/react-query'
import { Outlet, ScriptOnce, ScrollRestoration, createRootRouteWithContext } from '@tanstack/react-router'
import { Suspense, lazy } from 'react'

import '../styles/app.css'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      {
        title: 'TanStarter',
      },
    ],
  }),
  component: RootComponent,
})

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      )
const ReactQueryDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/react-query-devtools').then((res) => ({
          default: res.ReactQueryDevtools,
        })),
      )

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { readonly children: React.ReactNode }) {
  return (
    <>
      {children}
      <ScrollRestoration />
      <Suspense>
        <ReactQueryDevtools buttonPosition='bottom-left' />
        <TanStackRouterDevtools position='bottom-right' />
      </Suspense>

      <ScriptOnce>
        {`
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const storedTheme = localStorage.theme;

          const shouldBeDark = storedTheme === 'dark' ||
            (!storedTheme && prefersDark);

          if (shouldBeDark) {
            document.body.setAttribute('theme-mode', 'dark');
          }
        `}
      </ScriptOnce>
    </>
  )
}
