import React, { Component } from 'react'
import * as StaffService from '../../../services/staffService'
import * as GeographyService from '../../../services/geographySerive'
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
      loaded: false
    }
  }

  async componentWillMount() {
    const staff = await StaffService.getStaff(this.state.id)
    const flights = await GeographyService.getFlights()
    const airports = await GeographyService.getAirports()

    if (staff) {
      document.title = `New - ${staff.name}`
    } else {
      document.title = `Staff not found`
    }

    this.setState({ staff, flights, airports, loaded: true })
  }

  handleStaff = staff => {
    this.setState({ staff })

    console.log(staff)
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }

    return this.state.staff ? (
      <EditUserDialog staff={this.state.staff} handleStaff={this.handleStaff} flights={this.state.flights} airports={this.state.airports} />
    ) : (
      <div>Staff not found</div>
    )
  }
}

export default Edit
