// eslint-disable-next-line @next/next/no-document-import-in-page
import { Html, Head, Main, NextScript } from "next/document"

const APP_MAIN_COLOR = "#040d35"
const APP_NAME = "Nauč mě IT"

const registerScript = `
if (CSS.paintWorklet) {
    CSS.paintWorklet.addModule('/registerPaint.js');
} else {
    alert("Your browser cannot run this demo. Consider Chrome or Edge instead")
}
`

export default function Document() {
    return (
        <Html
            lang='cs'
            className='theme-dark h-full bg-background text-xsDeviceBody motion-safe:scroll-smooth xs:text-sm'
        >
            <Head>
                <link rel='preconnect' href='https://fonts.gstatic.com/' crossOrigin='true'></link>
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                        /* latin-ext */
                        @font-face {
                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 400;
                        font-display: swap;
                        src: url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu7GxKOzY.woff2) format('woff2');
                        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
                        }
                        /* latin */
                        @font-face {
                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 400;
                        font-display: swap;
                        src: url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxK.woff2) format('woff2');
                        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                        }
                     `,
                    }}
                ></style>
                <meta
                    name='Keywords'
                    content='IT, učení, školení, nauč mě, jak začít s IT, jak začít programovat, jak dělat web, jak psát web'
                />

                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='manifest' href='/manifest.json' />
                <link rel='shortcut icon' href='/favicon.ico' />
                <meta name='application-name' content={APP_NAME} />
                <meta name='apple-mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                <meta name='apple-mobile-web-app-title' content={APP_NAME} />
                <meta name='format-detection' content='telephone=no' />
                <meta name='mobile-web-app-capable' content='yes' />
                <meta name='msapplication-config' content='/browserconfig.xml' />
                <meta name='msapplication-TileColor' content={APP_MAIN_COLOR} />
                <meta name='msapplication-tap-highlight' content='no' />
                <meta name='theme-color' content={APP_MAIN_COLOR} />

                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/manifest.json' />
                <link rel='mask-icon' href='/safari-pinned-tab.svg' color={APP_MAIN_COLOR} />
                <link rel='shortcut icon' href='/favicon.ico' />

                <meta name='twitter:card' content='summary' />
                <meta name='twitter:title' key='tw:title' content={APP_NAME} />
                <meta name='twitter:creator' content='@NaucMeIT' />
                <meta property='og:type' content='website' />
                <meta property='og:title' key='og:title' content={APP_NAME} />
                <meta property='og:site_name' content={APP_NAME} />
            </Head>
            <body className='h-full font-montserrat'>
                <Main />
                <NextScript />
                <script type='text/javascript' dangerouslySetInnerHTML={{ __html: registerScript }} />
            </body>
        </Html>
    )
}
