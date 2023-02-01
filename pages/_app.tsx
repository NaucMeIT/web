import "../styles/global.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import splitbee from "@splitbee/web"
import { useEffect } from "react"

function MyApp({ Component, pageProps }: Readonly<AppProps<{ readonly session: Session }>>) {
    useEffect(() => {
        splitbee.init({
            scriptUrl: "/bee.js",
            apiUrl: "/_hive",
        })
        splitbee.enableCookie()
    }, [])

    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
            <div id='calendly'></div>
        </SessionProvider>
    )
}
export default MyApp
export { reportWebVitals } from "next-axiom"
