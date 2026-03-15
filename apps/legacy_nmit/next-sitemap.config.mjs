/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || "https://entership.cz",
    generateRobotsTxt: true,
}

export default config
