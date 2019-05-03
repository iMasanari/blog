import { h } from 'hyperapp'
import { Link } from '../routing/Link'
import { title } from '../constants'
import './Header.css'

export default () =>
  <header class="Header nes-container is-rounded is-dark">
    <h1 class="Header-title">
      <Link to="/">{title}</Link>
    </h1>
  </header>
