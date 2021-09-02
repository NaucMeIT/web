import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document"

const APP_MAIN_COLOR = "#040d35"
const APP_NAME = "Nauč mě IT"

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang='cs'>
                <Head>
                    <link href='https://fonts.googleapis.com/css2?family=Roboto&display=swap' rel='stylesheet'></link>
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
                <body className='flex justify-center bg-main-blue'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
