import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppService from '../../../services/appService'
import EditUserDialog from './form'
import * as RestClient from '../../../infrastructure/restClient'
import * as ajaxStatusActions from '../../../actions/ajaxStatusActions'
import * as newActions from '../../../actions/newActions'

class Edit extends Component {
    constructor(props) {
        super(props)

        const {
            match: { params }
        } = props

        const id = parseInt(params.id)

        this.state = {
            id: id,
            staff: null,
            loaded: false
        }
    }

    async componentWillMount() {
        this.props.ajaxStatusActions.beginAjaxCall()

        const staff = await RestClient.get(`people/${this.state.id}`)

        this.props.ajaxStatusActions.endAjaxCall()

        if (staff) {
            AppService.setTitle(`New - ${staff.name}`)
        } else {
            AppService.setTitle('Staff not found')
        }

        this.setState({ staff, loaded: true })
    }

    handleStaff = staff => {
        this.setState({ staff })

        this.props.newActions.insertStaff(staff)
    }

    render() {
        if (!this.state.loaded) {
            return ''
        }

        return this.state.staff ? (
            <EditUserDialog
                staff={this.state.staff}
                handleStaff={this.handleStaff}
                flights={this.props.flights}
                airports={this.props.airports}
                sourceMarkets={this.props.sourceMarkets}
                seasons={this.props.seasons}
                flightStatuses={this.props.flightStatuses}
                roles={this.props.roles}
                destinations={this.props.destinations}
            />
        ) : (
            <div>Staff not found</div>
        )
    }
}

function mapStateToProps(state) {
    return {
        flights: state.geography.flights,
        airports: state.geography.airports,
        sourceMarkets: state.geography.sourceMarkets,
        seasons: state.geography.seasons,
        flightStatuses: state.geography.flightStatuses,
        roles: state.geography.roles,
        destinations: state.geography.destinations
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ajaxStatusActions: bindActionCreators(ajaxStatusActions, dispatch),
        newActions: bindActionCreators(newActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit)
