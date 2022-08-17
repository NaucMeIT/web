import "../styles/global.css"
import type { AppProps } from "next/app"
import { ReCaptchaProvider } from "next-recaptcha-v3"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY || ""} language='cs'>
            <Component {...pageProps} />
        </ReCaptchaProvider>
    )
}
export default MyApp
export { reportWebVitals } from "next-axiom"
