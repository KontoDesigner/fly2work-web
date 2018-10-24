import React from 'react'
import { Row, Col } from 'reactstrap'

const Table = props => {
    let staffs = []

    if (props.criteria !== '') {
        staffs = props.staffs.filter(
            staff =>
                (staff.name && staff.name.toLowerCase().includes(props.criteria.toLowerCase())) ||
                (staff.destination && staff.destination.toLowerCase().includes(props.criteria.toLowerCase()))
        )
    } else {
        staffs = props.staffs
    }

    return (
        <Row>
            <Col>
                <div className="tui-text-content">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Destination</th>
                                <th>Source Market</th>
                                <th>Date Of Flight</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffs.map(staff => (
                                <tr onClick={() => props.handleClick(staff.id)} key={staff.id}>
                                    <td className="link">{staff.name}</td>
                                    <td className="link">{staff.destination}</td>
                                    <td className="link">{staff.sourceMarket}</td>
                                    <td className="link">{staff.dateOfFlight}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Col>
        </Row>
    )
}

export default Table
