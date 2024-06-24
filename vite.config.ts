import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url';


import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@constants': fileURLToPath(
        new URL('./src/core/constants', import.meta.url),
      ),
      '@routers': fileURLToPath(new URL('./src/core/routers', import.meta.url)),
      '@components': fileURLToPath(
        new URL('./src/shared/components', import.meta.url),
      ),
      '@lib': fileURLToPath(
        new URL('./src/shared/lib', import.meta.url),
      ),
      '@layouts': fileURLToPath(
        new URL('./src/shared/layouts', import.meta.url),
      ),
      '@guards': fileURLToPath(new URL('./src/core/guards', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@helpers': fileURLToPath(new URL('./src/core/helpers', import.meta.url)),
      '@interfaces': fileURLToPath(
        new URL('./src/shared/interfaces', import.meta.url),
      ),
      '@classes': fileURLToPath(
        new URL('./src/shared/classes', import.meta.url),
      ),
      '@composable': fileURLToPath(
        new URL('./src/shared/composable', import.meta.url),
      ),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/core/stores', import.meta.url)),
    },
  },
  plugins: [vue()],
})
