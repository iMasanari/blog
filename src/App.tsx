import { h } from 'hyperapp'
import Route from 'site-route'
import Header from './components/Header'
import Footer from './components/Footer'
import './shared.css'
import './App.css'

export default () =>
  <div class="App">
    <Header />
    <div class="content">
      <Route />
    </div>
    <Footer />
  </div>
