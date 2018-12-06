import React, { Component } from 'react'
import { Statuses as statuses } from '../constants/geographyConstants'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

const styles = {
    label: { color: '#444' },
    textArea: { overflowX: 'auto', resize: 'vertical', minHeight: '37px', boxShadow: 'none' },
    cancelBtn: { marginLeft: '10px' }
}

class DeclineModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }
    }

    handleText = e => {
        this.setState({ text: e.target.value })
    }

    decline = async () => {
        const req = {
            id: this.props.staff.id,
            text: this.state.text
        }

        const res = await this.props.declineStaff(req)

        if (res === true) {
            this.props.history.push({
                pathname: `/${statuses.PendingDES.toLowerCase()}/${this.props.staff.id}`
            })
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>Decline</ModalHeader>
                    <ModalBody>
                        <label style={styles.label} htmlFor={'comment'}>
                            Comment
                        </label>

                        <textarea
                            value={this.state.text}
                            onChange={this.handleText}
                            name="comment"
                            className="form-control"
                            rows="3"
                            style={styles.textArea}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn-sm" color="secondary" onClick={this.decline}>
                            Decline
                        </Button>
                        <Button style={styles.cancelBtn} onClick={this.props.toggle} className="btn btn-default ghost-white btn-sm" type="button">
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default DeclineModal
