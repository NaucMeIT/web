import { defineConfig } from '@tanstack/start/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { cjsInterop } from "vite-plugin-cjs-interop"

export default defineConfig({
  vite: {
    plugins: [
      tsconfigPaths(),
      cjsInterop({
        dependencies: [
          "@sinclair/typebox",
          "@sinclair/typebox/**",
          "elysia/**"
        ]
      })
    ],
    ssr: {
      noExternal: ["elysia", "@sinclair/typebox"]
    }
  },
})
