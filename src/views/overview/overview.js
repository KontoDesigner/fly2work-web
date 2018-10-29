import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table from '../../components/table'
import * as overviewActions from '../../actions/overviewActions'
import * as AppService from '../../services/appService'

const columns = [
    { labelKey: 'Name', valueKey: 'name' },
    { labelKey: 'Destination', valueKey: 'destination' },
    { labelKey: 'SourceMarket', valueKey: 'sourceMarket' },
    { labelKey: 'DateOfFlight', valueKey: 'dateOfFlight', dataType: 'DATETIME' },
    { labelKey: 'Status', valueKey: 'status' }
]

const filter = (staffs, criteria) => {
    return staffs.filter(
        staff =>
            (staff.name && staff.name.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.destination && staff.destination.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.sourceMarket && staff.sourceMarket.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.dateOfFlight && staff.dateOfFlight.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.status && staff.status.toLowerCase().includes(criteria.toLowerCase()))
    )
}

class Overview extends Component {
    async componentDidMount() {
        AppService.setTitle('Overview')

        this.props.overviewActions.getStaffs()
    }

    handleClick = id => {
        this.props.history.push(`/overview/${id}`)
    }

    render() {
        return (
            <div>
                <h2>Overview</h2>

                <Table staffs={this.props.staffs} handleClick={this.handleClick} columns={columns} filter={filter} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        staffs: state.overview.staffs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        overviewActions: bindActionCreators(overviewActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Overview)
