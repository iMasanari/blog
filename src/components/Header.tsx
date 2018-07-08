import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import { title } from '../constants'
import './Header.css'

export default () =>
  <header class="Header">
    <h1 class="Header-title">
      <Link to="/">{title}</Link>
    </h1>
  </header>
