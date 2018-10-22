import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Search from './search'
import Table from './table'
import * as newActions from '../../actions/newActions'
import * as AppService from '../../services/appService'
import lodash from 'lodash'

class New extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            criteria: ''
        }
    }

    handleCriteria = () => {
        this.setState({ criteria: this.state.search })
    }

    debouncedGetData = lodash.debounce(this.handleCriteria, 750)

    async componentDidMount() {
        AppService.setTitle('New')

        this.props.newActions.getStaffs()
    }

    handleSearch = event => {
        this.setState({ search: event.target.value })

        this.debouncedGetData()
    }

    handleClick = id => {
        this.props.history.push(`/new/${id}`)
    }

    render() {
        return (
            <div>
                <h2>New</h2>

                <Search search={this.state.search} handleSearch={this.handleSearch} />

                <Table staffs={this.props.staffs} criteria={this.state.criteria} handleClick={this.handleClick} />
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
