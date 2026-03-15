import createMDX from "@next/mdx"
import { withAxiom } from "next-axiom"

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
        providerImportSource: "@mdx-js/react",
    },
})

/** @type {import('next').NextConfig} */
export default withMDX(
    withAxiom({
        reactStrictMode: true,
        eslint: {
            dirs: ["pages", "components", "hooks", "utils", "chapters", "types"],
        },
        experimental: {
            mdxRs: true,
            typedRoutes: true,
            webpackBuildWorker: true,
        },
        images: {
            formats: ["image/avif", "image/webp"],
            dangerouslyAllowSVG: true,
            contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        },
        pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
        skipTrailingSlashRedirect: true,
        async rewrites() {
            return [
                {
                    source: "/ingest/static/:path*",
                    destination: "https://eu-assets.i.posthog.com/static/:path*",
                },
                {
                    source: "/ingest/:path*",
                    destination: "https://eu.i.posthog.com/:path*",
                },
                {
                    source: "/ingest/decide",
                    destination: "https://eu.i.posthog.com/decide",
                },
                {
                    source: "/bee.js",
                    destination: "https://cdn.splitbee.io/sb.js",
                },
                {
                    source: "/_hive/:slug",
                    destination: "https://hive.splitbee.io/:slug",
                },
                {
                    source: "/fb/:path*",
                    destination: "https://connect.facebook.net/:path*",
                },
            ]
        },
        "redirects": [
                { "source": "/(.*)", "destination": "https://entership.cz/$1", "permanent": true }
            ]
        },
    }),
)
