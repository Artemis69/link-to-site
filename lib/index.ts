import type { IPage, IExpandedPage } from './types'

const escaped: { [key: string]: string } = {
  '"': '&quot;',
  "'": '&#39;',
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
}

const escape = (html: string): string =>
  html.replace(/["'&<>]/g, match => escaped[match])

export const expandData = (data: IPage): IExpandedPage => {
  return {
    description: data.d,
    image: data.i,
    redirect: data.r,
    title: data.t
  }
}

export const createFakePreview = (props: IExpandedPage) =>
  `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escape(props.title)}</title>
  <meta property="twitter:title" content="${escape(props.title)}">
  <meta property="og:title" content="${escape(props.title)}" />
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:description" content="${escape(props.description)}">
  <meta name="description" content="${escape(props.description)}" />
  <meta property="og:description" content="${escape(props.description)}" />
  <meta property="og:image" content="${escape(props.image)}" />
  <meta property="twitter:image" content="${escape(props.image)}">
</head>
<body></body>
</html>`

export function isBot(request: Request): boolean {
  const useragent = request.headers.get('user-agent')?.toLowerCase() || ''

  return (
    useragent.includes('bot') ||
    useragent.includes('vk') ||
    useragent.includes('viber') ||
    useragent.includes('whatsapp') ||
    useragent.includes('fb') ||
    useragent.includes('ok') ||
    useragent === ''
  )
}

export const isURL = (maybeURL: string): boolean => {
  if ('canParse' in URL) {
    try {
      return URL.canParse(maybeURL)
    } catch {}
  }

  try {
    new URL(maybeURL)
  } catch {
    return false
  }

  return true
}

export const headers = {
  'Access-Control-Allow-Origin': 'https://link-to.pages.dev',
  'Access-Control-Allow-Methods': 'GET, POST',
}

export const createResponse = (body: any, statusCode: number = 200) => {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers,
  })
}
