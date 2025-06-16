// eslint-disable-next-line @next/next/no-document-import-in-page
import { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"
import { Partytown } from "@builder.io/partytown/react"
import { Tracking } from "../components/Tracking"
import Link from "next/link"
import { CountdownTimer } from "../components/CountdownTimer"

const APP_MAIN_COLOR = "#090c28"
const APP_NAME = "Nauč mě IT"

const registerScript = `
if (CSS.paintWorklet) {
    CSS.paintWorklet.addModule('/registerPaint.js');
} else {
    console.error("Paint worklet is not supported");
}
`

export default function Document() {
    return (
        <Html
            lang='cs'
            className='theme-dark h-full bg-background text-xsDeviceBody motion-safe:scroll-smooth xs:text-sm text-highlight font-light'
        >
            <Head>
                <link href='https://fonts.googleapis.com/css2?family=Poppins&display=optional' rel='stylesheet' />
                {/* Not yet used, dumb to load <link href='https://fonts.googleapis.com/css2?family=Montserrat&display=optional' rel='stylesheet' /> */}
                <meta
                    name='Keywords'
                    content='IT, učení, školení, nauč mě, jak začít s IT, jak začít programovat, jak dělat web, jak psát web'
                />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
                <link rel='mask-icon' href='/safari-pinned-tab.svg' color={APP_MAIN_COLOR} />
                <meta name='msapplication-TileColor' content={APP_MAIN_COLOR} />
                <meta name='theme-color' content={APP_MAIN_COLOR} />
                <link rel='shortcut icon' href='/favicon.ico' />

                <meta name='application-name' content={APP_NAME} />
                <meta name='apple-mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                <meta name='apple-mobile-web-app-title' content={APP_NAME} />
                <meta name='format-detection' content='telephone=no' />
                <meta name='mobile-web-app-capable' content='yes' />
                <meta name='msapplication-config' content='/browserconfig.xml' />
                <meta name='msapplication-tap-highlight' content='no' />
                <meta name='twitter:card' content='summary' />
                <meta name='twitter:title' key='tw:title' content={APP_NAME} />
                <meta name='twitter:creator' content='@NaucMeIT' />
                <meta property='og:type' content='website' />
                <meta property='og:title' key='og:title' content={APP_NAME} />
                <meta property='og:site_name' content={APP_NAME} />

                <Partytown forward={["gtag", "dataLayer.push"]} />
            </Head>
            <body className='h-full font-poppins accent-primary caret-primary'>
                <div className='fixed top-0 w-full z-50 text-white py-1 text-xl text-center bg-primary'>
                  <Link href={"/kurz-vibecoding"}>
                      Kurz vibecodingu je tady, neváhej a přihlas se!
                      Zbývá: <CountdownTimer targetDate={new Date('2025-07-21T23:59:59')} className="font-bold" />
                  </Link>
                </div>
                <Main />
                <NextScript />
                <Script
                    id='registerPaint'
                    type='text/javascript'
                    dangerouslySetInnerHTML={{ __html: registerScript }}
                    strategy='lazyOnload'
                />
                <Tracking />
            </body>
        </Html>
    )
}
