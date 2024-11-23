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
        async redirects() {
            return [
                {
                    source: "/discord",
                    destination: "https://discord.gg/SdHYjdJ9k3",
                    permanent: true,
                },
                {
                    source: "/slido",
                    destination: "https://drp.li/nmit-slido",
                    permanent: true,
                },
                {
                    source: "/navit-stream/zvyseni-platu",
                    destination: "https://drp.li/5EvLM",
                    permanent: true,
                },
                {
                    source: "/navit-stream/real-user-monitoring",
                    destination: "https://drp.li/3b1vE",
                    permanent: true,
                },
                {
                    source: "/navit-stream/security-nepropalte-miliony",
                    destination: "https://drp.li/wEEFV",
                    permanent: true,
                },
                {
                    source: "/navit-stream/programator-ai-svet",
                    destination: "https://drp.li/w5zYC",
                    permanent: true,
                },
                {
                    source: "/navit-stream/remote-work",
                    destination: "https://drp.li/PFmec",
                    permanent: true,
                },
                {
                    source: "/navit-stream/vzdelavani-vliv",
                    destination: "https://drp.li/JWPiV",
                    permanent: true,
                },
                {
                    source: "/navit-stream/pohovor-nanecisto",
                    destination: "https://drp.li/965Qd",
                    permanent: true,
                },
                {
                    source: "/navit-stream/junior-zisk-prace",
                    destination: "https://drp.li/AwlWa",
                    permanent: true,
                },
                {
                    source: "/companies",
                    destination: "/",
                    permanent: true,
                },
            ]
        },
    }),
)
