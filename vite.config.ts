import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    target: ['chrome64'],
  },
  esbuild: {
    legalComments: 'none',

  },
  appType: 'mpa'
})
