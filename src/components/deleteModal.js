import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

const styles = {
    cancelBtn: { marginLeft: '10px' }
}

const DeleteModal = props => {
    const deleteStaff = async () => {
        const req = {
            id: props.staff.id
        }

        const res = await props.deleteStaff(req)

        if (res === true) {
            if (props.staff.greenLight === false) {
                props.history.push({
                    pathname: '/pendinghr'
                })
            } else {
                props.history.push({
                    pathname: `/${props.staff.status.toLowerCase()}`
                })
            }
        }
    }

    return (
        <Modal isOpen={props.open} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Delete</ModalHeader>
            <ModalBody>
                <div className="alert alert-danger" role="alert">
                    Are you sure you want to delete the request?
                </div>
            </ModalBody>
            <ModalFooter>
                <Button className="btn-sm" color="secondary" onClick={deleteStaff}>
                    Delete
                </Button>
                <Button style={styles.cancelBtn} onClick={props.toggle} className="btn btn-default ghost-white btn-sm" type="button">
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteModal
