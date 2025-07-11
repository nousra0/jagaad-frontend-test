import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~': resolve(__dirname, './'),
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'index.html')
      }
    }
  },
  ssr: {
    // SSR-specific build options
    noExternal: ['vue', 'vue-router', 'pinia']
  }
})
