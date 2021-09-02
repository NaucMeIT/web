const withPWA = require("next-pwa")

/** @type {import('next').NextConfig} */
module.exports = withPWA({
    reactStrictMode: true,
    pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === "development",
    },
})
