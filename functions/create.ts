/// <reference types="@cloudflare/workers-types" />

import type { IExpandedPage } from '../lib/types'
import { nanoid } from 'nanoid/non-secure'
import { isURL, createResponse } from '../lib'

const hash = (s: string) => s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0).toString(36).slice(1);

export const onRequestPost: PagesFunction<{
  DB: KVNamespace
}> = async context => {
  try {
    const { request, env: { DB } } = context;
    const body: Partial<IExpandedPage> = await request.json();

    if (!body.description || !body.image || !body.redirect || !body.title) {
      return createResponse(
        {
          message: "Вы должны указать 'description', 'image', 'title' и 'redirect'",
        },
        422
      )
    }

    if (!isURL(body.redirect)) {
      return createResponse({ message: 'URL-адрес недействителен' }, 422)
    }

    if (body.redirect.length > 250) {
      return createResponse(
        { message: 'Длина URL-адреса для переадрессации должна быть меньше или равна 250' },
        422
      )
    }

    /*
     * '👨‍👨‍👧‍👧'.length --> 11
     * Подумать, что делать с Unicode символами
     */
    if (body.title.length > 70) {
      return createResponse(
        { message: 'Длина заголовка должна быть меньше или равна 70' },
        422
      )
    }

    if (body.description.length > 150) {
      return createResponse(
        { message: 'Длина описания должна быть меньше или равна 150' },
        422
      )
    }

    if (body.image.startsWith('data:')) {
      return createResponse(
        { message: 'Запрещено использовать data:image' },
        422
      )
    }

    if (!isURL(body.image)) {
      return createResponse(
        { message: 'URL-адрес картинки недействителен' },
        422
      )
    }

    if (body.image.length > 200) {
      return createResponse(
        { message: 'Длина URL-адреса картинки должна быть меньше или равна 200' },
        422
      )
    }

    const id = nanoid(6) + '_' + hash(body.redirect)

    await DB.put(
      id,
      JSON.stringify({
        d: body.description,
        i: body.image,
        r: body.redirect,
        t: body.title,
      })
    )

    return createResponse({ message: 'Создано успешно', id }, 201)
  } catch (error) {
    return createResponse({ message: error.message }, 500)
  }
}
