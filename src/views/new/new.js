import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Filter from './filter'
import Table from './table'
import * as newActions from '../../actions/newActions'
import * as AppService from '../../services/appService'

class New extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: ''
        }
    }

    async componentDidMount() {
        AppService.setTitle('New')

        this.props.newActions.getStaffs()
    }

    handleSearch = event => {
        this.setState({ search: event.target.value })
    }

    handleClick = id => {
        this.props.history.push(`/new/${id}`)
    }

    render() {
        return (
            <div>
                <h2>New</h2>

                <Filter search={this.state.search} handleSearch={this.handleSearch} />

                <Table staffs={this.props.staffs} handleClick={this.handleClick} />
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
