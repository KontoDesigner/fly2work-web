import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Search from '../../components/search'
import Table from '../../components/table'
import * as submittedActions from '../../actions/submittedActions'
import * as AppService from '../../services/appService'
import lodash from 'lodash'

class Submitted extends Component {
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
        AppService.setTitle('Submitted')

        this.props.submittedActions.getStaffs()
    }

    handleSearch = event => {
        this.setState({ search: event.target.value })

        this.debouncedHandleCriteria()
    }

    handleClick = id => {
        this.props.history.push(`/submitted/${id}`)
    }

    render() {
        return (
            <div>
                <h2>Submitted</h2>

                <Search search={this.state.search} handleSearch={this.handleSearch} />

                <Table staffs={this.props.staffs} criteria={this.state.criteria} handleClick={this.handleClick} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        staffs: state.submitted.staffs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submittedActions: bindActionCreators(submittedActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Submitted)
