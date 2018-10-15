import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import * as StaffService from '../../services/staffService'

class New extends Component {
  constructor(props) {
    super(props)

    this.state = {
      staffs: []
    }
  }

  async componentWillMount() {
    document.title = 'New'
  }

  async componentDidMount() {
    const staffs = await StaffService.getNew()

    this.setState({ staffs })
  }

  handleClick(id) {
    this.props.history.push(`/new/${id}`)

    //const win = window.open(`/new/${id}`, '_blank')
    //win.focus()
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.state.staffs.map(i => (
            <ListGroupItem onClick={() => this.handleClick(i.id)} key={i.name}>
              {i.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  }
}

export default New
