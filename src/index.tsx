import { app } from 'hyperapp'
import { location as routerLocation } from './routing/Link'
import App from './App'
import { GA_TRACKING_ID } from './constants'
import smoothScroll from './util/smoothScroll'
import { load } from './routing/preload'
import 'prismjs/themes/prism.css'

export interface Data {
  component: number
  title: string
  props: any
}

const state = {
  location: routerLocation.state,
  data: (window.__data || {}) as Data,
}

export type State = typeof state

const actions = {
  location: routerLocation.actions,
  setData: (data: Data) => (state: State) => {
    document.title = data.title

    return { ...state, data }
  },
}

const main: any = app(state, actions, App, document.body)

// const unsubscribe = 
routerLocation.subscribe(main.location)

const handleLocationChange = (e: Event) => {
  if (e.type === 'pushstate') {
    smoothScroll()
  }

  // Google アナリティクスに送信
  window.gtag('config', GA_TRACKING_ID, {
    page_path: location.pathname
  })

  // ページデータを取得
  load(location.pathname, (data) => { main.setData(data) })
}

addEventListener("pushstate", handleLocationChange)
addEventListener("popstate", handleLocationChange)
