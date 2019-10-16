import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import lodash from 'lodash'
import Search from './search'
import * as RestClient from '../infrastructure/restClient'
import moment from 'moment'
import { Statuses as statuses, ConfirmedStatuses as confirmedStatuses } from '../constants/geographyConstants'
import classnames from 'classnames'

library.add(faCaretDown, faCaretUp)

const styles = {
    thBtn: { width: '1px' }
}

function compareValues(key, order = true) {
    return function(a, b) {
        let aValue = lodash.get(a, key, '')
        let bValue = lodash.get(b, key, '')

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

class Table extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sortOrder: true,
            sortColumn: props.columns[0].valueKey,
            search: '',
            criteria: ''
        }
    }

    handleSearch = event => {
        this.setState({ search: event.target.value })

        this.debouncedHandleCriteria()
    }

    handleCriteria = () => {
        this.setState({ criteria: this.state.search })
    }

    debouncedHandleCriteria = lodash.debounce(this.handleCriteria, 500)

    renderHeader(column) {
        if (this.state.sortColumn === column.valueKey) {
            return (
                <span>
                    <FontAwesomeIcon icon={this.state.sortOrder === true ? 'caret-down' : 'caret-up'} size="1x" />

                    {column.labelKey}
                </span>
            )
        } else {
            return <span>{column.labelKey}</span>
        }
    }

    renderBody(staff, column) {
        if (staff.greenLight === false && staff.status !== statuses.New && column.valueKey === 'status') {
            return 'PendingHR'
        }

        const value = lodash.get(staff, column.valueKey, '')

        if (value === undefined || value === null || value === '') {
            return ''
        }

        switch (column.dataType) {
            case 'DATETIME':
                if (column.local === true) {
                    return moment.utc(value).format(column.format ? column.format : 'DD/MM/YYYY')
                } else {
                    return moment(value).format(column.format ? column.format : 'DD/MM/YYYY')
                }
            default:
                return value
        }
    }

    headerOnClick = column => {
        if (this.state.sortColumn === column.valueKey) {
            return this.setState({ sortOrder: !this.state.sortOrder })
        }

        this.setState({ sortColumn: column.valueKey, sortOrder: true })
    }

    downloadPdf = staff => {
        RestClient.download(`pdf/${staff.id}`, null, `${staff.firstName} ${staff.lastName} ${staff.iataCode} ${staff.preferredFlightDate}.pdf`)
    }

    render() {
        let staffs = Object.assign([], this.props.staffs)

        if (this.state.criteria !== '') {
            staffs = this.props.filter(staffs, this.state.criteria)
        }

        if (this.props.compareValues) {
            staffs.sort(this.props.compareValues(this.state.sortColumn, this.state.sortOrder))
        } else {
            staffs.sort(compareValues(this.state.sortColumn, this.state.sortOrder))
        }

        return (
            <div>
                <Search search={this.state.search} handleSearch={this.handleSearch} />

                <Row>
                    <Col xl="12" lg="12" md="12" sm="12" xs="12">
                        <div className="tui-text-content table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        {this.props.columns.map((column, index) => (
                                            <th onClick={() => this.headerOnClick(column)} key={index}>
                                                {this.renderHeader(column)}
                                            </th>
                                        ))}

                                        {this.props.confirmGreenLight && <th style={styles.thBtn} />}

                                        <th style={styles.thBtn} />

                                        {this.props.handleSelected !== undefined && <th style={styles.thBtn}>Delete</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffs.map(staff => (
                                        <tr
                                            key={staff.id}
                                            onClick={e => this.props.handleClick(e, staff.id)}
                                            className={classnames({
                                                'bg-warning': staff.confirmedStatus === confirmedStatuses.Modified,
                                                'bg-danger': staff.confirmedStatus === confirmedStatuses.Cancelled,
                                                'bg-success': staff.status === statuses.Confirmed && !staff.confirmedStatus
                                            })}>
                                            {this.props.columns.map((column, index) => (
                                                <td className="link" key={index}>
                                                    {this.renderBody(staff, column)}
                                                </td>
                                            ))}

                                            {this.props.confirmGreenLight && (
                                                <td>
                                                    <Button
                                                        onClick={() => this.props.confirmGreenLight(staff.id)}
                                                        className="btn btn-primary btn-sm"
                                                        type="button">
                                                        CONFIRM
                                                    </Button>
                                                </td>
                                            )}

                                            <td>
                                                <Button onClick={() => this.downloadPdf(staff)} className="btn btn-function btn-sm" type="button">
                                                    PDF
                                                </Button>
                                            </td>

                                            {this.props.handleSelected !== undefined && (
                                                <td>
                                                    <input type="checkbox" onChange={e => this.props.handleSelected(staff.id, e)} />
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Table
