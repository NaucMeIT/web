const withPWA = require("next-pwa")

/** @type {import('next').NextConfig} */
module.exports = withPWA({
    reactStrictMode: true,
    pwa: {
        dest: "public",
    },
    experimental: { esmExternals: true },
})
