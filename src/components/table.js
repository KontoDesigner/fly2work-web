import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Moment from 'react-moment'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

library.add(faCaretDown, faCaretUp)

class Table extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sortOrder: true,
            sortColumn: ''
        }
    }

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
        switch (column.dataType) {
            case 'DATETIME':
                return staff[column.valueKey] && <Moment format="YYYY-MM-DD">{staff[column.valueKey]}</Moment>
            default:
                return staff[column.valueKey]
        }
    }

    headerOnClick = column => {
        if (this.state.sortColumn === column.valueKey) {
            return this.setState({ sortOrder: !this.state.sortOrder })
        }

        this.setState({ sortColumn: column.valueKey, sortOrder: true })
    }

    render() {
        let staffs = []

        if (this.props.criteria !== '') {
            staffs = this.props.filter(this.props.staffs, this.props.criteria)
        } else {
            staffs = this.props.staffs
        }

        return (
            <Row>
                <Col>
                    <div className="tui-text-content">
                        <table>
                            <thead>
                                <tr>
                                    {this.props.columns.map((column, index) => (
                                        <th onClick={() => this.headerOnClick(column)} key={index}>
                                            {this.renderHeader(column)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {staffs.map(staff => (
                                    <tr key={staff.id} onClick={() => this.props.handleClick(staff.id)}>
                                        {this.props.columns.map((column, index) => (
                                            <td className="link" key={index}>
                                                {this.renderBody(staff, column)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Table
