import "../styles/global.css"
import type { AppProps } from "next/app"
import { ReCaptchaProvider } from "next-recaptcha-v3"
import { SessionProvider as AuthProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider session={pageProps.session}>
            <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY || ""} language='cs'>
                <Component {...pageProps} />
            </ReCaptchaProvider>
        </AuthProvider>
    )
}
export default MyApp
export { reportWebVitals } from "next-axiom"
