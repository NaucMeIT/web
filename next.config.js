const withPWA = require("next-pwa")

/** @type {import('next').NextConfig} */
module.exports = withPWA({
    reactStrictMode: true,
    eslint: {
        dirs: ["pages", "components", "hooks", "utils"],
    },
    pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === "development",
    },
    experimental: {
        concurrentFeatures: true,
    },
})
