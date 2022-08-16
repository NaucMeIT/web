import "../styles/global.css"
import type { AppProps } from "next/app"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY || ""}
            language='cs'
            scriptProps={{ async: true, appendTo: "body" }}
        >
            <Component {...pageProps} />
        </GoogleReCaptchaProvider>
    )
}
export default MyApp
