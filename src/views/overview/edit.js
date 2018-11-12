import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppService from '../../services/appService'
import Form from '../../components/form'
import * as RestClient from '../../infrastructure/restClient'
import * as ajaxStatusActions from '../../actions/ajaxStatusActions'

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

        const staff = await RestClient.get(`staff/getbyid/${this.state.id}`)

        this.props.ajaxStatusActions.endAjaxCall()

        if (staff) {
            AppService.setTitle(`Overview - ${staff.name}`)
        } else {
            AppService.setTitle('Staff not found')
        }

        this.setState({ staff, loaded: true })
    }

    render() {
        if (!this.state.loaded) {
            return ''
        }

        return this.state.staff ? (
            <div>
                <h2>{this.state.staff.name}</h2>

                <Form
                    disabled={true}
                    staff={this.state.staff}
                    flights={this.props.flights}
                    sourceMarkets={this.props.sourceMarkets}
                    seasons={this.props.seasons}
                    flightStatuses={this.props.flightStatuses}
                    roles={this.props.roles}
                    destinations={this.props.destinations}
                    statuses={this.props.statuses}
                    user={this.props.user}
                    typeOfFlights={this.props.typeOfFlights}
                    iataCodes={this.props.iataCodes}
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
        })),
        user: state.user,
        typeOfFlights: state.geography.typeOfFlights,
        iataCodes: state.geography.iataCodes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ajaxStatusActions: bindActionCreators(ajaxStatusActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit)
