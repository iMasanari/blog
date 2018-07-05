import React from 'react'
import ReactGA from 'react-ga'

export default class LogPageView extends React.Component {
  state = {
    initialised: false,
    hasWindow: false,
  }

  componentWillMount() {
    this.setState({
      initialised: true,
    })
  }

  componentDidMount() {
    this.setState({
      hasWindow: true,
    })
  }

  render(): null {
    if (this.state.initialised && this.state.hasWindow) {
      ReactGA.set({
        page: window.location.pathname,
      })

      ReactGA.pageview(window.location.pathname)
    }
    return null
  }
}