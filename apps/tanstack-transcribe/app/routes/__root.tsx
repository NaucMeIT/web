import { httpBatchLink } from '@ap0nia/eden-react-query'
import { v1 } from '@nmit-coursition/api/v1'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, type ReactNode, ScrollRestoration, createRootRoute } from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
import { useState } from 'react'

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
  const [queryClient] = useState(() => new QueryClient())

  const [edenClient] = useState(() =>
    v1.createClient({
      links: [
        httpBatchLink({
          domain: 'http://localhost:3001/v1/eden',
        }),
      ],
    }),
  )

  return (
    <v1.Provider client={edenClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RootDocument>
          <Outlet />
        </RootDocument>
      </QueryClientProvider>
    </v1.Provider>
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
