import React from 'react'
import { Router, Route } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import ReactGA from 'react-ga'
import Header from './components/Header'
import Footer from './components/Footer'
import LogPageView from './LogPageView'
import './App.css'

class App extends React.Component {
  componentDidMount() {
    ReactGA.initialize('UA-74494516-4', { debug: true })

    if (process.env.NODE_ENV !== 'production') {
      ReactGA.set({ sendHitTask: null })
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Routes />
          </div>
          <Footer />
          <Route path="/" component={LogPageView} />
        </div>
      </Router>
    )
  }
}

export default hot(module)(App)
