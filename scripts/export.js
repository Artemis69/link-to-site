import fs from 'fs/promises'

async function run() {
  const html = await fs.readFile('./dist/index.html', { encoding: 'utf8' })

  await fs.writeFile(
    './out/index.js',
    'export default `' +
      html.replaceAll('`', '\\`').replaceAll('${', '\\${') +
      '`',
    'utf8'
  )
}

run()
