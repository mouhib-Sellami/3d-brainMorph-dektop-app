import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        "@": resolve("./src/renderer/src"),
        "@components": resolve("./src/renderer/components/src"),
        "@pages": resolve("./src/renderer/pages/src"),
        "@assets": resolve("./src/renderer/assets"),
        "@contexts": resolve("./src/renderer/contexts"),
        "@redux": resolve("./src/renderer/redux"),
      }
    },
    plugins: [
      wasm(),
      topLevelAwait(),
      react()
    ],
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo: any) => {
            if (assetInfo.name.endsWith('.wasm')) {
              return 'assets/[name][extname]';
            }
            return 'assets/[name][extname]';
          },
        },
      },
    },
  }
})
