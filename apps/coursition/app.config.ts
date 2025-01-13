import { builtinModules } from 'module'
import { defineConfig } from '@tanstack/start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  vite: {
    plugins: [tsConfigPaths({})],
    ssr: {
      noExternal: ['react-dropzone', '@douyinfe/semi-ui'],
      target: 'node',
    },
    optimizeDeps: {
      include: ['@douyinfe/semi-ui'],
    },
    build: {
      rollupOptions: {
        external: [...builtinModules, /^node:/],
      },
    },
  },

  server: {
    preset: 'vercel',
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },
})
