import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Table from '../../components/table'
import * as overviewActions from '../../actions/overviewActions'
import * as AppService from '../../services/appService'
import * as RestClient from '../../infrastructure/restClient'
import moment from 'moment'
import { Button, Row, Col } from 'reactstrap'
import lodash from 'lodash'
import { Statuses as statuses } from '../../constants/geographyConstants'
import * as ajaxStatusActions from '../../actions/ajaxStatusActions'
import { UserRoles as userRoles } from '../../constants/userConstants'

const columns = [
    { labelKey: 'First Name', valueKey: 'firstName' },
    { labelKey: 'Last Name', valueKey: 'lastName' },
    { labelKey: 'Destination', valueKey: 'destination' },
    { labelKey: 'Season', valueKey: 'season' },
    { labelKey: 'Source Market', valueKey: 'sourceMarket' },
    { labelKey: 'Confirmed Flight Date', valueKey: 'flights[0].confirmedFlightDate' },
    { labelKey: 'Status', valueKey: 'status' },
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
            (staff.flights &&
                staff.flights.length > 0 &&
                staff.flights[0].confirmedFlightDate &&
                staff.flights[0].confirmedFlightDate.toLowerCase().includes(criteria.toLowerCase())) ||
            (staff.status && staff.status.toLowerCase().includes(criteria.toLowerCase()))
    )
}

const compareValues = (key, order = true) => {
    return function(a, b) {
        let aValue = lodash.get(a, key, '')
        let bValue = lodash.get(b, key, '')

        if (key === 'status') {
            const aGreenLight = lodash.get(a, 'greenLight', '')

            if (aGreenLight === false && aValue !== statuses.New) {
                aValue = 'PendingHR'
            }

            const bGreenLight = lodash.get(b, 'greenLight', '')

            if (bGreenLight === false && bValue !== statuses.New) {
                bValue = 'PendingHR'
            }
        }

        if (key === 'flights[0].confirmedFlightDate' || key === 'preferredFlightDate') {
            if (aValue && aValue !== '') {
                aValue = moment(aValue, 'DD/MM/YYYY', true)
            }

            if (bValue && bValue !== '') {
                bValue = moment(bValue, 'DD/MM/YYYY', true)
            }
        }

        let varA = typeof aValue === 'string' ? aValue.toUpperCase() : aValue
        let varB = typeof bValue === 'string' ? bValue.toUpperCase() : bValue

        varA = varA ? varA : ''
        varB = varB ? varB : ''

        let comparison = 0
        if (varA > varB) {
            comparison = 1
        } else if (varA < varB) {
            comparison = -1
        }
        return order === false ? comparison * -1 : comparison
    }
}

class Overview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: []
        }
    }

    async componentDidMount() {
        AppService.setTitle('Overview')

        this.props.overviewActions.getStaffs()
    }

    handleClick = (e, id) => {
        if (e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'INPUT') {
            this.props.history.push(`/overview/${id}`)
        }
    }

    downloadExcel = async () => {
        this.props.ajaxStatusActions.beginAjaxCall()

        await RestClient.download('excel', null, `${this.props.staffs.length} request(s) - ${moment().format('DD/MM/YYYY HH:mm')}.xlsx`)

        this.props.ajaxStatusActions.endAjaxCall()
    }

    deleteStaffs = async () => {
        await this.props.overviewActions.deleteStaffs(this.state.selected)

        this.setState({ selected: [] })
    }

    handleSelected = (staffId, e) => {
        let selected = [...this.state.selected]
        const checked = e.target.checked

        const index = selected.indexOf(staffId)

        if (checked === true) {
            if (index === -1) {
                selected.push(staffId)
            }
        } else {
            if (index !== -1) {
                selected.splice(index, 1)
            }
        }

        this.setState({ selected })
    }

    render() {
        const BTT = this.props.userRoles.includes(userRoles.BTT)

        return (
            <div className="ajax-status-container">
                <h2>Overview</h2>

                <Table
                    staffs={this.props.staffs}
                    handleClick={this.handleClick}
                    columns={columns}
                    filter={filter}
                    compareValues={compareValues}
                    handleSelected={this.handleSelected}
                />

                <Row>
                    <Col xl="12" lg="12" md="12" sm="12" xs="12">
                        <Button
                            disabled={!this.props.staffs || this.props.staffs.length === 0}
                            style={{ marginTop: '20px' }}
                            onClick={this.downloadExcel}
                            className="btn btn-function"
                            type="button">
                            XLSX
                        </Button>

                        {BTT == true && (
                            <Button
                                style={{ marginLeft: '15px' }}
                                disabled={this.state.selected.length === 0}
                                onClick={this.deleteStaffs}
                                className="btn btn-sales"
                                type="button">
                                Delete
                            </Button>
                        )}
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        staffs: state.overview.staffs,
        userRoles: state.user.userRoles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        overviewActions: bindActionCreators(overviewActions, dispatch),
        ajaxStatusActions: bindActionCreators(ajaxStatusActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Overview)
