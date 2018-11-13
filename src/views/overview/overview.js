import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table from '../../components/table'
import * as overviewActions from '../../actions/overviewActions'
import * as AppService from '../../services/appService'
import * as RestClient from '../../infrastructure/restClient'
import moment from 'moment'
import { Button, Row } from 'reactstrap'

const columns = [
    { labelKey: 'Name', valueKey: 'name' },
    { labelKey: 'Destination', valueKey: 'destination' },
    { labelKey: 'Source Market', valueKey: 'sourceMarket' },
    { labelKey: 'Date Of Flight', valueKey: 'dateOfFlight', dataType: 'DATETIME' },
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

    handleClick = (e, id) => {
        if (e.target.nodeName !== 'BUTTON') {
            this.props.history.push(`/overview/${id}`)
        }
    }

    downloadExcel = () => {
        RestClient.download('excel', null, `${this.props.staffs.length} requests - ${moment().format('YYYY-MM-DD HH:mm')}.xlsx`)
    }

    render() {
        return (
            <div>
                <h2>Overview</h2>

                <Table staffs={this.props.staffs} handleClick={this.handleClick} columns={columns} filter={filter} />

                <Row>
                    <Button
                        disabled={!this.props.staffs || this.props.staffs.length === 0}
                        style={{ marginTop: '15px' }}
                        onClick={this.downloadExcel}
                        className="btn btn-function"
                        type="button">
                        XLSX
                    </Button>
                </Row>
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
