import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import Routes from './infrastructure/routes'
import Loader from './components/loader'
import Menu from './components/menu'
import * as StaffService from './services/staffService'
import './styles/site.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      count: {},
    }
  }

  async componentWillMount() {
    const _this = this

    return Promise.all([await StaffService.getCount()]).then(function(res) {
      _this.setState({ loaded: true, count: res[0] })
    })
  }

  matchRuleShort(str, rule) {
    return new RegExp('^' + rule.split('*').join('.*') + '$').test(str)
  }

  getCount = async () => {
    const count = await StaffService.getCount()

    this.setState({ count })
  }

  render() {
    const MenuWithRouter = withRouter(props => {
      //Menu should ber hidden as default with this condition
      if (!this.matchRuleShort(props.location.pathname, '/new/*')) {
        return <Menu count={this.state.count} isMenuOpen={true} />
      } else {
        return <Menu count={this.state.count} isMenuOpen={false} />
      }
    })

    return (
      <Router>
        <div>
          <Loader />

          {this.state.loaded && (
            <div id="outer-container" style={{ height: '100%' }}>
              <MenuWithRouter />

              <main id="page-wrap">
                <div className="App">
                  <Routes />
                </div>
              </main>
            </div>
          )}
        </div>
      </Router>
    )
  }
}

export default App
