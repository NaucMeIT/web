import "../styles/global.css"
import type { AppProps } from "next/app"
import { ReCaptchaProvider } from "next-recaptcha-v3"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

function MyApp({ Component, pageProps }: AppProps<{ readonly session: Session }>) {
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
