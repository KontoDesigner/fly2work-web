import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Moment from 'react-moment'

class Table extends Component {
    renderColumn(staff, column) {
        switch (column.dataType) {
            case 'DATETIME':
                return staff[column.valueKey] && <Moment format="YYYY-MM-DD">{staff[column.valueKey]}</Moment>
            default:
                return staff[column.valueKey]
        }
    }

    render() {
        let staffs = []

        if (this.props.criteria !== '') {
            staffs = this.props.staffs.filter(
                staff =>
                    (staff.name && staff.name.toLowerCase().includes(this.props.criteria.toLowerCase())) ||
                    (staff.destination && staff.destination.toLowerCase().includes(this.props.criteria.toLowerCase())) ||
                    (staff.sourceMarket && staff.sourceMarket.toLowerCase().includes(this.props.criteria.toLowerCase())) ||
                    (staff.dateOfFlight && staff.dateOfFlight.toLowerCase().includes(this.props.criteria.toLowerCase())) ||
                    (staff.sourceMarket && staff.status.toLowerCase().includes(this.props.criteria.toLowerCase()))
            )
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
                                        <th key={index}>{column.labelKey}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {staffs.map(staff => (
                                    <tr key={staff.id} onClick={() => this.props.handleClick(staff.id)}>
                                        {this.props.columns.map((column, index) => (
                                            <td className="link" key={index}>
                                                {this.renderColumn(staff, column)}
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
