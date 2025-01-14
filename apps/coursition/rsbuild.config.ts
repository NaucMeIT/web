import { SemiRspackPlugin } from '@douyinfe/semi-rspack-plugin'
import { type RsbuildPlugin, defineConfig } from '@rsbuild/core'
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack'
import { withZephyr } from 'zephyr-webpack-plugin'

const zephyrRsbuildPlugin = (): RsbuildPlugin => ({
  name: 'zephyr-rsbuild-plugin',
  setup: (api) => {
    api.modifyRspackConfig(async (config, utils) => {
      //@ts-expect-error
      const zephyrConfig = await withZephyr()(config)
      //@ts-expect-error
      utils.mergeConfig(config, zephyrConfig)
    })
  },
})

export default defineConfig({
  plugins: [pluginSass(), pluginNodePolyfill(), pluginReact(), zephyrRsbuildPlugin()],
  source: {
    entry: { index: './src/main.tsx' },
  },
  html: {
    template: './src/index.html',
  },
  tools: {
    rspack: {
      plugins: [
        ...(process.env['RSDOCTOR'] === 'true' ? [new RsdoctorRspackPlugin()] : []),
        new SemiRspackPlugin({
          cssLayer: true,
        }),
        TanStackRouterRspack(),
      ],
    },
  },
  output: {
    copy: [{ from: './src/favicon.ico' }, { from: './src/assets' }],

    target: 'web',
    distPath: {
      root: 'dist',
    },
  },
})
