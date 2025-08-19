import type { AppProps } from "next/app"
import { Router } from "next/router"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import splitbee from "@splitbee/web"
import { useEffect, useRef } from "react"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

import "../styles/global.css"
import Script from "next/script"
import Link from "next/link"
import { CountdownTimer } from "../components/CountdownTimer"

function MyApp({ Component, pageProps }: Readonly<AppProps<{ readonly session: Session }>>) {
    const oldUrlRef = useRef("")

    useEffect(() => {
        posthog.init(process.env["NEXT_PUBLIC_POSTHOG_KEY"] || "", {
            api_host: "/ingest",
            ui_host: "https://eu.posthog.com",
            person_profiles: "always",
            // Enable debug mode in development
            loaded: (posthog) => {
                if (process.env.NODE_ENV === "development") posthog.debug()
            },
        })
        window.fbq?.("track", "PageView")

        const handleRouteChange = () => {
            window.fbq?.("track", "PageView")
            posthog?.capture("$pageview")
        }

        const handleRouteChangeStart = () =>
            posthog?.capture("$pageleave", {
                $current_url: oldUrlRef.current,
            })

        Router.events.on("routeChangeComplete", handleRouteChange)
        Router.events.on("routeChangeStart", handleRouteChangeStart)

        return () => {
            Router.events.off("routeChangeComplete", handleRouteChange)
            Router.events.off("routeChangeStart", handleRouteChangeStart)
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
        <>
            <Script
                src='https://widget.senja.io/widget/d32af028-dee5-4e42-a9c9-a5628527ef7b/platform.js'
                strategy='lazyOnload'
            />
            <Script id='fb-pixel'>
                {`
            (function(f, b, e, v, n, t, s) {
                if (f.fbq) return;

                n = f.fbq = function() {
                    n.callMethod
                        ? n.callMethod.apply(n, arguments)
                        : n.queue.push(arguments);
                };

                if (!f._fbq) f._fbq = n;

                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];

                t = b.createElement(e);
                t.async = !0;
                t.src = v;

                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            })(
                window,
                document,
                'script',
                'https://connect.facebook.net/en_US/fbevents.js'
            );

            fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL}');
          `}
            </Script>
            <PostHogProvider client={posthog}>
                <SessionProvider session={pageProps.session}>
                    <div className='fixed top-0 w-full z-50 text-white py-1 text-xl text-center bg-primary'>
                        <Link href={"/kurz-vibecoding"}>
                            Kurz vibecodingu je tady, neváhej a přihlas se! Zbývá:{" "}
                            <CountdownTimer targetDate={new Date("2025-07-21T23:59:59")} className='font-bold' />
                        </Link>
                    </div>
                    <Component {...pageProps} />
                    <div id='calendly' />
                </SessionProvider>
            </PostHogProvider>
        </>
    )
}

export default MyApp
export { reportWebVitals } from "next-axiom"
