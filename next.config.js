const withPWA = require("next-pwa")

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
    withPWA({
        reactStrictMode: true,
        eslint: {
            dirs: ["pages", "components", "hooks", "utils"],
        },
        pwa: {
            dest: "public",
            disable: process.env.NODE_ENV === "development",
        },
        experimental: {
            runtime: "experimental-edge",
            images: {
                allowFutureImage: true,
            },
        },
        images: {
            formats: ["image/avif", "image/webp"],
        },
        pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    }),
)
