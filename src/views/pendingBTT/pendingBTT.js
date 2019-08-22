import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table from '../../components/table'
import * as pendingBTTActions from '../../actions/pendingBTTActions'
import * as AppService from '../../services/appService'

const columns = [
    { labelKey: 'Requested', valueKey: 'dateRequested', dataType: 'DATETIME', format: 'DD/MM/YYYY HH:mm', local: true },
    { labelKey: 'Green Light Approved', valueKey: 'greenLightUpdated' },
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
            ((staff.preferredFlightDate && staff.preferredFlightDate.toLowerCase().includes(criteria.toLowerCase())) ||
                (staff.dateRequested && staff.dateRequested.toLowerCase().includes(criteria.toLowerCase())))
    )
}

class PendingBTT extends Component {
    async componentDidMount() {
        AppService.setTitle('Pending BTT')

        this.props.pendingBTTActions.getStaffs()
    }

    handleClick = (e, id) => {
        if (e.target.nodeName !== 'BUTTON') {
            this.props.history.push(`/pendingbtt/${id}`)
        }
    }

    render() {
        return (
            <div className="ajax-status-container">
                <h2>Pending BTT</h2>

                <Table staffs={this.props.staffs} handleClick={this.handleClick} columns={columns} filter={filter} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        staffs: state.pendingBTT.staffs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pendingBTTActions: bindActionCreators(pendingBTTActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingBTT)
