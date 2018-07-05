import React from 'react'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <div className="content">
        <Routes />
      </div>
      <Footer />
    </div>
  </Router>
)

export default hot(module)(App)
