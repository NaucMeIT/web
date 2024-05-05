/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || "http://localhost:3000",
    generateRobotsTxt: true,
}

export default config
