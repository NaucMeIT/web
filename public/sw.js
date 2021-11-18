if (!self.define) {
    const e = (e) => {
            "require" !== e && (e += ".js")
            let s = Promise.resolve()
            return (
                a[e] ||
                    (s = new Promise(async (s) => {
                        if ("document" in self) {
                            const a = document.createElement("script")
                            ;(a.src = e), document.head.appendChild(a), (a.onload = s)
                        } else importScripts(e), s()
                    })),
                s.then(() => {
                    if (!a[e]) throw new Error(`Module ${e} didn’t register its module`)
                    return a[e]
                })
            )
        },
        s = (s, a) => {
            Promise.all(s.map(e)).then((e) => a(1 === e.length ? e[0] : e))
        },
        a = { require: Promise.resolve(s) }
    self.define = (s, n, t) => {
        a[s] ||
            (a[s] = Promise.resolve().then(() => {
                let a = {}
                const i = { uri: location.origin + s.slice(1) }
                return Promise.all(
                    n.map((s) => {
                        switch (s) {
                            case "exports":
                                return a
                            case "module":
                                return i
                            default:
                                return e(s)
                        }
                    }),
                ).then((e) => {
                    const s = t(...e)
                    return a.default || (a.default = s), a
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
                { url: "/_next/server/middleware-manifest.json", revision: "1dtssdNXa0Ey54rRTx5L5" },
                { url: "/_next/static/1dtssdNXa0Ey54rRTx5L5/_buildManifest.js", revision: "1dtssdNXa0Ey54rRTx5L5" },
                {
                    url: "/_next/static/1dtssdNXa0Ey54rRTx5L5/_middlewareManifest.js",
                    revision: "1dtssdNXa0Ey54rRTx5L5",
                },
                { url: "/_next/static/1dtssdNXa0Ey54rRTx5L5/_ssgManifest.js", revision: "1dtssdNXa0Ey54rRTx5L5" },
                { url: "/_next/static/chunks/764-b7ef6fc900540595.js", revision: "1dtssdNXa0Ey54rRTx5L5" },
                { url: "/_next/static/chunks/framework-24afc89648b966c9.js", revision: "1dtssdNXa0Ey54rRTx5L5" },
                { url: "/_next/static/chunks/main-5e5007affbea62db.js", revision: "1dtssdNXa0Ey54rRTx5L5" },
                { url: "/_next/static/chunks/pages/_app-ff85e67dbea8d16a.js", revision: "1dtssdNXa0Ey54rRTx5L5" },
                { url: "/_next/static/chunks/pages/_error-60be80bad6e51832.js", revision: "1dtssdNXa0Ey54rRTx5L5" },
                { url: "/_next/static/chunks/pages/index-0fb08a314f00ab82.js", revision: "1dtssdNXa0Ey54rRTx5L5" },
                { url: "/_next/static/chunks/pages/interested-2144acbdcd6e0819.js", revision: "1dtssdNXa0Ey54rRTx5L5" },
                {
                    url: "/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",
                    revision: "1dtssdNXa0Ey54rRTx5L5",
                },
                { url: "/_next/static/chunks/webpack-2b99834efceef160.js", revision: "1dtssdNXa0Ey54rRTx5L5" },
                { url: "/_next/static/css/2df3426ad4475f8b.css", revision: "1dtssdNXa0Ey54rRTx5L5" },
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
                        cacheWillUpdate: async ({ request: e, response: s, event: a, state: n }) =>
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
