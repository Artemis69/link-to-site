import type { Plugin } from 'vite'
import fs from 'fs/promises'

export const exportPlugin = (): Plugin => {
  return {
    name: 'export plugin',
    enforce: 'post',
    async buildEnd() {
      const html = await fs.readFile('./dist/index.html', { encoding: 'utf8' })

      await fs.writeFile(
        './out/index.js',
        'export default `' +
          html.replaceAll('`', '\\`').replaceAll('${', '\\${') +
          '`',
        'utf8'
      )
    },
  }
}
