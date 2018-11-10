import { app } from 'hyperapp'
import page from 'page'
import App from './App'
import { GA_TRACKING_ID } from './constants'
import { load } from './routing/preload'
import 'prismjs/themes/prism.css'

export interface Data {
  component: number
  title: string
  props: any
}

const state = {
  data: (window.__data || {}) as Data,
}

export type State = typeof state

const actions = {
  setData: (data: Data) => {
    document.title = data.title

    return { data }
  },
}

const main = app(state, actions, App, document.body) as any

page('*', (ctx) => {
  load(ctx.pathname, main.setData)

    // Google アナリティクスに送信
  if (ctx.pathname !== location.pathname) {
    window.gtag('config', GA_TRACKING_ID, { page_path: ctx.pathname })
  }
})
page.start()
