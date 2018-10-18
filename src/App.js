import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './infrastructure/routes'
import Loader from './components/loader'
import Menu from './components/menu'
import * as StaffService from './services/staffService'
import { ToastContainer } from 'react-toastify'
import * as AppService from './services/appService'
import './styles/site.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loaded: false,
            isMenuOpen: true,
            count: {}
        }
    }

    async componentWillMount() {
        AppService.setTitle()

        const count = await StaffService.getCount()

        this.setState({ count, loaded: true })
    }

    getCount = async () => {
        const count = await StaffService.getCount()

        this.setState({ count })
    }

    handleIsMenuOpen = state => {
        this.setState({ isMenuOpen: state.isOpen })
    }

    render() {
        return (
            <Router>
                <div style={{ height: '100%' }}>
                    <ToastContainer />

                    <Loader />

                    {this.state.loaded && (
                        <div id="outer-container" style={{ height: '100%' }}>
                            <Menu handleIsMenuOpen={this.handleIsMenuOpen} isMenuOpen={this.state.isMenuOpen} count={this.state.count} />

                            <main id="page-wrap" style={{ marginRight: this.state.isMenuOpen === true ? '300px' : '' }}>
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
