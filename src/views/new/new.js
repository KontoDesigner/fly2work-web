import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table from '../../components/table'
import * as newActions from '../../actions/newActions'
import * as AppService from '../../services/appService'
import { Statuses as statuses } from '../../constants/geographyConstants'
import { Button, Row } from 'reactstrap'
import { UserRoles as userRoles } from '../../constants/userConstants'

const columns = [
    { labelKey: 'First Name', valueKey: 'firstName' },
    { labelKey: 'Last Name', valueKey: 'lastName' },
    { labelKey: 'Destination', valueKey: 'destination' },
    { labelKey: 'Source Market', valueKey: 'sourceMarket' },
    { labelKey: 'Preferred Flight Date', valueKey: 'preferredFlightDate', dataType: 'DATETIME' }
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
            (staff.preferredFlightDate && staff.preferredFlightDate.toLowerCase().includes(criteria.toLowerCase()))
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
        const BTT = this.props.userRoles.includes(userRoles.BTT)

        return (
            <div>
                <h2>{statuses.New}</h2>

                <Table staffs={this.props.staffs} handleClick={this.handleClick} columns={columns} filter={filter} />

                {!BTT && (
                    <Row>
                        <Button
                            style={{ marginTop: '20px' }}
                            onClick={() => this.props.history.push('/new/add')}
                            className="btn btn-function"
                            type="button">
                            ADD
                        </Button>
                    </Row>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        staffs: state.new.staffs,
        userRoles: state.user.userRoles
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
