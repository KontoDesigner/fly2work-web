import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppService from '../../services/appService'
import Form from '../../components/form'
import * as RestClient from '../../infrastructure/restClient'
import * as ajaxStatusActions from '../../actions/ajaxStatusActions'
import * as pendingDESActions from '../../actions/pendingDESActions'
import { Statuses as statuses } from '../../constants/geographyConstants'
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
            loaded: false
        }
    }

    async componentWillMount() {
        this.props.ajaxStatusActions.beginAjaxCall()

        var staff = await RestClient.get(`staff/${statuses.PendingDES}/${this.state.id}`)
        const initialValues = await RestClient.get('staff/model')

        this.props.ajaxStatusActions.endAjaxCall()

        if (staff) {
            AppService.setTitle(`Pending DES - ${staff.firstName} ${staff.lastName}`)

            helpers.populateInitialValues(initialValues, staff)
        } else {
            AppService.setTitle('Pending DES - Request not found')
        }

        this.setState({ staff, loaded: true })
    }

    handleStaff = async staff => {
        staff.attachments = this.state.staff.attachments

        this.setState({ staff })

        const res = await this.props.pendingDESActions.updateStaff(staff)

        if (res && res.ok === true) {
            this.props.history.push({
                pathname: `/${staff.status.toLowerCase()}/${staff.id}`
            })
        }
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
                    staff={this.state.staff}
                    handleStaff={this.handleStaff}
                    flights={this.props.flights}
                    sourceMarkets={this.props.sourceMarkets}
                    seasons={this.props.seasons}
                    flightStatuses={this.props.flightStatuses}
                    roles={this.props.roles}
                    destinations={this.props.destinations}
                    statuses={this.props.statuses}
                    userRoles={this.props.userRoles}
                    typeOfFlights={this.props.typeOfFlights}
                    handleStaffAttachments={this.handleStaffAttachments}
                    iataCodes={this.props.iataCodes}
                    travelTypes={this.props.travelTypes}
                    currencies={this.props.currencies}
                    paymentMethods={this.props.paymentMethods}
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
        userRoles: state.user.userRoles,
        typeOfFlights: state.geography.typeOfFlights,
        iataCodes: state.geography.iataCodes,
        travelTypes: state.geography.travelTypes,
        currencies: state.geography.currencies,
        paymentMethods: state.geography.paymentMethods
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ajaxStatusActions: bindActionCreators(ajaxStatusActions, dispatch),
        pendingDESActions: bindActionCreators(pendingDESActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit)
