import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'example',
  resolve: {
    alias: {
      'vue-final-form': resolve('./src/index.js'),
    },
  },
  plugins: [vue()],
})
