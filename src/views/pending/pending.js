import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Search from '../../components/search'
import Table from '../../components/table'
import * as pendingActions from '../../actions/pendingActions'
import * as AppService from '../../services/appService'
import lodash from 'lodash'

class Pending extends Component {
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
        AppService.setTitle('Pending')

        this.props.pendingActions.getStaffs()
    }

    handleSearch = event => {
        this.setState({ search: event.target.value })

        this.debouncedHandleCriteria()
    }

    handleClick = id => {
        this.props.history.push(`/pending/${id}`)
    }

    render() {
        return (
            <div>
                <h2>Pending</h2>

                <Search search={this.state.search} handleSearch={this.handleSearch} />

                <Table staffs={this.props.staffs} criteria={this.state.criteria} handleClick={this.handleClick} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        staffs: state.pending.staffs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pendingActions: bindActionCreators(pendingActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pending)
