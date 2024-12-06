import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill'
import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'
import { pluginTailwindCSS } from 'rsbuild-plugin-tailwindcss'

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
  },
  plugins: [
    pluginNodePolyfill(),
    pluginTailwindCSS({
      config: './tailwind.config.ts',
    }),
    pluginReact({
      swcReactOptions: {
        runtime: 'classic',
      },
    }),
  ],
  tools: {
    lightningcssLoader: false,
  },
})
