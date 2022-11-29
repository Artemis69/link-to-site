import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [],
    build: {
      cssCodeSplit: false,
      assetsInlineLimit: 0,
      target: ['chrome64'],
    },
    appType: 'mpa'
  }
})
