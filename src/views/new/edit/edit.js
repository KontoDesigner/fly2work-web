import React, { Component } from 'react'
import * as StaffService from '../../../services/staffService'
import * as GeographyService from '../../../services/geographySerive'
import * as AppService from '../../../services/appService'
import EditUserDialog from './form'

class Edit extends Component {
    constructor(props) {
        super(props)

        const {
            match: { params }
        } = props

        const id = parseInt(params.id)

        this.state = {
            id: id,
            staff: null,
            flights: [],
            airports: [],
            sourceMarkets: [],
            seasons: [],
            flightStatuses: [],
            roles: [],
            destinations: [],
            loaded: false
        }
    }

    async componentWillMount() {
        const staff = await StaffService.getStaff(this.state.id)
        const flights = await GeographyService.getFlights()
        const airports = await GeographyService.getAirports()
        const sourceMarkets = await GeographyService.getSourceMarkets()
        const seasons = await GeographyService.getSeasons()
        const flightStatuses = await GeographyService.getFlightStatuses()
        const roles = await GeographyService.getRoles()
        const destinations = await GeographyService.getDestinations()

        if (staff) {
            AppService.setTitle(`New - ${staff.name}`)
        } else {
            AppService.setTitle('Staff not found')
        }

        this.setState({ staff, flights, airports, sourceMarkets, seasons, flightStatuses, roles, destinations, loaded: true })
    }

    handleStaff = staff => {
        this.setState({ staff })

        console.log(staff)
    }

    render() {
        if (!this.state.loaded) {
            return ''
        }

        return this.state.staff ? (
            <EditUserDialog
                staff={this.state.staff}
                handleStaff={this.handleStaff}
                flights={this.state.flights}
                airports={this.state.airports}
                sourceMarkets={this.state.sourceMarkets}
                seasons={this.state.seasons}
                flightStatuses={this.state.flightStatuses}
                roles={this.state.roles}
                destinations={this.state.destinations}
            />
        ) : (
            <div>Staff not found</div>
        )
    }
}

export default Edit
