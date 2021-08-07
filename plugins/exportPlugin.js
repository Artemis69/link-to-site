import fs from 'fs/promises'

export const exportPlugin = () => {
  return {
    name: 'export plugin',
    transformIndexHtml: {
      enforce: 'post',
      async transform(html) {
        await fs.writeFile(
          './out/index.js',
          'export default `' + html.replaceAll('`', '\\`').replaceAll('${', '\\${') + '`',
          'utf8'
        )
      },
    },
  }
}
