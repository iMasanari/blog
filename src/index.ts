import './style.css'
import { app } from 'hyperapp'
import App from './App'
import state, { State } from './modules/state'
import actions, { Actions } from './modules/actions'

const main = app<State, Actions>(state, actions, App, document.body)

window.addEventListener('popstate', () => {
  main.replace(location.pathname)
})

if (!window.__data) {
  main.replace(location.pathname)
}
