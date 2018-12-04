import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppService from '../../services/appService'
import Form from '../../components/form'
import * as RestClient from '../../infrastructure/restClient'
import * as ajaxStatusActions from '../../actions/ajaxStatusActions'
import * as newActions from '../../actions/newActions'
import { Statuses as statuses } from '../../constants/geographyConstants'

class Edit extends Component {
    constructor(props) {
        super(props)

        const {
            match: { params }
        } = props

        this.state = {
            id: params.id,
            add: params.id === 'add',
            staff: null,
            loaded: false
        }
    }

    getStaff = async () => {
        this.props.ajaxStatusActions.beginAjaxCall()

        const staff = await RestClient.get(`staff/${statuses.New}/${this.state.id}`)

        this.props.ajaxStatusActions.endAjaxCall()

        if (staff) {
            AppService.setTitle(`${statuses.New} - ${staff.firstName} ${staff.lastName}`)

            staff.status = statuses.PendingBTT
        } else {
            AppService.setTitle(`${statuses.New} - Request not found`)
        }

        this.setState({ staff, loaded: true })
    }

    getModel = async () => {
        this.props.ajaxStatusActions.beginAjaxCall()

        const staff = await RestClient.get('staff/model')

        this.props.ajaxStatusActions.endAjaxCall()

        if (staff) {
            AppService.setTitle(`${statuses.New} - Add`)

            staff.status = statuses.PendingBTT
        } else {
            AppService.setTitle(`${statuses.New} - Could not retrieve model`)
        }

        this.setState({ staff, loaded: true })
    }

    async componentWillMount() {
        if (this.state.add) {
            this.getModel()
        } else {
            this.getStaff()
        }
    }

    handleStaff = async staff => {
        staff.attachments = this.state.staff.attachments

        this.setState({ staff })

        if (this.state.add === true) {
            const success = await this.props.newActions.insertStaff(staff)

            if (success) {
                this.props.history.push({
                    pathname: `/${staff.status.toLowerCase()}/${staff.id}`
                })
            }
        } else {
            await this.props.newActions.updateStaff(staff)

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
                {this.state.add === true ? (
                    <h2>Add</h2>
                ) : (
                    <h2>
                        {this.state.staff.firstName} {this.state.staff.lastName}
                    </h2>
                )}

                <Form
                    enableEmails={true}
                    hideStatus={true}
                    add={this.state.add}
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
        newActions: bindActionCreators(newActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit)
