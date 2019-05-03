import { Data, State } from './state'
import { load } from '../routing/preload'
import { GA_TRACKING_ID } from '../constants'

const gtag = window.gtag as ((...args: any[]) => void) | undefined

const isModifiedEvent = (e: MouseEvent) =>
  e.metaKey || e.altKey || e.ctrlKey || e.shiftKey

let currentPath: string

export type Actions = typeof actions

const actions = {
  setData: (data: Data) => {
    return { data }
  },
  replace: (path: string) => (state: State, actions: Actions) => {
    currentPath = path

    load(path, (data) => {
      if (path !== currentPath) return

      document.title = data.title
      actions.setData(data)

      if (history.state && history.state.scrollTop) {
        // 描画後、スクロール位置を復元する
        setTimeout(() => {
          scrollTo(0, history.state.scrollTop)
        }, 0)
      }
    })

    if (gtag) {
      gtag('config', GA_TRACKING_ID, { page_path: path })
    }
  },
  linkHandler: (event: MouseEvent) => (state: State, actions: Actions) => {
    const target = (event.currentTarget as HTMLElement).tagName.toLowerCase() === 'a'
      ? event.currentTarget
      : event.target

    const to = (target as HTMLElement).getAttribute('href')!

    if (/^http/.test(to) || isModifiedEvent(event)) return

    event.preventDefault()
    const scrollTop = document.documentElement!.scrollTop || document.body.scrollTop

    history.replaceState({ scrollTop }, '', location.pathname)
    history.pushState({ scrollTop: 0 }, '', to)
    actions.replace(to)

    setTimeout(() => scrollTo(0, 0))
  },
}

export default actions
