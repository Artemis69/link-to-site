import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { minifyHtml } from 'vite-plugin-html'
import { exportPlugin } from './plugins/exportPlugin'

const DEV = process.env.MODE === 'dev'

export default defineConfig({
  plugins: [
    !DEV && viteSingleFile(),
    !DEV && minifyHtml(),
    !DEV && exportPlugin(),
  ],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    target: ['chrome64'],
  },
})
