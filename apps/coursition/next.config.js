// @ts-check
// @ts-ignore
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
const { composePlugins, withNx } = require('@nx/next')

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '1GB',
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
    webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
]

module.exports = composePlugins(...plugins)(nextConfig)
