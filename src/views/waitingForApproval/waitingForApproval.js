import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table from '../../components/table'
import * as waitingForApprovalActions from '../../actions/waitingForApprovalActions'
import * as AppService from '../../services/appService'

const columns = [
    { labelKey: 'First Name', valueKey: 'firstName' },
    { labelKey: 'Last Name', valueKey: 'lastName' },
    { labelKey: 'Destination', valueKey: 'destination' },
    { labelKey: 'Source Market', valueKey: 'sourceMarket' },
    { labelKey: 'Date Of Flight', valueKey: 'dateOfFlight', dataType: 'DATETIME' }
]

const filter = (staffs, criteria) => {
    return staffs.filter(
        staff =>
            (staff.firstName && staff.firstName.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.firstName &&
                staff.lastName &&
                (staff.firstName.toLowerCase() + ' ' + staff.lastName.toLowerCase()).includes(criteria.toLowerCase())) ||
            (staff.lastName && staff.lastName.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.destination && staff.destination.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.sourceMarket && staff.sourceMarket.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.dateOfFlight && staff.dateOfFlight.toLowerCase().includes(criteria.toLowerCase()))
    )
}

class WaitingForApproval extends Component {
    async componentDidMount() {
        AppService.setTitle('Waiting For Approval')

        this.props.waitingForApprovalActions.getStaffs()
    }

    handleClick = (e, id) => {
        if (e.target.nodeName !== 'BUTTON') {
            this.props.history.push(`/waitingforapproval/${id}`)
        }
    }

    render() {
        return (
            <div>
                <h2>Waiting For Approval</h2>

                <Table staffs={this.props.staffs} handleClick={this.handleClick} columns={columns} filter={filter} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        staffs: state.waitingForApproval.staffs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        waitingForApprovalActions: bindActionCreators(waitingForApprovalActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WaitingForApproval)
