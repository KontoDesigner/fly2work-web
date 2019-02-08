import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppService from '../../services/appService'
import Form from '../../components/form'
import * as RestClient from '../../infrastructure/restClient'
import * as ajaxStatusActions from '../../actions/ajaxStatusActions'
import * as pendingHRActions from '../../actions/pendingHRActions'
import { UserRoles as userRoles } from '../../constants/userConstants'
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

        var staff = await RestClient.get(`staff/getbyidandgreenlight/${this.state.id}/${false}`)
        const initialValues = await RestClient.get('staff/model')

        this.props.ajaxStatusActions.endAjaxCall()

        if (staff) {
            AppService.setTitle(`Pending HR - ${staff.firstName} ${staff.lastName}`)

            helpers.populateInitialValues(initialValues, staff)
        } else {
            AppService.setTitle('Pending HR - Request not found')
        }

        this.setState({ staff, initialValues, loaded: true })
    }

    handleStaff = async staff => {
        staff.attachments = null

        this.setState({ staff })

        const res = await this.props.pendingHRActions.updateStaff(staff)

        if (res && res.ok === true && staff.greenLight === true) {
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

    confirmGreenLight = async () => {
        const res = await this.props.pendingHRActions.confirmGreenLight(this.state.staff.id)

        if (res && res.ok === true) {
            this.props.history.push({
                pathname: `/${this.state.staff.status.toLowerCase()}/${this.state.staff.id}`
            })
        }
    }

    render() {
        if (!this.state.loaded) {
            return ''
        }

        const BTT = this.props.userRoles.includes(userRoles.BTT)
        const HR = this.props.userRoles.includes(userRoles.HR)

        return this.state.staff ? (
            <div>
                <h2>
                    {this.state.staff.firstName} {this.state.staff.lastName}
                </h2>

                <Form
                    hideSubmit={true}
                    initialValues={this.state.initialValues}
                    confirmGreenLight={HR === true ? this.confirmGreenLight : null}
                    showDelete={true}
                    history={this.props.history}
                    deleteStaff={this.props.pendingHRActions.deleteStaff}
                    disabled={BTT === false || HR === true}
                    staff={this.state.staff}
                    handleStaff={this.handleStaff}
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
        bsStatuses: state.geography.bsStatuses.map(s => ({
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
        pendingHRActions: bindActionCreators(pendingHRActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit)
