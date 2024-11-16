// @ts-ignore
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
  webpack: (config, { isServer, webpack }) => {
    if (isServer) {
      config.plugins = [...config.plugins]
    }
    config.experiments = { ...config.experiments, topLevelAwait: true }
    config.externals['node:fs'] = 'commonjs node:fs'
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '')
      }),
    )

    return config
  },
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
]

module.exports = composePlugins(...plugins)(nextConfig)
