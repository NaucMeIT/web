import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, type ReactNode, ScrollRestoration, createRootRoute } from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: 'utf8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      title: 'TanStack Start Starter',
    },
  ],
  component: RootComponent,
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </QueryClientProvider>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  )
}
