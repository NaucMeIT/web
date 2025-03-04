import { SemiRspackPlugin } from '@douyinfe/semi-rspack-plugin'
import { defineConfig, loadEnv } from '@rsbuild/core'
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack'
import { zephyrRsbuildPlugin } from './src/lib/zephyr-rspack'

const { publicVars } = loadEnv({ cwd: '../..' })

export default defineConfig({
  plugins: [pluginSass(), pluginNodePolyfill(), pluginReact(), zephyrRsbuildPlugin()],
  source: {
    entry: { index: './src/main.tsx' },
    define: publicVars,
  },
  html: {
    template: './src/index.html',
  },
  tools: {
    rspack: {
      cache: true,
      plugins: [
        ...(process.env['RSDOCTOR'] === 'true'
          ? [
              new RsdoctorRspackPlugin({
                supports: {
                  generateTileGraph: true,
                },
              }),
            ]
          : []),
        new SemiRspackPlugin({
          cssLayer: true,
        }),
        TanStackRouterRspack(),
      ],
      experiments: {
        parallelCodeSplitting: true,
        cache: {
          type: 'persistent',
        },
      },
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
