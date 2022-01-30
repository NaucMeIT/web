if (!self.define) {
    let e,
        s = {}
    const a = (a, i) => (
        (a = new URL(a + ".js", i).href),
        s[a] ||
            new Promise((s) => {
                if ("document" in self) {
                    const e = document.createElement("script")
                    ;(e.src = a), (e.onload = s), document.head.appendChild(e)
                } else (e = a), importScripts(a), s()
            }).then(() => {
                let e = s[a]
                if (!e) throw new Error(`Module ${a} didn’t register its module`)
                return e
            })
    )
    self.define = (i, n) => {
        const t = e || ("document" in self ? document.currentScript.src : "") || location.href
        if (s[t]) return
        let c = {}
        const r = (e) => a(e, t),
            o = { module: { uri: t }, exports: c, require: r }
        s[t] = Promise.all(i.map((e) => o[e] || r(e))).then((e) => (n(...e), c))
    }
}
define(["./workbox-8de3f2b6"], function (e) {
    "use strict"
    importScripts(),
        self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                { url: "/_next/server/middleware-build-manifest.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                { url: "/_next/server/middleware-react-loadable-manifest.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                { url: "/_next/static/Vy7P_Hu6EIipu4aRrXPoT/_buildManifest.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                {
                    url: "/_next/static/Vy7P_Hu6EIipu4aRrXPoT/_middlewareManifest.js",
                    revision: "Vy7P_Hu6EIipu4aRrXPoT",
                },
                { url: "/_next/static/Vy7P_Hu6EIipu4aRrXPoT/_ssgManifest.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                { url: "/_next/static/chunks/814-d789536229b2727a.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                { url: "/_next/static/chunks/framework-77bdea455d807574.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                { url: "/_next/static/chunks/main-3506d3de6c823cfd.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                { url: "/_next/static/chunks/pages/_app-ab4cb9a130825dfd.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                { url: "/_next/static/chunks/pages/_error-6f3f7924a726ee9d.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                { url: "/_next/static/chunks/pages/index-9e6da1b8cfb9ff87.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                { url: "/_next/static/chunks/pages/interested-6c4219764cdcea22.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                { url: "/_next/static/chunks/pages/login-da6e9f46b4558c81.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                { url: "/_next/static/chunks/polyfills-5cd94c89d3acac5f.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                { url: "/_next/static/chunks/webpack-b927671265afed5e.js", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
                { url: "/_next/static/css/e48b4574121af362.css", revision: "Vy7P_Hu6EIipu4aRrXPoT" },
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
                { url: "/programmer.svg", revision: "57866fb306ce76abb7863b0bff4ae564" },
                { url: "/qa_bug.svg", revision: "cf8c0104e941b17fb2ca425ac1ef95ee" },
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
                        cacheWillUpdate: async ({ request: e, response: s, event: a, state: i }) =>
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
