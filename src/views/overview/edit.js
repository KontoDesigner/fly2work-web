import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppService from '../../services/appService'
import Form from '../../components/form'
import * as RestClient from '../../infrastructure/restClient'
import * as ajaxStatusActions from '../../actions/ajaxStatusActions'
import * as helpers from '../../infrastructure/helpers'

class Edit extends Component {
    constructor(props) {
        super(props)

        const {
            match: { params }
        } = props

        this.state = {
            id: params.id,
            staff: null,
            loaded: false,
            initialValues: null
        }
    }

    async componentWillMount() {
        this.props.ajaxStatusActions.beginAjaxCall()

        var staff = await RestClient.get(`staff/getbyid/${this.state.id}`)
        const initialValues = await RestClient.get('staff/model')

        this.props.ajaxStatusActions.endAjaxCall()

        if (staff) {
            AppService.setTitle(`Overview - ${staff.firstName} ${staff.lastName}`)

            helpers.populateInitialValues(initialValues, staff)
        } else {
            AppService.setTitle('Overview - Request not found')
        }

        this.setState({ staff, initialValues, loaded: true })
    }

    handleStaffAttachments = attachments => {
        let staff = Object.assign({}, this.state.staff)

        staff.attachments = attachments

        this.setState({ staff })
    }

    render() {
        if (!this.state.loaded) {
            return ''
        }

        return this.state.staff ? (
            <div>
                <h2>
                    {this.state.staff.firstName} {this.state.staff.lastName}
                </h2>

                <Form
                    initialValues={this.state.initialValues}
                    disabled={true}
                    staff={this.state.staff}
                    flights={this.props.flights}
                    sourceMarkets={this.props.sourceMarkets}
                    seasons={this.props.seasons}
                    flightStatuses={this.props.flightStatuses}
                    roles={this.props.roles}
                    destinations={this.props.destinations}
                    statuses={this.props.statuses}
                    bsStatuses={this.props.bsStatuses}
                    userRoles={this.props.userRoles}
                    typeOfFlights={this.props.typeOfFlights}
                    iataCodes={this.props.iataCodes}
                    handleStaffAttachments={this.handleStaffAttachments}
                    travelTypes={this.props.travelTypes}
                    currencies={this.props.currencies}
                    paymentMethods={this.props.paymentMethods}
                    confirmedStatuses={this.props.confirmedStatuses}
                />
            </div>
        ) : (
            <h2>Request not found</h2>
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
        bsStatuses: state.geography.bsStatuses.map(s => ({
            value: s,
            label: s
        })),
        userRoles: state.user.userRoles,
        typeOfFlights: state.geography.typeOfFlights,
        iataCodes: state.geography.iataCodes,
        travelTypes: state.geography.travelTypes,
        currencies: state.geography.currencies,
        paymentMethods: state.geography.paymentMethods,
        confirmedStatuses: state.geography.confirmedStatuses.map(cs => ({
            value: cs,
            label: cs
        }))
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
