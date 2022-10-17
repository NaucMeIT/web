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
            dirs: ["pages", "components", "hooks", "utils"],
        },
        experimental: {
            runtime: "experimental-edge",
            images: {
                allowFutureImage: true,
            },
            newNextLinkBehavior: true,
        },
        images: {
            formats: ["image/avif", "image/webp"],
            dangerouslyAllowSVG: true,
            contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        },
        pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
        swcMinify: true,
    }),
)
