import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { minifyHtml } from 'vite-plugin-html'

export default defineConfig(({ mode }) => {
  const DEV = mode === 'development'

  return {
    plugins: [!DEV && viteSingleFile(), !DEV && minifyHtml()],
    build: {
      cssCodeSplit: false,
      assetsInlineLimit: 0,
      target: ['chrome64'],
    },
  }
})
