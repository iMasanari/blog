import { app } from 'hyperapp'
import App from './App'
import { GA_TRACKING_ID } from './constants'
import { load } from './routing/preload'
import smoothScroll from './util/smoothScroll'
import 'prismjs/themes/prism.css'

export interface Data {
  component: number
  title: string
  props: any
}

const state = {
  data: (window.__data || {}) as Data,
}

let currentPath: string

const actions = {
  setData(data: Data) {
    return { data }
  },
  replace(path: string) {
    currentPath = path

    load(path, (data) => {
      if (path !== currentPath) return

      document.title = data.title
      main.setData(data)

      if (history.state && history.state.scrollTop) {
        // 描画後、スクロール位置を復元する
        setTimeout(() => {
          scrollTo(0, history.state.scrollTop)
        }, 0)
      }
    })

    window.gtag('config', GA_TRACKING_ID, { page_path: path })
  },
  linkHandler(event: Event) {
    const target = (event.currentTarget as HTMLElement).tagName.toLowerCase() === 'a'
      ? event.currentTarget
      : event.target

    const to = (target as HTMLElement).getAttribute('href')

    if (/^http/.test(to)) return

    event.preventDefault()
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    history.replaceState({ scrollTop }, null, location.pathname)
    history.pushState({ scrollTop: 0 }, null, to)
    smoothScroll()
    main.replace(to)
  }
}

export type State = typeof state
export type Actions = typeof actions

const main = app<State, Actions>(state, actions, App, document.body)

window.addEventListener('popstate', () => {
  main.replace(location.pathname)
})
