import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table from '../../components/table'
import * as pendingDESActions from '../../actions/pendingDESActions'
import * as AppService from '../../services/appService'

const columns = [
    { labelKey: 'First Name', valueKey: 'firstName' },
    { labelKey: 'Last Name', valueKey: 'lastName' },
    { labelKey: 'Destination', valueKey: 'destination' },
    { labelKey: 'Season', valueKey: 'season' },
    { labelKey: 'Source Market', valueKey: 'sourceMarket' },
    { labelKey: 'Preferred Flight Date', valueKey: 'preferredFlightDate' },
    { labelKey: 'Type Of Flight', valueKey: 'typeOfFlight' }
]

const filter = (staffs, criteria) => {
    return staffs.filter(
        staff =>
            (staff.firstName && staff.firstName.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.lastName && staff.lastName.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.firstName &&
                staff.lastName &&
                (staff.firstName.toLowerCase() + ' ' + staff.lastName.toLowerCase()).includes(criteria.toLowerCase())) ||
            (staff.destination && staff.destination.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.sourceMarket && staff.sourceMarket.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.typeOfFlight && staff.typeOfFlight.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.preferredFlightDate && staff.preferredFlightDate.toLowerCase().includes(criteria.toLowerCase()))
    )
}

class PendingDES extends Component {
    async componentDidMount() {
        AppService.setTitle('Pending DES')

        this.props.pendingDESActions.getStaffs()
    }

    handleClick = (e, id) => {
        if (e.target.nodeName !== 'BUTTON') {
            this.props.history.push(`/pendingdes/${id}`)
        }
    }

    render() {
        return (
            <div className="ajax-status-container">
                <h2>Pending DES</h2>

                <Table staffs={this.props.staffs} handleClick={this.handleClick} columns={columns} filter={filter} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        staffs: state.pendingDES.staffs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pendingDESActions: bindActionCreators(pendingDESActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingDES)
