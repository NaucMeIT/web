import type { AppProps } from "next/app"
import { Router } from 'next/router'
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import splitbee from "@splitbee/web"
import { useEffect, useRef } from "react"
import posthog from "posthog-js"
import { PostHogProvider } from 'posthog-js/react'

import "../styles/global.css"

function MyApp({ Component, pageProps }: Readonly<AppProps<{ readonly session: Session }>>) {
  const oldUrlRef = useRef('')

  useEffect(() => {
    posthog.init(process.env["NEXT_PUBLIC_POSTHOG_KEY"] || "", {
      api_host: "/ingest",
      ui_host: 'https://eu.posthog.com',
      person_profiles: 'always',
      // Enable debug mode in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      }
    })

    const handleRouteChange = () => posthog?.capture('$pageview')

    const handleRouteChangeStart = () => posthog?.capture('$pageleave', {
      $current_url: oldUrlRef.current
    })

    Router.events.on('routeChangeComplete', handleRouteChange);
    Router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
      Router.events.off('routeChangeStart', handleRouteChangeStart);
    }
  }, [])

    useEffect(() => {
        splitbee.init({
            scriptUrl: "/bee.js",
            apiUrl: "/_hive",
        })
        splitbee.enableCookie()
    }, [])

    return (
      <PostHogProvider client={posthog}>
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
            <div id='calendly' />
        </SessionProvider>
      </PostHogProvider>
    )
}

export default MyApp
export { reportWebVitals } from "next-axiom"
