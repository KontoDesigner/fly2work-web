import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Search from '../../components/search'
import Table from '../../components/table'
import * as confirmedActions from '../../actions/confirmedActions'
import * as AppService from '../../services/appService'
import lodash from 'lodash'
import { Statuses as statuses } from '../../constants/geographyConstants'

class Confirmed extends Component {
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
        AppService.setTitle(statuses.Confirmed)

        this.props.confirmedActions.getStaffs()
    }

    handleSearch = event => {
        this.setState({ search: event.target.value })

        this.debouncedHandleCriteria()
    }

    handleClick = id => {
        this.props.history.push(`/confirmed/${id}`)
    }

    render() {
        return (
            <div>
                <h2>Confirmed</h2>

                <Search search={this.state.search} handleSearch={this.handleSearch} />

                <Table staffs={this.props.staffs} criteria={this.state.criteria} handleClick={this.handleClick} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        staffs: state.confirmed.staffs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        confirmedActions: bindActionCreators(confirmedActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Confirmed)
