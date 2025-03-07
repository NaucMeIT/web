import { SemiRspackPlugin } from '@douyinfe/semi-rspack-plugin'
import { appTools, defineConfig } from '@modern-js/app-tools'
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss'
import { loadEnv } from '@rsbuild/core'
import { pluginImageCompress } from '@rsbuild/plugin-image-compress'
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill'

const { publicVars } = loadEnv({ cwd: '../..' })

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  output: {
    polyfill: 'usage',
  },
  source: {
    define: publicVars,
  },
  runtime: {
    router: {
      future: {
        v7_startTransition: true,
        // Other features are not typed in @modern-js/runtime, so we need to use any
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      } as any,
    },
  },
  builderPlugins: [pluginNodePolyfill(), pluginImageCompress(['jpeg', 'png', 'ico', 'avif', 'svg'])],
  plugins: [
    appTools({
      bundler: 'rspack',
    }),
    tailwindcssPlugin(),
  ],
  tools: {
    rspack: {
      cache: true,
      experiments: {
        topLevelAwait: true,
        incremental: true,
        futureDefaults: true,
      },
      plugins: [
        new SemiRspackPlugin({
          cssLayer: true,
        }),
      ],
    },
  },
})
