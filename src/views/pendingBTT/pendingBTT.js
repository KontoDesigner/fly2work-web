import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table from '../../components/table'
import * as pendingBTTActions from '../../actions/pendingBTTActions'
import * as AppService from '../../services/appService'
import { Statuses as statuses } from '../../constants/geographyConstants'

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
            (staff.lastName && staff.lastName.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.firstName &&
                staff.lastName &&
                (staff.firstName.toLowerCase() + ' ' + staff.lastName.toLowerCase()).includes(criteria.toLowerCase())) ||
            (staff.destination && staff.destination.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.sourceMarket && staff.sourceMarket.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.dateOfFlight && staff.dateOfFlight.toLowerCase().includes(criteria.toLowerCase()))
    )
}

class PendingBTT extends Component {
    async componentDidMount() {
        AppService.setTitle(statuses.PendingBTT)

        this.props.pendingBTTActions.getStaffs()
    }

    handleClick = (e, id) => {
        if (e.target.nodeName !== 'BUTTON') {
            this.props.history.push(`/pendingbtt/${id}`)
        }
    }

    render() {
        return (
            <div>
                <h2>{statuses.PendingBTT}</h2>

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
