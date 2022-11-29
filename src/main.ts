import './style.css'
import dark_preview_image from './assets/dark_preview.png'
import light_preview_image from './assets/light_preview.png'

export interface IRes {
  message: string
  id?: string
}

const form: HTMLFormElement = document.querySelector('form')
const output: HTMLDivElement = document.querySelector('#output')
const submitButton: HTMLButtonElement = form.querySelector('button')
const resetButton: HTMLButtonElement = form.querySelector(
  'button[type="reset"]'
)
const preview: HTMLDivElement = document.querySelector('.previews')

let title = '',
  description = '',
  image = '',
  redirect = '',
  preview_image = light_preview_image

form.querySelector('#title').addEventListener('input', e => {
  title = (e.target as HTMLInputElement).value
  updatePreview()
})
form.querySelector('#description').addEventListener('input', e => {
  description = (e.target as HTMLInputElement).value
  updatePreview()
})
form.querySelector('#image').addEventListener('input', e => {
  image = (e.target as HTMLInputElement).value
  updatePreview()
})
form.querySelector('#redirect').addEventListener('input', e => {
  redirect = (e.target as HTMLInputElement).value
  updatePreview()
})

submitButton.addEventListener('click', async () => {
  output.innerHTML = ''

  if (title === '' || description === '' || image === '' || redirect === '') {
    output.innerHTML =
      '<p>Убедитесь, что вы заполнили все поля, а затем попробуйте снова</p>'
    return
  }

  try {
    const res = await fetch('/create', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        title,
        description,
        image,
        redirect,
      }),
    })

    const data: IRes = await res.json()

    if (res.status === 201) {
      output.innerHTML = `<p>Успех! А вот и <a target="_blank" href="/${data.id}">ссылка</a></p>`
    } else {
      output.innerHTML = `<p>Произошла ошибка. Причина: <span>${data.message}</span></p>`
    }
  } catch {
    output.innerHTML =
      '<p>Произошла ошибка. <span role="img" aria-label="Сожалеющее лицо">😔</span> Пожалуйста, сообщите об ошибке <a target="_blank" rel="noreferrer" href="https://github.com/yhdgms1/">разработчику</a>.</p>'
  }
})

resetButton.addEventListener('click', () => {
  title = ''
  description = ''
  image = ''
  redirect = ''
  updatePreview()
})

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

if (darkModeMediaQuery.matches) {
  document.documentElement.classList.add('dark')
  preview_image = dark_preview_image
}

function onDarkModeChange(e: MediaQueryListEvent) {
  if (e.matches) {
    document.documentElement.classList.add('dark')
    preview_image = dark_preview_image
  } else {
    document.documentElement.classList.remove('dark')
    preview_image = light_preview_image
  }

  updatePreview()
}

typeof darkModeMediaQuery.addEventListener === 'function'
  ? darkModeMediaQuery.addEventListener('change', onDarkModeChange)
  : darkModeMediaQuery.addListener(onDarkModeChange)

const twitterTitle: HTMLHeadingElement = preview.querySelector(
    '.twitterTextBlock h2'
  ),
  discrodTitle: HTMLDivElement = document.querySelector('.discordTitle'),
  twitterDescription: HTMLParagraphElement = preview.querySelector(
    '.twitterTextBlock p'
  ),
  discordDescription: HTMLSpanElement = preview.querySelector(
    '.discordDescription span'
  ),
  twitterLink: HTMLSpanElement = preview.querySelector(
    '.twitterTextBlock span'
  ),
  twitterImage: HTMLDivElement = preview.querySelector('.twitterLargeImage'),
  discordImage: HTMLImageElement = preview.querySelector('.discordImage img')

twitterLink.innerHTML += document.location.href.split('#')[0]

const updatePreview = () => {
  const _image = image || preview_image
  const _title = title || 'Тут будет заголовок'
  const _description = description || 'Тут будет описание'

  if (discordImage.getAttribute('src') !== _image) {
    twitterImage.setAttribute('style', `background-image: url("${_image}")`)
    discordImage.setAttribute('src', _image)
  }

  if (twitterTitle.textContent !== _title) {
    twitterTitle.textContent = _title
    discrodTitle.textContent = _title
  }

  if (twitterDescription.textContent !== _description) {
    twitterDescription.textContent = _description
    discordDescription.textContent = _description
  }
}

updatePreview()
