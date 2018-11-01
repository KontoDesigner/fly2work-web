import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table from '../../components/table'
import * as newActions from '../../actions/newActions'
import * as AppService from '../../services/appService'
import { Statuses as statuses } from '../../constants/geographyConstants'

const columns = [
    { labelKey: 'Name', valueKey: 'name' },
    { labelKey: 'Destination', valueKey: 'destination' },
    { labelKey: 'Source Market', valueKey: 'sourceMarket' },
    { labelKey: 'Date Of Flight', valueKey: 'dateOfFlight', dataType: 'DATETIME' }
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

class New extends Component {
    async componentDidMount() {
        AppService.setTitle(statuses.New)

        this.props.newActions.getStaffs()
    }

    handleClick = (e, id) => {
        if (e.target.nodeName !== 'BUTTON') {
            this.props.history.push(`/new/${id}`)
        }
    }

    render() {
        return (
            <div>
                <h2>{statuses.New}</h2>

                <Table staffs={this.props.staffs} handleClick={this.handleClick} columns={columns} filter={filter} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        staffs: state.new.staffs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        newActions: bindActionCreators(newActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(New)
