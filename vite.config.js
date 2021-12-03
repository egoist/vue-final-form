import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'example',
  resolve: {
    alias: {
      'vue-final-form': path.resolve('./src/index.js'),
    },
  },
  plugins: [vue()],
})
