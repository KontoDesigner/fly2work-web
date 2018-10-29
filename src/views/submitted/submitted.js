import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table from '../../components/table'
import * as submittedActions from '../../actions/submittedActions'
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

class Submitted extends Component {
    async componentDidMount() {
        AppService.setTitle(statuses.Submitted)

        this.props.submittedActions.getStaffs()
    }

    handleClick = id => {
        this.props.history.push(`/submitted/${id}`)
    }

    render() {
        return (
            <div>
                <h2>Submitted</h2>

                <Table staffs={this.props.staffs} handleClick={this.handleClick} columns={columns} filter={filter} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        staffs: state.submitted.staffs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submittedActions: bindActionCreators(submittedActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Submitted)
