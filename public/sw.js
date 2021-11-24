if (!self.define) {
    const e = (e) => {
            "require" !== e && (e += ".js")
            let s = Promise.resolve()
            return (
                n[e] ||
                    (s = new Promise(async (s) => {
                        if ("document" in self) {
                            const n = document.createElement("script")
                            ;(n.src = e), document.head.appendChild(n), (n.onload = s)
                        } else importScripts(e), s()
                    })),
                s.then(() => {
                    if (!n[e]) throw new Error(`Module ${e} didn’t register its module`)
                    return n[e]
                })
            )
        },
        s = (s, n) => {
            Promise.all(s.map(e)).then((e) => n(1 === e.length ? e[0] : e))
        },
        n = { require: Promise.resolve(s) }
    self.define = (s, a, i) => {
        n[s] ||
            (n[s] = Promise.resolve().then(() => {
                let n = {}
                const t = { uri: location.origin + s.slice(1) }
                return Promise.all(
                    a.map((s) => {
                        switch (s) {
                            case "exports":
                                return n
                            case "module":
                                return t
                            default:
                                return e(s)
                        }
                    }),
                ).then((e) => {
                    const s = i(...e)
                    return n.default || (n.default = s), n
                })
            }))
    }
}
define("./sw.js", ["./workbox-adbd2882"], function (e) {
    "use strict"
    importScripts(),
        self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                { url: "/_next/server/middleware-build-manifest.js", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/_next/server/middleware-manifest.json", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/_next/server/middleware-react-loadable-manifest.js", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/_next/static/4SQK3fUB-NBDIYyI_r_0w/_buildManifest.js", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                {
                    url: "/_next/static/4SQK3fUB-NBDIYyI_r_0w/_middlewareManifest.js",
                    revision: "4SQK3fUB-NBDIYyI_r_0w",
                },
                { url: "/_next/static/4SQK3fUB-NBDIYyI_r_0w/_ssgManifest.js", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/_next/static/chunks/170-663c66710b99df2f.js", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/_next/static/chunks/framework-e73cf9261908cde5.js", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/_next/static/chunks/main-c2c0f059f4cfb858.js", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/_next/static/chunks/pages/_app-59d592531357ac1b.js", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/_next/static/chunks/pages/_error-6f3f7924a726ee9d.js", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/_next/static/chunks/pages/index-e7353aa494541a40.js", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/_next/static/chunks/pages/interested-d1a946d0fdfb05dc.js", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/_next/static/chunks/polyfills-5cd94c89d3acac5f.js", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/_next/static/chunks/webpack-2b99834efceef160.js", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/_next/static/css/eda0e4edb14c2bb5.css", revision: "4SQK3fUB-NBDIYyI_r_0w" },
                { url: "/android-chrome-192x192.png", revision: "6acd2ac6826c606ea4bac73ac55881cf" },
                { url: "/android-chrome-512x512.png", revision: "0e5070c8bca65f1284e0df2b375b2580" },
                { url: "/apple-touch-icon.png", revision: "a7c7c08ca08da51f9bd6a8645cc0ee83" },
                { url: "/browserconfig.xml", revision: "e4e40b0c82d228add33b5bcfe276a859" },
                { url: "/facebook.png", revision: "3715166fdd5d7aca65d0b90915fc769b" },
                { url: "/favicon-16x16.png", revision: "51fec0871e4a99969817454eb3c6fcba" },
                { url: "/favicon-32x32.png", revision: "f73b9a20e9c541094d18ac1e4dc8fd5a" },
                { url: "/favicon.ico", revision: "d07056316be18002aa00d17539969166" },
                { url: "/manifest.json", revision: "dd4b3c0d731963b072bc2b14fc77a23a" },
                { url: "/mstile-150x150.png", revision: "bce7ee5569afa8e153b6dedc505a191a" },
                { url: "/safari-pinned-tab.svg", revision: "6102a42e26f4edb2e38cc28a049a5fb5" },
                { url: "/site.webmanifest", revision: "b9aa277fcfc34c31db6c7a7ea3469b8c" },
                { url: "/twitter.png", revision: "101c898697bdf5d2fea4b3cc4d73d94a" },
            ],
            { ignoreURLParametersMatching: [] },
        ),
        e.cleanupOutdatedCaches(),
        e.registerRoute(
            "/",
            new e.NetworkFirst({
                cacheName: "start-url",
                plugins: [
                    {
                        cacheWillUpdate: async ({ request: e, response: s, event: n, state: a }) =>
                            s && "opaqueredirect" === s.type
                                ? new Response(s.body, { status: 200, statusText: "OK", headers: s.headers })
                                : s,
                    },
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
            new e.CacheFirst({
                cacheName: "google-fonts-webfonts",
                plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
            new e.StaleWhileRevalidate({
                cacheName: "google-fonts-stylesheets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-font-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-image-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\/_next\/image\?url=.+$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-image",
                plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:mp3|wav|ogg)$/i,
            new e.CacheFirst({
                cacheName: "static-audio-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:mp4)$/i,
            new e.CacheFirst({
                cacheName: "static-video-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:js)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-js-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:css|less)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-style-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\/_next\/data\/.+\/.+\.json$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-data",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:json|xml|csv)$/i,
            new e.NetworkFirst({
                cacheName: "static-data-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1
                const s = e.pathname
                return !s.startsWith("/api/auth/") && !!s.startsWith("/api/")
            },
            new e.NetworkFirst({
                cacheName: "apis",
                networkTimeoutSeconds: 10,
                plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1
                return !e.pathname.startsWith("/api/")
            },
            new e.NetworkFirst({
                cacheName: "others",
                networkTimeoutSeconds: 10,
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            ({ url: e }) => !(self.origin === e.origin),
            new e.NetworkFirst({
                cacheName: "cross-origin",
                networkTimeoutSeconds: 10,
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
            }),
            "GET",
        )
})
