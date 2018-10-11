import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import * as StaffService from '../../services/staffService'

class New extends Component {
  constructor(props) {
    super(props)

    this.state = {
      staffs: [],
    }
  }

  async componentDidMount() {
    const staffs = await StaffService.getNew()

    this.setState({ staffs })
  }

  handleClick(id) {
    const win = window.open(`/new/${id}`, '_blank')

    win.focus()
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.state.staffs.map(i => (
            <ListGroupItem tag="a" href="#" onClick={() => this.handleClick(i.id)} key={i.name}>
              {i.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  }
}

export default New
