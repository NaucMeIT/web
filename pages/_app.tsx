import "../styles/global.css"
import type { AppProps } from "next/app"
import { ClerkProvider } from "@clerk/nextjs"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ClerkProvider>
            <Component {...pageProps} />
        </ClerkProvider>
    )
}
export default MyApp
