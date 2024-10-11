import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import react from '@vitejs/plugin-react'
/// <reference types='vitest' />
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import { one } from 'one/vite'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/one-transcribe',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md']), one({ config: { tsConfigPaths: false }})],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/apps/one-transcribe',
    emptyOutDir: true,
    reportCompressedSize: true,
    rollupOptions: {
      maxParallelFileOps: 1
    },
    commonjsOptions: {
      strictRequires: true,
    }
  },
}) satisfies UserConfig
