import { defineConfig } from '@tanstack/start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  vite: {
    plugins: [tsConfigPaths({})],
    ssr: {
      noExternal: ['react-dropzone'],
    },
  },

  server: {
    preset: "vercel",
  },
})
