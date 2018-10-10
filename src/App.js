import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import Loader from './components/loader'
import Menu from './components/menu'
import './styles/site.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div id="outer-container" style={{ height: '100%' }}>
          <Menu />

          <main id="page-wrap">
            <div className="App">
              <Loader />

              <Routes />
            </div>
          </main>
        </div>
      </Router>
    )
  }
}

export default App
