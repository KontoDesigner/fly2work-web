import React, { Component } from 'react'
import * as AppService from '../../services/appService'
import * as StaffService from '../../services/staffService'

class New extends Component {
    constructor(props) {
        super(props)

        this.state = {
            staffs: []
        }
    }

    async componentDidMount() {
        AppService.setTitle('New')

        const staffs = await StaffService.getNew()

        this.setState({ staffs })
    }

    handleClick(id) {
        this.props.history.push(`/new/${id}`)
    }

    render() {
        return (
            <div>
                <h2>New</h2>

                <div className="tui-text-content">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.staffs.map(staff => (
                                <tr onClick={() => this.handleClick(staff.id)} key={staff.id}>
                                    <td className="link">{staff.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default New
