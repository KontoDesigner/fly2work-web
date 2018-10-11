import React, { Component } from 'react'

class Edit extends Component {
  constructor(props) {
    super()

    const {
      match: { params },
    } = props
    const id = params.id

    this.state = {
      id: id,
    }
  }
  render() {
    return <div> {this.state.id}</div>
  }
}

export default Edit
