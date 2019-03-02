import { h } from 'hyperapp'
import Route from '../build-cache/site-route'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

export default () =>
  <div class="App">
    <Header />
    <div class="content">
      <Route />
    </div>
    <Footer />
  </div>
