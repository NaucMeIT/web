import "../styles/global.css"
import type { AppProps } from "next/app"
import { ReCaptchaProvider } from "next-recaptcha-v3"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import splitbee from "@splitbee/web"
import { useEffect } from "react"

function MyApp({ Component, pageProps }: AppProps<{ readonly session: Session }>) {
    useEffect(() => {
        splitbee.init({
            scriptUrl: "/bee.js",
            apiUrl: "/_hive",
        })
        splitbee.enableCookie()
        // TODO: Move to custom hook, so that we can identify users if they are logged in
        if (pageProps.session?.user?.email) {
            splitbee.user.set({ userId: pageProps.session.user.email })
        }
    }, [pageProps.session?.user?.email])

    return (
        <SessionProvider session={pageProps.session}>
            <ReCaptchaProvider
                strategy='lazyOnload'
                reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY || ""}
                language='cs'
            >
                <Component {...pageProps} />
            </ReCaptchaProvider>
        </SessionProvider>
    )
}
export default MyApp
export { reportWebVitals } from "next-axiom"
