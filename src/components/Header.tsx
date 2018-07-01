import React from 'react'
import { Link } from 'react-static'
import './Header.css'

export default () =>
  <header className="Header">
    <h1 className="Header-title">
      <Link exact to="/">SANDBOX</Link>
    </h1>
  </header>
