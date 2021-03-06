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
import * as maintenanceActions from './actions/maintenanceActions'
import { Container } from 'reactstrap'
import Maintenance from './views/maintenance/maintenance'
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

        await this.props.maintenanceActions.getMaintenance()

        if (this.props.maintenance !== true) {
            const _this = this

            return Promise.all([
                this.props.userActions.getUser(),
                this.props.geographyActions.getSourceMarkets(),
                this.props.geographyActions.getDestinations(),
                this.props.menuActions.getStaffCount(),
                this.props.geographyActions.getIataCodes()
            ]).then(function() {
                _this.setState({ loaded: true })
            })
        }
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

                    {this.props.maintenance === true && <Maintenance />}

                    {this.state.loaded && (
                        <div id="outer-container" style={{ height: '100%' }}>
                            <Menu isOpen={this.props.isOpen} handleIsOpen={this.props.menuActions.handleIsOpen} staffCount={this.props.staffCount} />

                            <div className={this.props.isOpen ? 'main page-wrap-open' : 'main'} id="page-wrap">
                                <div className="App">
                                    <Container>
                                        <Routes userRoles={this.props.userRoles} />
                                    </Container>
                                </div>
                            </div>
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
        ajaxCallsInProgress: state.ajaxCallsInProgress,
        userRoles: state.user.userRoles,
        maintenance: state.maintenance
    }
}

function mapDispatchToProps(dispatch) {
    return {
        geographyActions: bindActionCreators(geographyActions, dispatch),
        menuActions: bindActionCreators(menuActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        maintenanceActions: bindActionCreators(maintenanceActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
