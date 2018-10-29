import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppService from '../../services/appService'
import Form from '../../components/form'
import * as RestClient from '../../infrastructure/restClient'
import * as ajaxStatusActions from '../../actions/ajaxStatusActions'
import * as pendingActions from '../../actions/pendingActions'
import { Statuses as statuses } from '../../constants/geographyConstants'

class Edit extends Component {
    constructor(props) {
        super(props)

        const {
            match: { params }
        } = props

        this.state = {
            id: params.id,
            staff: null,
            loaded: false
        }
    }

    async componentWillMount() {
        this.props.ajaxStatusActions.beginAjaxCall()

        const staff = await RestClient.get(`staff/${statuses.Pending}/${this.state.id}`)

        this.props.ajaxStatusActions.endAjaxCall()

        if (staff) {
            AppService.setTitle(`${statuses.Pending} - ${staff.name}`)
        } else {
            AppService.setTitle('Staff not found')
        }

        this.setState({ staff, loaded: true })
    }

    handleStaff = staff => {
        this.setState({ staff })

        this.props.pendingActions.updateStaff(staff)

        this.props.pendingActions.getStaffs()
    }

    render() {
        if (!this.state.loaded) {
            return ''
        }

        return this.state.staff ? (
            <div>
                <h2>{this.state.staff.name}</h2>

                <Form
                    staff={this.state.staff}
                    handleStaff={this.handleStaff}
                    flights={this.props.flights}
                    sourceMarkets={this.props.sourceMarkets}
                    seasons={this.props.seasons}
                    flightStatuses={this.props.flightStatuses}
                    roles={this.props.roles}
                    destinations={this.props.destinations}
                    statuses={this.props.statuses}
                />
            </div>
        ) : (
            <h2>Staff not found</h2>
        )
    }
}

function mapStateToProps(state) {
    return {
        sourceMarkets: state.geography.sourceMarkets,
        roles: state.geography.roles,
        destinations: state.geography.destinations,
        statuses: state.geography.statuses.map(s => ({
            value: s,
            label: s
        }))
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ajaxStatusActions: bindActionCreators(ajaxStatusActions, dispatch),
        pendingActions: bindActionCreators(pendingActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit)
