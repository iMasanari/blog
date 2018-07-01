import React from 'react'
import { Link } from 'react-static'
import { title } from '../constants'
import './Header.css'

export default () =>
  <header className="Header">
    <h1 className="Header-title">
      <Link exact to="/">{title}</Link>
    </h1>
  </header>
