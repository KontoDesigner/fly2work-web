import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './infrastructure/routes'
import Loader from './components/loader'
import Menu from './components/menu'
import * as AppService from './services/appService'
import ReduxToastr from 'react-redux-toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as geographyActions from './actions/geographyActions'
import * as menuActions from './actions/menuActions'
import * as userActions from './actions/userActions'
import { Container } from 'reactstrap'
import './styles/site.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loaded: false
        }
    }

    async componentWillMount() {
        AppService.setTitle()

        const _this = this

        return Promise.all([
            this.props.userActions.getUserRoles(),
            this.props.geographyActions.getSourceMarkets(),
            this.props.geographyActions.getDestinations(),
            this.props.menuActions.getStaffCount(),
            this.props.geographyActions.getIataCodes()
        ]).then(function() {
            _this.setState({ loaded: true })
        })
    }

    render() {
        return (
            <Router>
                <div style={{ height: '100%' }}>
                    <ReduxToastr
                        timeOut={5000}
                        newestOnTop={true}
                        preventDuplicates={true}
                        position="top-center"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar
                    />

                    <Loader loaded={this.state.loaded} isOpen={this.props.isOpen} ajaxCallsInProgress={this.props.ajaxCallsInProgress} />

                    {this.state.loaded && (
                        <div id="outer-container" style={{ height: '100%' }}>
                            <Menu isOpen={this.props.isOpen} handleIsOpen={this.props.menuActions.handleIsOpen} staffCount={this.props.staffCount} />

                            <main className={this.props.isOpen ? 'page-wrap-open' : ''} id="page-wrap">
                                <div className="App">
                                    <Container>
                                        <Routes />
                                    </Container>
                                </div>
                            </main>
                        </div>
                    )}
                </div>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        isOpen: state.menu.isOpen,
        staffCount: state.menu.staffCount,
        ajaxCallsInProgress: state.ajaxCallsInProgress
    }
}

function mapDispatchToProps(dispatch) {
    return {
        geographyActions: bindActionCreators(geographyActions, dispatch),
        menuActions: bindActionCreators(menuActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
