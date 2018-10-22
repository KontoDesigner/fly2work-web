import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Search from '../../components/search'
import Table from '../../components/table'
import * as overviewActions from '../../actions/overviewActions'
import * as AppService from '../../services/appService'
import lodash from 'lodash'

class Overview extends Component {
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

    debouncedHandleCriteria = lodash.debounce(this.handleCriteria, 750)

    async componentDidMount() {
        AppService.setTitle('Overview')

        this.props.overviewActions.getStaffs()
    }

    handleSearch = event => {
        this.setState({ search: event.target.value })

        this.debouncedHandleCriteria()
    }

    handleClick = id => {
        this.props.history.push(`/overview/${id}`)
    }

    render() {
        return (
            <div>
                <h2>Overview</h2>

                <Search search={this.state.search} handleSearch={this.handleSearch} />

                <Table staffs={this.props.staffs} criteria={this.state.criteria} handleClick={this.handleClick} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        staffs: state.overview.staffs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        overviewActions: bindActionCreators(overviewActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Overview)
