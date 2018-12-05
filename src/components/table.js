import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import Moment from 'react-moment'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import lodash from 'lodash'
import Search from './search'
import * as RestClient from '../infrastructure/restClient'
import moment from 'moment'
import { Statuses as statuses } from '../constants/geographyConstants'

library.add(faCaretDown, faCaretUp)

function compareValues(key, order = true) {
    return function(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0
        }

        const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
        const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

        let comparison = 0
        if (varA > varB) {
            comparison = 1
        } else if (varA < varB) {
            comparison = -1
        }
        return order === false ? comparison * -1 : comparison
    }
}

// function fetchFromObject(obj, prop) {
//     //property not found
//     if (typeof obj === 'undefined') return false

//     //index of next property split
//     var _index = prop.indexOf('.')

//     //property split found; recursive call
//     if (_index > -1) {
//         //get object at property (before split), pass on remainder
//         return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1))
//     }

//     //no split; get property
//     return obj[prop]
// }

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
            return 'Pending HR'
        }

        const value = lodash.get(staff, column.valueKey, '')

        switch (column.dataType) {
            case 'DATETIME':
                return value && <Moment format="YYYY-MM-DD">{value}</Moment>
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
        RestClient.download(`pdf/${staff.id}`, staff, `${staff.firstName} ${staff.lastName} - ${moment().format('YYYY-MM-DD HH:mm')}.pdf`)
    }

    render() {
        let staffs = []

        if (this.state.criteria !== '') {
            staffs = this.props.filter(this.props.staffs, this.state.criteria)
        } else {
            staffs = this.props.staffs
        }

        staffs.sort(compareValues(this.state.sortColumn, this.state.sortOrder))

        return (
            <div>
                <Search search={this.state.search} handleSearch={this.handleSearch} />

                <Row>
                    <Col>
                        <div className="tui-text-content table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        {this.props.columns.map((column, index) => (
                                            <th onClick={() => this.headerOnClick(column)} key={index}>
                                                {this.renderHeader(column)}
                                            </th>
                                        ))}

                                        <th style={{ width: '1px' }} />
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffs.map(staff => (
                                        <tr key={staff.id} onClick={e => this.props.handleClick(e, staff.id)}>
                                            {this.props.columns.map((column, index) => (
                                                <td className="link" key={index}>
                                                    {this.renderBody(staff, column)}
                                                </td>
                                            ))}

                                            <td>
                                                <Button
                                                    style={{ marginRight: '10px' }}
                                                    onClick={() => this.downloadPdf(staff)}
                                                    className="btn btn-function btn-sm"
                                                    type="button">
                                                    PDF
                                                </Button>
                                            </td>
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
