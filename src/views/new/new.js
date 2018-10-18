import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as newActions from '../../actions/newActions'
import * as AppService from '../../services/appService'

class New extends Component {
    async componentDidMount() {
        AppService.setTitle('New')

        this.props.newActions.getStaffs()
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
                            {this.props.staffs.map(staff => (
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

function mapStateToProps(state) {
    return {
        staffs: state.new.staffs
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
