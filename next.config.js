const { withAxiom } = require("next-axiom")

const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
        // providerImportSource: "@mdx-js/react",
    },
})

/** @type {import('next').NextConfig} */
module.exports = withMDX(
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
        },
        pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    }),
)
