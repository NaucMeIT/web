import { SemiRspackPlugin } from '@douyinfe/semi-rspack-plugin'
import { defineConfig } from '@rsbuild/core'
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack'

export default defineConfig({
  plugins: [pluginSass(), pluginNodePolyfill(), pluginReact()],
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
