import { appTools, defineConfig } from '@modern-js/app-tools'
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss'
import { loadEnv } from '@rsbuild/core'
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill'

const { publicVars } = loadEnv({ cwd: '../..' })

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  source: {
    define: publicVars,
  },
  runtime: {
    router: true,
  },
  builderPlugins: [pluginNodePolyfill()],
  plugins: [
    appTools({
      bundler: 'rspack', // Set to 'webpack' to enable webpack
    }),
    tailwindcssPlugin(),
  ],
})
