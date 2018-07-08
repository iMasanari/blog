import { app } from 'hyperapp'
import { location as routerLocation } from '@hyperapp/router'
import App from './App'
import 'prismjs/themes/prism.css'

const state = {
  location: routerLocation.state,
  data: (window as any).__data || {},
}

export type State = typeof state

const actions = {
  location: routerLocation.actions,
  setData: (data: any) => (state: State) => ({ ...state, data }),
}

const main: any = app(state, actions, App, document.body)

// const unsubscribe = 
routerLocation.subscribe(main.location)

const handleLocationChange = () => {
  const xhr = new XMLHttpRequest()

  xhr.open('get', `${location.pathname}index.json`)

  xhr.onload = () => {
    main.setData(JSON.parse(xhr.responseText))
  }

  xhr.send()
}

addEventListener("pushstate", handleLocationChange)
addEventListener("popstate", handleLocationChange)
