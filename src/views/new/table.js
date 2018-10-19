import React from 'react'
import { Row, Col } from 'reactstrap'

const Table = props => {
    return (
        <Row>
            <Col>
                <div className="tui-text-content">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.staffs.map(staff => (
                                <tr onClick={() => props.handleClick(staff.id)} key={staff.id}>
                                    <td className="link">{staff.name}</td>
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
