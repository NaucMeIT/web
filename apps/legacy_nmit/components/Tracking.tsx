import Script from "next/script"

export function Tracking() {
    console.log(process.env)
    return (
        <>
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script
                type='text/partytown'
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_KEY}`}
            />
            <script
                type='text/partytown'
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA4_KEY}', {
                page_path: window.location.pathname,
            });
        `,
                }}
            />
            <noscript>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    height='1'
                    width='1'
                    alt=''
                    style={{ display: "none" }}
                    src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL}&ev=PageView&noscript=1`}
                />
            </noscript>
        </>
    )
}
