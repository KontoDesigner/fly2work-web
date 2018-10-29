import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table from '../../components/table'
import * as confirmedActions from '../../actions/confirmedActions'
import * as AppService from '../../services/appService'
import { Statuses as statuses } from '../../constants/geographyConstants'

const columns = [
    { labelKey: 'Name', valueKey: 'name' },
    { labelKey: 'Destination', valueKey: 'destination' },
    { labelKey: 'SourceMarket', valueKey: 'sourceMarket' },
    { labelKey: 'DateOfFlight', valueKey: 'dateOfFlight', dataType: 'DATETIME' }
]

const filter = (staffs, criteria) => {
    return staffs.filter(
        staff =>
            (staff.name && staff.name.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.destination && staff.destination.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.sourceMarket && staff.sourceMarket.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.dateOfFlight && staff.dateOfFlight.toLowerCase().includes(criteria.toLowerCase()))
    )
}

class Confirmed extends Component {
    async componentDidMount() {
        AppService.setTitle(statuses.Confirmed)

        this.props.confirmedActions.getStaffs()
    }

    handleClick = id => {
        this.props.history.push(`/confirmed/${id}`)
    }

    render() {
        return (
            <div>
                <h2>Confirmed</h2>

                <Table staffs={this.props.staffs} handleClick={this.handleClick} columns={columns} filter={filter} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        staffs: state.confirmed.staffs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        confirmedActions: bindActionCreators(confirmedActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Confirmed)
